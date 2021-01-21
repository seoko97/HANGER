import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useWindowSize from '../../hooks/useWindowSize';
import NoticeForm from '../NoticeForm';
import PostCard from '../PostCard';
import PostForm from '../PostForm';
import { HomeWrapper, LeftForm, RightForm } from './style';

const Home = () => {
	const { me } = useSelector((state) => state.user);
	const { mainPosts } = useSelector((state) => state.post);
	const componentRef = useRef();
	const homeRef = useRef();
	const { width: windowWidth } = useWindowSize();
	const [rightRef, setRigthRef] = useState(0);

	useEffect(() => {
		setRigthRef(
			(windowWidth - homeRef.current.offsetWidth) / 2 + componentRef.current.offsetWidth + 22,
		);
	}, [windowWidth, homeRef?.current, componentRef?.current]);

	return (
		<>
			<HomeWrapper ref={homeRef}>
				<LeftForm ref={componentRef}>
					{me && <PostForm />}
					{mainPosts.map((c) => (
						<PostCard key={c.id} post={c} />
					))}
				</LeftForm>

				<RightForm style={{ left: `${rightRef}px` }}>
					<NoticeForm />
				</RightForm>
			</HomeWrapper>
		</>
	);
};

export default Home;
