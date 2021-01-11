import React from 'react';
import styled from 'styled-components';
import {
	AiOutlineShareAlt,
	AiOutlineMessage,
	AiOutlineHeart,
	AiOutlineEllipsis,
} from 'react-icons/ai';
import PostImage from './PostImage';
import Card from '../UI/Card';
import Avatar from '../UI/Avatar';

const PostCardWrapper = styled(Card)`
	width: 90%;

	& :not(:last-child) {
		margin-bottom: 2em;
	}
	& > ul {
		border-radius: 5px;
	}

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		width: 100%;
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
	padding: 1em 2.4em;

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

const MetaDetail = styled.div`
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
	display: flex;
	font-size: 1.6em;
	color: #898989;
	& > li {
		width: 25%;
		text-align: center;
		margin: 1.2rem 0;
		&:hover,
		&:focus {
			color: #40a9ff;
		}
	}
	/* & > li:not(:last-child) {
		border-right: 1px solid #e8e8e8;
	} */
`;

const PostCard = ({ testPng }) => {
	return (
		<PostCardWrapper>
			<PostCardHead>
				<button>팔로우</button>
			</PostCardHead>
			{testPng && <PostImage image={testPng} />}
			<PostCardBody>
				<BodyMeta>
					<div>
						<Avatar>지</Avatar>
					</div>
					<MetaDetail>
						<MetaDetailTitle>지석호</MetaDetailTitle>
						<MetaDetailDescription>
							게시물 작성 게시물 작성 게시물 작성 게시물 작성
							게시물 작성 게시물 작성
						</MetaDetailDescription>
					</MetaDetail>
				</BodyMeta>
			</PostCardBody>
			<PostCardAction>
				<li>
					<AiOutlineShareAlt />
				</li>
				<li>
					<AiOutlineHeart color="red" />
				</li>
				<li>
					<AiOutlineMessage />
				</li>
				<li>
					<AiOutlineEllipsis />
				</li>
			</PostCardAction>
		</PostCardWrapper>
	);
};

export default PostCard;
