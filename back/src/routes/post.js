const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const { Post, Image, User, Hashtag, Comment, Notice } = require('../../models');

const router = express.Router();

try {
	fs.accessSync('uploads');
} catch (error) {
	fs.mkdirSync('uploads');
}

AWS.config.update({
	region: 'ap-northeast-2',
	accessKeyId: process.env.S3_ACCESS_KEY_ID,
	secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const upload = multer({
	storage: multerS3({
		s3: new AWS.S3(),
		bucket: 'hangerbukit',
		key(req, file, cd) {
			cd(null, `original/${Date.now()}_${path.basename(file.originalname)}`);
		},
	}),
	// 파일 사이지 지정 (20mb)
	limits: { fileSize: 20 * 1024 * 1024 },
});

router.post('/', upload.none(), async (req, res, next) => {
	try {
		const hashtags = req.body.content.match(/#[^\s#]+/g);
		const post = await Post.create({
			content: req.body.content,
			UserId: req.user.id,
		});

		if (hashtags) {
			const result = await Promise.all(
				hashtags.map((tag) =>
					Hashtag.findOrCreate({
						where: { name: tag.slice(1).toLowerCase() },
					}),
				),
			);
			await post.addHashtags(result.map((v) => v[0]));
		}

		if (req.body.image) {
			if (Array.isArray(req.body.image)) {
				const images = await Promise.all(
					req.body.image.map((image) => Image.create({ src: image })),
				);
				await post.addImages(images);
			} else {
				const image = await Image.create({ src: req.body.image });
				await post.addImages(image);
			}
		}

		const fullPost = await Post.findOne({
			where: { id: post.id },
			include: [
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
					attributes: ['id', 'nickname', 'profileImg'],
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
		return res.status(201).json(fullPost);
	} catch (err) {
		next(err);
	}
});

router.post('/images', upload.array('image'), async (req, res, next) => {
	return res.json(req.files.map((v) => v.location));
});

router.post('/:postId/comment', async (req, res, next) => {
	try {
		const post = await Post.findOne({
			where: { id: req.params.postId },
		});

		if (!post) {
			return res.status(400).send('게시물이 존재하지 않습니다.');
		}

		const comment = await Comment.create({
			content: req.body.content,
			PostId: parseInt(req.params.postId, 10),
			UserId: req.user.id,
		});

		const fullComment = await Comment.findOne({
			where: { id: comment.id },
			include: [
				{
					model: User,
					attributes: ['id', 'nickname'],
				},
			],
		});

		post.UserId !== req.user.id &&
			(await Notice.create({
				noticed: 'comment',
				targetUserId: req.user.id,
				UserId: post.UserId,
				PostId: post.id,
			}));

		return res.status(200).json(fullComment);
	} catch (error) {
		next(error);
	}
});

router.delete('/:postId', async (req, res, next) => {
	try {
		await Post.destroy({
			where: {
				id: req.params.postId,
				UserId: req.user.id,
			},
		});

		return res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
	} catch (error) {
		next(error);
	}
});

router.patch('/:postId/like', async (req, res, next) => {
	try {
		const post = await Post.findOne({ where: { id: req.params.postId } });
		if (!post) return res.status(403).send('게시글이 존재하지 않습니다.');

		await post.addLikers(req.user.id);

		post.UserId !== req.user.id &&
			(await Notice.findOrCreate({
				where: {
					noticed: 'like',
					targetUserId: req.user.id,
					UserId: post.UserId,
					PostId: post.id,
				},
			}));

		return res.json({ PostId: post.id, UserId: req.user.id });
	} catch (error) {
		next(error);
	}
});

router.delete('/:postId/like', async (req, res, next) => {
	try {
		const post = await Post.findOne({ where: { id: req.params.postId } });
		if (!post) return res.status(403).send('게시글이 존재하지 않습니다.');

		await post.removeLikers(req.user.id);

		post.UserId !== req.user.id &&
			(await Notice.destroy({
				where: {
					noticed: 'like',
					targetUserId: req.user.id,
					UserId: post.UserId,
					PostId: post.id,
				},
			}));

		return res.json({ PostId: post.id, UserId: req.user.id });
	} catch (error) {
		next(error);
	}
});

router.patch('/:postId/save', async (req, res, next) => {
	try {
		const post = await Post.findOne({ where: { id: req.params.postId } });
		if (!post) return res.status(403).send('게시글이 존재하지 않습니다.');

		await post.addSavers(req.user.id);
		post.UserId !== req.user.id &&
			(await Notice.findOrCreate({
				where: {
					noticed: 'save',
					targetUserId: req.user.id,
					UserId: post.UserId,
					PostId: post.id,
				},
			}));

		return res.json({ PostId: post.id, UserId: req.user.id });
	} catch (error) {
		next(error);
	}
});

router.delete('/:postId/save', async (req, res, next) => {
	try {
		const post = await Post.findOne({ where: { id: req.params.postId } });
		if (!post) return res.status(403).send('게시글이 존재하지 않습니다.');

		await post.removeSavers(req.user.id);

		post.UserId !== req.user.id &&
			(await Notice.destroy({
				where: {
					noticed: 'save',
					targetUserId: req.user.id,
					UserId: post.UserId,
					PostId: post.id,
				},
			}));

		return res.json({ PostId: post.id, UserId: req.user.id });
	} catch (error) {
		next(error);
	}
});

router.get('/singlePost/:postId', upload.none(), async (req, res, next) => {
	try {
		const singlePost = await Post.findOne({
			where: { id: req.params.postId },
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

		if (singlePost) {
			return res.status(200).json(singlePost);
		} else {
			return res.status(404).send('존재하지 않습니다.');
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
