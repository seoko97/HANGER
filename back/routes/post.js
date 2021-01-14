const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerS3 = require('multer-s3');

const { Post, Image, User, Hashtag, Comment } = require('../models');

const router = express.Router();

try {
	fs.accessSync('uploads');
} catch (error) {
	console.log('uploads 폴더가 없으므로 생성합니다.');
	fs.mkdirSync('uploads');
}

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, done) {
			done(null, 'upload');
		},
		filename(req, file, done) {
			const ext = path.extname(file.originalname); // 확장자 추출
			const basename = path.basename(file.originalname, ext); // 추출한 확장자와 파일이름을 합침
			done(null, basename + '_', new Date().getTime() + ext);
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
				// 이미지를 여러 개 올리면 image: [제로초.png, 부기초.png]
				const images = await Promise.all(
					req.body.image.map((image) => Image.create({ src: image })),
				);
				await post.addImages(images);
			} else {
				// 이미지를 하나만 올리면 image: 제로초.png
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
					attributes: ['id', 'nickname'],
				},
			],
		});
		return res.status(200).json(fullPost);
	} catch (err) {
		console.log(err);
		next(err);
	}
});

// router.get('/', async (req, res, next) => {

// })

module.exports = router;
