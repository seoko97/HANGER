import axios from 'axios';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';

export { default } from '../components/Pages/TakeError';

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
	const cookie = context.req?.headers.cookie;

	context.req && cookie && (axios.defaults.headers.Cookie = cookie);

	context.store.dispatch({
		type: LOAD_MY_INFO_REQUEST,
	});

	context.store.dispatch(END);

	const statusCode = context.res
		? context.res.statusCode
		: context.err
		? context.err.statusCode
		: null;

	await context.store.sagaTask.toPromise();
	return { props: { statusCode } };
});
