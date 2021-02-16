import axios from 'axios';
import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_SINGLE_POST_REQUEST } from '../../reducers/post';

export { default } from '../../components/Pages/Post';

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
	const cookie = context.req?.headers.cookie;

	context.req && cookie && (axios.defaults.headers.Cookie = cookie);

	context.store.dispatch({
		type: LOAD_MY_INFO_REQUEST,
	});

	context.store.dispatch({
		type: LOAD_SINGLE_POST_REQUEST,
		data: { id: context.query.id },
	});

	context.store.dispatch(END);

	await context.store.sagaTask.toPromise();
});
