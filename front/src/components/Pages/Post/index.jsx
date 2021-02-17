import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PostCard from '../../PostCard';
import { backUrl } from '../../../config/config';

const TagPageHeader = styled.div`
	width: 100%;
	height: 100px;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	left: 0;
	top: 70px;
	background-color: #fff;
	font-size: 1.6rem;
	font-weight: 400;
	margin-bottom: 1rem;
	padding: 1rem;
	border-bottom: 1px solid #e8e8e8;
`;

const HeaderInner = styled.div`
	width: 40%;
	min-width: 700px;
	& > div:first-child {
		font-size: 2.3rem;
		margin-bottom: 1.3rem;
		& > span {
			font-weight: 300;
		}
	}
	& span {
		font-weight: 600;
	}
	@media (max-width: ${({ theme }) => theme.deviceSizes.TABLET}) {
		min-width: 500px;
	}

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		width: 100%;
		min-width: 0;
	}
`;

const SinglePostWrapper = styled.div`
	display: flex;
	margin-top: 90px;
	justify-content: center;
	width: 100%;
	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		margin-top: 100px;
	}
`;

const SinglePostInner = styled.div`
	width: 70%;
	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		width: 100%;
	}
`;

const SinglePost = () => {
	const { mainPosts } = useSelector((state) => state.post);

	return (
		mainPosts[0] !== undefined && (
			<>
				<Helmet
					title={
						mainPosts[0]?.User.nickname
							? `${mainPosts[0]?.User.nickname}님의 글`
							: 'HANGER'
					}
					description={mainPosts[0]?.content}
					meta={[
						{
							name: 'description',
							content: mainPosts[0]?.content,
						},
						{
							property: 'og:title',
							content: `${mainPosts[0]?.User.nickname}님의 게시글`,
						},
						{
							property: 'og:description',
							content: mainPosts[0]?.content,
						},
						{
							property: 'og:image',
							content: mainPosts[0]?.Images[0]
								? `${backUrl}/${mainPosts[0]?.Images[0].src}`
								: '/logo.png',
						},
						{
							property: 'og:url',
							content: `http://hangerncloset.com/post/${mainPosts[0]?.id}`,
						},
					]}
				/>
				<SinglePostWrapper>
					<TagPageHeader>
						<HeaderInner>
							<span>{mainPosts[0]?.User?.nickname} </span>
							님의 게시글
						</HeaderInner>
					</TagPageHeader>
					<SinglePostInner>
						{mainPosts[0] && <PostCard post={mainPosts[0]} />}
					</SinglePostInner>
				</SinglePostWrapper>
			</>
		)
	);
};

export default SinglePost;
