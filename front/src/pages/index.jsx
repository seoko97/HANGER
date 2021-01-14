import axios from 'axios';
import { Fragment, useEffect } from 'react';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';
import wrapper from '../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const Home = () => {
	const { me } = useSelector((state) => state.user);
	const { mainPosts } = useSelector((state) => state.post);

	return (
		<Fragment>
			{me && <PostForm />}
			{mainPosts.map((c) => (
				<PostCard key={c.id} post={c} />
			))}
		</Fragment>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
	console.log('getServerSideProps start');

	const cookie = context.req?.headers.cookie;

	context.req && cookie && (axios.defaults.headers.Cookie = cookie);

	context.store.dispatch({
		type: LOAD_MY_INFO_REQUEST,
	});

	context.store.dispatch({
		type: LOAD_MAIN_POSTS_REQUEST,
	});

	context.store.dispatch(END);

	// api 호출
	await context.store.sagaTask.toPromise();
});

export default Home;
