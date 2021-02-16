import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadInner } from '../../AppLayOut/Header/MobileHeaderForm';
import Loader from '../../UI/Loader';
import useWindowSize from '../../../hooks/useWindowSize';
import { LOAD_MAIN_POSTS_REQUEST } from '../../../reducers/post';
import NoticeForm from './NoticeForm';
import PostCard from '../../PostCard';
import PostForm from '../../PostForm';
import { HomeWrapper, LeftForm, RightForm } from './style';
import { Helmet } from 'react-helmet';

const Home = () => {
	const { me } = useSelector((state) => state.user);
	const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
	const componentRef = useRef();
	const homeRef = useRef();
	const dispatch = useDispatch();
	const { width: windowWidth } = useWindowSize();
	const [rightRef, setRigthRef] = useState(0);
	const [windowWid, setWidowWid] = useState(0);

	useEffect(() => {
		setRigthRef(
			(windowWidth - homeRef.current.offsetWidth) / 2 + componentRef.current.offsetWidth + 22,
		);
		setWidowWid(windowWidth);
	}, [windowWidth, homeRef?.current, componentRef?.current]);

	useEffect(() => {
		function onScroll() {
			if (
				window.pageYOffset + document.documentElement.clientHeight >
				document.documentElement.scrollHeight - 300
			) {
				if (hasMorePosts && !loadPostsLoading) {
					const lastId = mainPosts[mainPosts.length - 1]?.id;
					dispatch({
						type: LOAD_MAIN_POSTS_REQUEST,
						lastId,
					});
				}
			}
		}
		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, [hasMorePosts, loadPostsLoading, mainPosts]);

	return (
		<>
			<Helmet
				title={`HANGER`}
				description={'나의 일상을 공유하세요'}
				meta={[
					{
						name: 'description',
						content: '나의 일상을 공유하세요',
					},
					{
						property: 'og:title',
						content: `HANGER`,
					},
					{
						property: 'og:description',
						content: '나의 일상을 공유하세요',
					},
					{
						property: 'og:image',
						content: '/logo.png',
					},
					{
						property: 'og:url',
						content: `http://localhost:3060`,
					},
				]}
			/>
			<HomeWrapper ref={homeRef}>
				<LeftForm ref={componentRef}>
					{me && <PostForm />}
					{mainPosts.map((c) => (
						<PostCard key={c.id} post={c} />
					))}
					{loadPostsLoading && (
						<LoadInner>
							<Loader type="spin" color="#ccc" size={30} />
						</LoadInner>
					)}
				</LeftForm>

				{windowWid && windowWid > 480 && (
					<>
						<RightForm style={{ left: `${rightRef}px` }}>
							<NoticeForm />
						</RightForm>
					</>
				)}
			</HomeWrapper>
		</>
	);
};

export default React.memo(Home);
