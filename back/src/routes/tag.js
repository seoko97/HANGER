const express = require('express');
const { Op } = require('sequelize');

const { Post, Image, User, Comment, Hashtag } = require('../models');

const router = express.Router();

router.get('/:hashtag', async (req, res, next) => {
	try {
		const tag = await Hashtag.findOne({
			where: {
				name: decodeURIComponent(req.params.hashtag),
			},
		});

		if (!tag) return res.status(404).send('존재하지 않는 태그입니다.');

		const where = {};
		if (parseInt(req.query.lastId, 10)) {
			// 초기 로딩이 아닐 때
			where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
		}

		const tagPosts = await Post.findAll({
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
				{
					model: Hashtag,
					through: 'PostHashtag',
					attributes: ['id'],
					where: {
						id: tag.id,
					},
				},
			],
		});

		return res.status(200).json(tagPosts);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
