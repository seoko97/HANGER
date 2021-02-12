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
		console.error(error);
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
		console.error(error);
		next(error);
	}
});

router.get('/:nickname/saved', async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { nickname: req.params.nickname },
			attributes: {
				exclude: ['password'],
			},
		});

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
		console.error(error);
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
		});

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
					where: {
						id: { [Op.like]: user.id },
					},
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
		console.error(error);
		next(error);
	}
});

module.exports = router;
