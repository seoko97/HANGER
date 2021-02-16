import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'next/router';
import PostCard from '../../PostCard';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../../../reducers/post';
import Loader from '../../UI/Loader';
import { LoadInner } from '../../AppLayOut/Header/MobileHeaderForm';

const TagPageWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;
	& > div {
		width: 70%;
	}
	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		& > div {
			width: 100%;
		}
	}
`;

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

const TagPageContent = styled.div`
	margin-top: 90px;
	& > h2 {
		padding: 1rem;
		font-size: 1.4rem;
		font-weight: 350;
		color: #8e8e8e;
	}
`;

const TagPost = ({ router: { query } }) => {
	const { mainPosts, hasMorePosts, loadPostsLoading, loadPostsError } = useSelector(
		(state) => state.post,
	);
	const dispatch = useDispatch();

	useEffect(() => {
		function onScroll() {
			if (
				window.pageYOffset + document.documentElement.clientHeight >
				document.documentElement.scrollHeight - 300
			) {
				if (hasMorePosts && !loadPostsLoading) {
					const lastId = mainPosts[mainPosts.length - 1]?.id;
					dispatch({
						type: LOAD_HASHTAG_POSTS_REQUEST,
						data: {
							tag: query?.hashtag,
							lastId,
						},
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
		!loadPostsError && (
			<>
				<TagPageWrapper>
					<div>
						<TagPageHeader>
							<HeaderInner>
								<div>
									#<span>{query?.hashtag}</span>
								</div>
								<div>
									게시물 <span>{mainPosts?.length}</span>
								</div>
							</HeaderInner>
						</TagPageHeader>
						<TagPageContent>
							<h2>게시물</h2>
							{mainPosts?.map((post) => (
								<PostCard post={post} key={post.id} />
							))}
							{loadPostsLoading && (
								<LoadInner>
									<Loader type="spin" color="#ccc" size={30} />
								</LoadInner>
							)}
						</TagPageContent>
					</div>
				</TagPageWrapper>
			</>
		)
	);
};

export default withRouter(React.memo(TagPost));
