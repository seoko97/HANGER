const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { Op } = require('sequelize');

const { User } = require('../models');
const { Post } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
	// 로그인한 유저 정보 불러오기
	try {
		console.log('내정보 요청');
		// 만약 유저 정보가 존재 한다면
		if (req.user) {
			const fullUserWithoutPassword = await User.findOne({
				// req.user에 저장된 id값으로 해당 유저 검색
				where: { id: req.user.id },

				// password 제외
				attributes: {
					exclude: ['password'],
				},
			});

			return res.status(200).json(fullUserWithoutPassword);
		} else {
			return res.status(400).json('로그인을 해주세요');
		}
	} catch (e) {
		console.error(e);
		next(e);
	}
});

router.post('/signup', async (req, res, next) => {
	// 회원가입 실행
	try {
		const exUser = await User.findOne({
			// User 테이블에서 해당 아이디 검색
			where: {
				userId: req.body.userId,
			},
		});
		if (exUser) {
			return res.status(403).send('이미 사용 중인 아이디입니다.');
		}

		const hashedPassword = await bcrypt.hash(req.body.password, 12);
		const user = await User.create({
			userId: req.body.userId,
			nickname: req.body.nickname,
			password: hashedPassword,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			gender: req.body.gender,
			birth: req.body.birth,
			profileImg: '',
		});

		res.status(201).send('ok');
	} catch (error) {
		console.error(error);
		next(error); // status 500
	}
});

router.post('/signin', (req, res, next) => {
	// 로그인 전략
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			console.error(err);
			return next(err);
		}

		if (info) {
			console.log('info에러', info);
			return res.status(401).send(info.reason);
		}

		return req.login(user, async (loginErr) => {
			if (loginErr) {
				console.error(loginErr);
				return next(loginErr);
			}

			// post 테이블과 팔로우관계 테이블 등을 정의 후 include 명령어를 통해 데티어를 함께 전송
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

module.exports = router;
