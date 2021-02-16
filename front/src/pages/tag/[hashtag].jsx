import axios from 'axios';
import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';

export { default } from '../../components/Pages/Tag';

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
	const cookie = context.req?.headers.cookie;

	context.req && cookie && (axios.defaults.headers.Cookie = cookie);

	context.store.dispatch({
		type: LOAD_MY_INFO_REQUEST,
	});

	context.store.dispatch({
		type: LOAD_HASHTAG_POSTS_REQUEST,
		data: {
			tag: context.query.hashtag,
		},
	});

	context.store.dispatch(END);

	await context.store.sagaTask.toPromise();
});
