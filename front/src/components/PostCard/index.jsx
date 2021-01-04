import React from 'react';
import styled from 'styled-components';

const PostCardWrapper = styled.div`
	width: 100%;
	background-color: white;
	border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
	border-radius: 5px;
	min-width: 100%;

	& :not(:last-child) {
		margin-bottom: 2em;
	}

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		width: 100%;
		border-radius: 0;
		border: 0;
		& :not(:last-child) {
			margin-bottom: 1em;
		}
	}
`;

const PostCardHead = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	border-bottom: 1px solid #e8e8e8;
	padding: 1.6em 2.4em;

	& > button {
		border: 1px solid #ccc;
		border-radius: 3px;
		height: 32px;
		padding: 0 1em;
		background-color: white;
		font-size: 1.4rem;
		color: #808080;
		&:focus,
		&:hover {
			color: #40a9ff;
			border-color: #40a9ff;
		}
	}
`;

const PostCardBody = styled.div`
	padding: 2rem;
`;

const BodyMeta = styled.div`
	display: flex;
`;

const MetaAvatar = styled.div`
	padding-right: 16px;
	& > span {
		box-sizing: border-box;
		font-size: 14px;
		font-variant: tabular-nums;
		list-style: none;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ccc;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		color: white;
		& > span {
			position: absolute;
			transform: scale(1) translateX(-50%);
			left: 50%;
			transform-origin: 0 center;
		}
	}
`;

const MetaDetail = styled.div`
	overflow: hidden;
	width: 100%;
	& > div:not(:last-child) {
		margin-bottom: 8px;
	}
`;
const MetaDetailTitle = styled.div`
	overflow: hidden;
	font-weight: 500;
	font-size: 1.6rem;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

const MetaDetailDescription = styled.div`
	font-weight: normal;
	box-sizing: border-box;
	font-size: 1.4rem;
`;

const PostCardAction = styled.ul`
	border-top: 1px solid #e8e8e8;
`;

const PostCard = () => {
	return (
		<PostCardWrapper>
			<PostCardHead>
				<button>팔로우</button>
			</PostCardHead>
			<PostCardBody>
				<BodyMeta>
					<MetaAvatar>
						<span>
							<span>지</span>
						</span>
					</MetaAvatar>
					<MetaDetail>
						<MetaDetailTitle>지석호</MetaDetailTitle>
						<MetaDetailDescription>
							게시물 작성
						</MetaDetailDescription>
					</MetaDetail>
				</BodyMeta>
			</PostCardBody>
			<PostCardAction>asdasd</PostCardAction>
		</PostCardWrapper>
	);
};

export default PostCard;
