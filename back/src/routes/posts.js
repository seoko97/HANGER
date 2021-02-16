const express = require('express');
const { Op } = require('sequelize');

const { Post, Image, User, Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
	// GET /posts
	try {
		const where = {};
		if (parseInt(req.query.lastId, 10)) {
			// 초기 로딩이 아닐 때
			where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
		}
		const posts = await Post.findAll({
			where,
			limit: 10,
			order: [['createdAt', 'DESC']],
			include: [
				{
					model: User,
					attributes: ['id', 'nickname', 'profileImg'],
				},
				{
					model: Image,
				},
				{
					model: Comment,
					include: [
						{
							model: User,
							attributes: ['id', 'nickname'],
						},
					],
				},
				{
					model: User,
					through: 'Like',
					as: 'Likers',
					attributes: ['id'],
				},
				{
					model: User,
					through: 'Save',
					as: 'Savers',
					attributes: ['id'],
				},
			],
		});
		return res.status(200).json(posts);
	} catch (error) {
		next(error);
	}
});

router.get('/:nickname', async (req, res, next) => {
	// GET /posts/nickname
	try {
		const user = await User.findOne({
			where: { nickname: req.params.nickname },
			attributes: {
				exclude: ['password'],
			},
		});

		if (!user) return res.status(404).send('존재하지 않는 사용자입니다.');

		const where = {};
		if (parseInt(req.query.lastId, 10)) {
			where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
		}

		where.UserId = user.id;

		const posts = await Post.findAll({
			where,
			limit: 10,
			order: [['createdAt', 'DESC']],
			include: [
				{
					model: User,
					attributes: ['id', 'nickname', 'profileImg'],
				},
				{
					model: Image,
				},
				{
					model: Comment,
					include: [
						{
							model: User,
							attributes: ['id', 'nickname'],
						},
					],
				},
				{
					model: User,
					through: 'Like',
					as: 'Likers',
					attributes: ['id'],
				},
				{
					model: User,
					through: 'Save',
					as: 'Savers',
					attributes: ['id'],
				},
			],
		});

		return res.status(200).json(posts);
	} catch (error) {
		next(error);
	}
});

router.get('/:nickname/saved', async (req, res, next) => {
	try {
		if (req.user?.nickname !== req.params.nickname)
			return res.status(404).send('접근할 수 없습니다.');

		const user = await User.findOne({
			where: { nickname: req.params.nickname },
			attributes: {
				exclude: ['password'],
			},
		});

		if (!user) return res.status(404).send('존재하지 않는 사용자입니다.');

		const where = {};
		if (parseInt(req.query.lastId, 10)) {
			where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
		}

		const posts = await Post.findAll({
			where,
			limit: 10,
			order: [['createdAt', 'DESC']],
			include: [
				{
					model: User,
					attributes: ['id', 'nickname', 'profileImg'],
				},
				{
					model: Image,
				},
				{
					model: Comment,
					include: [
						{
							model: User,
							attributes: ['id', 'nickname'],
						},
					],
				},
				{
					model: User,
					through: 'Like',
					as: 'Likers',
					attributes: ['id'],
				},
				{
					model: User,
					through: 'Save',
					as: 'Savers',
					where: { id: user.id },
					attributes: ['id'],
				},
			],
		});

		return res.status(200).json(posts);
	} catch (error) {
		next(error);
	}
});

router.get('/:nickname/like', async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { nickname: req.params.nickname },
			attributes: {
				exclude: ['password'],
			},
			include: [
				{
					model: Post,
					through: 'Like',
					as: 'Liked',
					attributes: ['id'],
				},
			],
		});

		if (!user) return res.status(404).send('존재하지 않는 사용자입니다.');

		const result = await Promise.all(user.Liked.map((v) => v.id));

		const where = {};
		if (parseInt(req.query.lastId, 10)) {
			where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
		}

		const post = await Post.findAll({
			where: {
				[Op.and]: [{ id: result }, where.id ? { id: where.id } : {}],
			},
			limit: 10,
			order: [['createdAt', 'DESC']],
			include: [
				{
					model: User,
					attributes: ['id', 'nickname', 'profileImg'],
				},
				{
					model: Image,
				},
				{
					model: Comment,
					include: [
						{
							model: User,
							attributes: ['id', 'nickname'],
						},
					],
				},
				{
					model: User,
					through: 'Like',
					as: 'Likers',
					attributes: ['id'],
				},
				{
					model: User,
					through: 'Like',
					as: 'Likers',
					attributes: ['id'],
				},
				{
					model: User,
					through: 'Save',
					as: 'Savers',
					attributes: ['id'],
				},
			],
		});

		return res.status(200).json(post);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
