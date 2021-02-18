const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const hpp = require('hpp');
const helmet = require('helmet');
let SequelizeStore = require('connect-session-sequelize')(session.Store);

const userRouter = require('./src/routes/user');
const postRouter = require('./src/routes/post');
const postsRouter = require('./src/routes/posts');
const searchRouter = require('./src/routes/search');
const tagRouter = require('./src/routes/tag');
const db = require('./models');
const passportConfig = require('./src/passport');

dotenv.config();
const app = express();
db.sequelize
	.sync()
	.then(() => {
		console.log('db 연결 성공');
	})
	.catch(console.error);
passportConfig();

if (process.env.NODE_ENV === 'production') {
	app.use(morgan('combined'));
	app.use(hpp());
	app.use(helmet({ contentSecurityPolicy: false }));
	app.use(
		cors({
			origin: 'https://hangerncloset.com',
			credentials: true,
		}),
	);
} else {
	app.use(morgan('dev'));
	app.use(
		cors({
			origin: true,
			credentials: true,
		}),
	);
}

app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
	session({
		saveUninitialized: false,
		resave: false,
		secret: process.env.COOKIE_SECRET,
		store: new SequelizeStore({
			db: db.sequelize,
		}),
		name: 'hangernextjsreact',
		cookie: {
			httpOnly: true,
			secure: false, // https 시 false
			domain: process.env.NODE_ENV === 'production' && '.hangerncloset.com',
		},
	}),
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
	res.send('react hanger 정상 동작');
});

// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/posts', postsRouter);
app.use('/search', searchRouter);
app.use('/tag', tagRouter);

app.listen(process.env.NODE_ENV == 'production' ? process.env.PORT : 3065, () => {
	console.log(`서버 실행 중!${process.env.PORT ? '80' : '3065'} `);
});
