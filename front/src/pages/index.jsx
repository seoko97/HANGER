import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

const Home = () => {
	const a = [1, 2];
	const { me } = useSelector((state) => state.user);

	return (
		<Fragment>
			{me && <PostForm />}
			<PostCard key="asdfasdfasdf" testPng="./testPng.png" />
			{a.map((x, y) => (
				<PostCard key={y} />
			))}
			<PostCard key="asdfasdfsasasddf" testPng="./text2img.jpeg" />
		</Fragment>
	);
};

export default Home;
