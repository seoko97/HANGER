const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
	passport.serializeUser((user, done) => {
		// 스토리지 성공시 호출
		// 서버쪽에 [{ id: 1, cookie: 'clhxy' }]

		done(null, user.id); // 입력한 user.id는 deserializeUser의 인자로 넘어감
	});

	passport.deserializeUser(async (id, done) => {
		try {
			// serializeuser에서 입력한 id 정보를 토대로 유저 검색
			const user = await User.findOne({ where: { id } });

			// 데이터를 req.user로 넘겨줌
			done(null, user); // req.user
		} catch (error) {
			console.error(error);
			done(error);
		}
	});

	local();
};
