const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const multer = require('multer');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

const { User, Post, Notice } = require('../models');

const router = express.Router();

try {
	fs.accessSync('uploads');
} catch (error) {
	fs.mkdirSync('uploads');
}

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, done) {
			done(null, 'uploads');
		},
		filename(req, file, done) {
			const ext = path.extname(file.originalname); // 확장자 추출(.png)
			const basename = path.basename(file.originalname, ext);

			done(null, basename + '_' + new Date().getTime() + ext);
		},
	}),
	limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

router.get('/', async (req, res, next) => {
	// 로그인한 유저 정보 불러오기
	try {
		// 만약 유저 정보가 존재 한다면
		if (req.user) {
			const fullUserWithoutPassword = await User.findOne({
				// req.user에 저장된 id값으로 해당 유저 검색
				where: { id: req.user.id },

				// password 제외
				attributes: {
					exclude: ['password'],
				},

				include: [
					{
						model: Post,
						attributes: ['id'],
					},
					{
						model: User,
						as: 'Followings',
						attributes: ['id'],
					},
					{
						model: User,
						as: 'Followers',
						attributes: ['id'],
					},
				],
			});

			return res.status(200).json(fullUserWithoutPassword);
		} else {
			return res.status(400).json('로그인을 해주세요');
		}
	} catch (e) {
		next(e);
	}
});

router.get('/:nickname', async (req, res, next) => {
	try {
		const fullUserWithoutPassword = await User.findOne({
			where: { nickname: req.params.nickname },
			attributes: {
				exclude: ['password'],
			},
			include: [
				{
					model: Post,
					attributes: ['id'],
				},
				{
					model: User,
					as: 'Followings',
					attributes: ['id'],
				},
				{
					model: User,
					as: 'Followers',
					attributes: ['id'],
				},
			],
		});
		if (fullUserWithoutPassword) {
			const data = fullUserWithoutPassword.toJSON();
			data.Posts = data.Posts.length; // 개인정보 침해 예방
			data.Followers = data.Followers.length;
			data.Followings = data.Followings.length;

			return res.status(200).json(data);
		} else {
			return res.status(404).send('존재하지 않는 사용자입니다.');
		}
	} catch (error) {
		next(error);
	}
});

router.post('/signup', async (req, res, next) => {
	// 회원가입 실행
	try {
		if (req.body.userId.length < 4) {
			return res.status(404).send('아이디를 4글자 이상 입력해주세요.');
		}

		const exUser = await User.findOne({
			// User 테이블에서 해당 아이디 검색
			where: {
				userId: req.body.userId,
			},
		});
		if (exUser) {
			return res.status(404).send('이미 사용 중인 아이디입니다.');
		}

		const nicknameUser = await User.findOne({
			where: {
				nickname: req.body.nickname,
			},
		});

		if (nicknameUser) {
			return res.status(404).send('존재하는 닉네임입니다.');
		}

		const hashedPassword = await bcrypt.hash(req.body.password, 12);
		await User.create({
			userId: req.body.userId,
			nickname: req.body.nickname,
			password: hashedPassword,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			gender: req.body.gender,
			birth: req.body.birth,
			profileImg: '',
			introduction: '',
		});

		res.status(201).send('ok');
	} catch (error) {
		next(error); // status 500
	}
});

router.post('/signin', (req, res, next) => {
	// 로그인 전략
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return next(err);
		}

		if (info) {
			return res.status(401).send(info.reason);
		}

		return req.login(user, async (loginErr) => {
			if (loginErr) {
				return next(loginErr);
			}

			// post 테이블과 팔로우관계 테이블 등을 정의 후 include 명령어를 통해 데이터를 함께 전송
			const fulluserWithOutPassword = await User.findOne({
				where: { id: user.id },
				attributes: {
					exclude: ['password'],
				},
				include: [
					{
						// Post 테이블에 접근해 Post.id를 가져온다.
						model: Post,
						attributes: ['id'],
					},
					{
						model: User,
						as: 'Followings',
						attributes: ['id'],
					},
					{
						model: User,
						as: 'Followers',
						attributes: ['id'],
					},
				],
			});
			return res.status(200).json(fulluserWithOutPassword);
		});
	})(req, res, next);
});

router.post('/signout', (req, res) => {
	// 로그아웃
	req.logout();
	req.session.destroy();
	res.send('logout 성공');
});

router.patch('/:nickname/edit', async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: {
				nickname: req.params.nickname,
			},
		});

		if (!user) return res.status(404).send('존재하지 않는 사용자입니다.');

		await User.update(
			{
				nickname: req.body.newNickname,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				introduction: req.body.introduction,
			},
			{
				where: { nickname: req.params.nickname },
			},
		);

		const fullUserWithoutPassword = await User.findOne({
			where: { nickname: req.body.newNickname },
			attributes: {
				exclude: ['password'],
			},
			include: [
				{
					model: Post,
					attributes: ['id'],
				},
				{
					model: User,
					as: 'Followings',
					attributes: ['id'],
				},
				{
					model: User,
					as: 'Followers',
					attributes: ['id'],
				},
			],
		});

		return res.status(200).json(fullUserWithoutPassword);
	} catch (error) {
		next(error);
	}
});

router.patch('/:nickname/profileimg', upload.single('image'), async (req, res, next) => {
	const user = await User.findOne({
		where: {
			nickname: req.params.nickname,
		},
	});

	if (!user) return res.status(404).send('존재하지 않는 사용자입니다.');
	await User.update(
		{
			profileImg: req.file.filename,
		},
		{
			where: {
				nickname: req.body.nickname,
			},
		},
	);

	const userProfileImg = await User.findOne({
		where: { nickname: req.params.nickname },
		attributes: {
			exclude: ['password'],
		},
	});

	return res.status(200).send(userProfileImg.profileImg);
});

router.patch('/:userId/follow', async (req, res, next) => {
	try {
		if (!req.user) {
			return res.status(403).send('로그인 후 사용가능합니다.');
		}

		const user = await User.findOne({
			where: { id: req.params.userId },
		});

		if (!user) {
			return res.status(403).send('존재하지 않는 사용자입니다.');
		}

		await user.addFollowers(req.user.id);

		req.body.userId !== req.user.id &&
			(await Notice.findOrCreate({
				where: {
					noticed: 'follow',
					targetUserId: req.user.id,
					UserId: parseInt(req.params.userId, 10),
				},
			}));

		return res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
	} catch (error) {
		next(error);
	}
});

router.delete('/:userId/follow', async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { id: req.params.userId },
		});

		if (!user) {
			res.status(403).send('존재하지 않는 사용자입니다.');
		}

		await user.removeFollowers(req.user.id);
		req.body.userId !== req.user.id &&
			(await Notice.destroy({
				where: {
					noticed: 'follow',
					targetUserId: req.user.id,
					UserId: parseInt(req.params.userId, 10),
				},
			}));

		return res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
	} catch (error) {
		next(error);
	}
});

router.get('/:userId/followers', async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { id: req.params.userId },
		});

		if (!user) {
			res.status(403).send('존재하지 않는 사용자입니다.');
		}

		const followers = await User.findAll({
			attributes: {
				exclude: ['password', 'gender', 'birth', 'introduction'],
			},
			include: [
				{
					model: User,
					as: 'Followings',
					where: {
						id: user.id,
					},
					attributes: ['id'],
				},
			],
		});

		return res.status(200).json(followers);
	} catch (error) {
		next(error);
	}
});

router.get('/:userId/followings', async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { id: req.params.userId },
		});

		if (!user) {
			res.status(403).send('존재하지 않는 사용자입니다.');
		}

		const followings = await User.findAll({
			attributes: {
				exclude: ['password', 'gender', 'birth', 'introduction'],
			},
			include: [
				{
					model: User,
					as: 'Followers',
					where: {
						id: user.id,
					},
					attributes: ['id'],
				},
			],
		});

		return res.status(200).json(followings);
	} catch (error) {
		next(error);
	}
});

router.post('/notice', async (req, res, next) => {
	try {
		if (req.user) {
			const where = {};
			if (parseInt(req.query.lastId, 10)) {
				// 초기 로딩이 아닐 때
				where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
			}
			where.UserId = req.user.id;
			where.noticed = { [Op.ne]: 'follow' };

			const notify = await Notice.findAll({
				where,
				limit: 10,
				order: [['createdAt', 'DESC']],

				include: [
					{
						model: User,
						as: 'targetUser',
						attributes: ['id', 'nickname', 'profileImg'],
					},
				],
			});

			return res.status(203).json(notify);
		} else {
			return res.status(400).json('로그인을 해주세요');
		}
	} catch (error) {
		next(error);
	}
});

router.post('/followNotice', async (req, res, next) => {
	try {
		if (req.user) {
			const where = {};
			if (parseInt(req.query.lastId, 10)) {
				// 초기 로딩이 아닐 때
				where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
			}

			where.UserId = req.user.id;
			where.noticed = 'follow';

			const notify = await Notice.findAll({
				limit: 10,
				where,
				order: [['createdAt', 'DESC']],

				include: [
					{
						model: User,
						as: 'targetUser',
						attributes: ['id', 'nickname', 'profileImg'],
					},
				],
			});

			return res.status(203).json(notify);
		} else {
			return res.status(400).json('로그인을 해주세요');
		}
	} catch (error) {
		next(error);
	}
});

router.post('/moblieNotice', async (req, res, next) => {
	try {
		if (req.user) {
			const where = {};
			if (parseInt(req.query.lastId, 10)) {
				// 초기 로딩이 아닐 때
				where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
			}
			where.UserId = req.user.id;

			const notify = await Notice.findAll({
				limit: 10,
				where,
				order: [['createdAt', 'DESC']],

				include: [
					{
						model: User,
						as: 'targetUser',
						attributes: ['id', 'nickname', 'profileImg'],
					},
				],
			});

			notify;

			return res.status(203).json(notify);
		} else {
			return res.status(400).json('로그인을 해주세요');
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
