const express = require('express');

const { Post, Image, User, Hashtag, Comment, Notice } = require('../../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/:content', isLoggedIn, async (req, res, next) => {
	try {
		// 만약 유저 정보가 존재 한다면
		if (req.user) {
			const result = {};

			const searchUser = await User.findAll({
				limit: 12,
				attributes: {
					exclude: ['password'],
				},
			});
			const mainUser = await Promise.all(
				searchUser.filter(
					(user) =>
						user.nickname.includes(decodeURIComponent(req.params.content)) ||
						user.firstName.includes(decodeURIComponent(req.params.content)) ||
						user.lastName.includes(decodeURIComponent(req.params.content)) ||
						(user.firstName + user.lastName).includes(
							decodeURIComponent(req.params.content),
						),
				),
			);

			const searchTag = await Hashtag.findAll({
				limit: 12,
				include: {
					model: Post,
					through: 'PostHashtag',
					attributes: ['id'],
				},
			});

			const mainTag = await Promise.all(
				searchTag.filter((tag) =>
					tag.name.includes(decodeURIComponent(req.params.content)),
				),
			);

			mainUser[0] && (result.User = mainUser);
			mainTag[0] && (result.tag = mainTag);

			if (result) {
				return res.status(203).json(result);
			}
		} else {
			return res.status(400).json('로그인을 해주세요');
		}
	} catch (e) {
		next(e);
	}
});

router.post('/:content/tag', isLoggedIn, async (req, res, next) => {
	try {
		// 만약 유저 정보가 존재 한다면
		if (req.user) {
			const result = {};

			const searchTag = await Hashtag.findAll({
				limit: 12,
				include: {
					model: Post,
					through: 'PostHashtag',
					attributes: ['id'],
				},
			});

			const mainTag = await Promise.all(
				searchTag.filter((tag) =>
					tag.name.includes(decodeURIComponent(req.params.content)),
				),
			);

			mainTag[0] && (result.tag = mainTag);

			if (result) {
				return res.status(203).json(result);
			}
		} else {
			return res.status(400).json('로그인을 해주세요');
		}
	} catch (e) {
		next(e);
	}
});

module.exports = router;
