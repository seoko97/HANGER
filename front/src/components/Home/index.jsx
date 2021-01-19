import React from 'react';
import { useSelector } from 'react-redux';
import NoticeForm from '../NoticeForm';
import PostCard from '../PostCard';
import PostForm from '../PostForm';
import { LeftForm, RightForm } from './style';

const Home = () => {
	const { me } = useSelector((state) => state.user);
	const { mainPosts } = useSelector((state) => state.post);

	return (
		<>
			<LeftForm>
				{me && <PostForm />}
				{mainPosts.map((c) => (
					<PostCard key={c.id} post={c} />
				))}
			</LeftForm>
			<RightForm>
				<NoticeForm />
			</RightForm>
		</>
	);
};

export default Home;
