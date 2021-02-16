import axios from 'axios';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';

export { default } from '../../components/Pages/Info';

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
	const cookie = context.req?.headers.cookie;

	context.req && cookie && (axios.defaults.headers.Cookie = cookie);

	context.store.dispatch({
		type: LOAD_MY_INFO_REQUEST,
	});

	context.store.dispatch(END);

	await context.store.sagaTask.toPromise();
});
