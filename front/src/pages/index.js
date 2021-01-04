import Head from 'next/head';
import { Fragment } from 'react';
import PostCard from '../components/PostCard';

const Home = () => {
	const a = [1, 2, 3, 4, 5, 6, 6];
	return (
		<Fragment>
			{a.map((x, y) => (
				<PostCard key={y} />
			))}
		</Fragment>
	);
};

export default Home;
