import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
	const dispatch = useDispatch();
	const { me } = useSelector((state) => state.user);
	const { mainPosts } = useSelector((state) => state.post);

	useEffect(() => {
		dispatch({ type: LOAD_POSTS_REQUEST });
	}, []);

	return (
		<Fragment>
			{me && <PostForm />}
			{mainPosts.map((c) => (
				<PostCard key={c.id} post={c} />
			))}
		</Fragment>
	);
};

export default Home;
