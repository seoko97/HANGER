import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PostCard from '../../PostCard';

const SinglePostWrapper = styled.div`
	position: relative;
	top: -10px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const SinglePostInner = styled.div`
	width: 70%;
	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		width: 100%;
	}
`;

const SinglePost = () => {
	const { singlePost } = useSelector((state) => state.post);

	return (
		<>
			<SinglePostWrapper>
				<SinglePostInner>
					{singlePost[0] && <PostCard post={singlePost[0]} />}
				</SinglePostInner>
			</SinglePostWrapper>
		</>
	);
};

export default SinglePost;
