import { Fragment } from 'react';
import PostCard from '../components/PostCard';
import { AiOutlinePicture } from 'react-icons/ai';
import styled from 'styled-components';
import PostForm from '../components/PostForm';

const Home = () => {
	const a = [1, 2];
	return (
		<Fragment>
			<PostForm />
			<PostCard key="asdfasdfasdf" testPng="./testPng.png" />
			{a.map((x, y) => (
				<PostCard key={y} />
			))}
			<PostCard key="asdfasdfsasasddf" testPng="./text2img.jpeg" />
		</Fragment>
	);
};

export default Home;
