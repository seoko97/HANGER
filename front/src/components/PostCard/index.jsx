import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
	AiOutlineShareAlt,
	AiOutlineMessage,
	AiOutlineHeart,
	AiOutlineEllipsis,
} from 'react-icons/ai';
import PostImage from './PostImage';
import Card from '../UI/Card';
import Avatar from '../UI/Avatar';
import Button from '../UI/Button';
import useClick from '../../hooks/useClick';
import useInput from '../../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../../reducers/post';

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
	line-height: 1.3em;
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

const CommentWrapper = styled.div`
	width: 100%;
	display: flex;
	border-top: 1px solid #e4e6eb;
	flex-direction: column;
	& > div {
		width: 100%;
		display: flex;
	}
`;

const AddCommentFormWrapper = styled.form`
	width: 100%;
	display: flex;
	align-items: center;
	padding: 1rem 2rem;

	& > textarea {
		font-size: 1.4rem;
		height: auto;
		border: none;
		resize: none;
		overflow: visible;
		height: 18px;
		outline: none;
		flex-grow: 1;
	}
	& > button {
		font-size: 1.4rem;
		border: 0;
		font-weight: 600;
		box-shadow: 0;
		color: #0095f6;
		display: flex;
		position: relative;
		background-color: rgba(0, 0, 0, 0);
		cursor: pointer;
		&:hover {
			color: #47b3f9;
		}
	}
`;

const CommentsList = styled.div`
	flex: 1 1 auto;
	padding: 1rem 2rem;
	font-size: 1.4rem;

	& > div:first-child {
		font-size: 1.3rem;
		font-weight: 300;
	}

	& > div {
		display: block;
		margin-bottom: 1.2rem;

		& > span {
			display: inline;
			position: relative;
			font-weight: 300;
			line-height: 1.3em;
		}

		& > span:first-child {
			margin-right: 0.6rem;
			font-weight: 600;
			cursor: pointer;
		}
	}
`;

const PostCard = ({ post }) => {
	const dispatch = useDispatch();
	const { me } = useSelector((state) => state.user);
	const [commentForm, setCommentForm] = useClick(false);
	const [comment, commentHandler, setComment] = useInput('');

	const onSubmitComment = useCallback(
		(e) => {
			e.preventDefault();
			dispatch({
				type: ADD_COMMENT_REQUEST,
				data: {
					userId: me.id,
					postId: post.id,
					content: comment,
				},
			});
			setComment('');
		},
		[me && me.id, comment],
	);

	return (
		<PostCardWrapper>
			<PostCardHead>
				<button>팔로우</button>
			</PostCardHead>
			{post.Images[0] && <PostImage images={post.Images[0]} />}
			<PostCardBody>
				<BodyMeta>
					<div>
						<Avatar>{post.User.nickname[0]}</Avatar>
					</div>
					<MetaDetail>
						<MetaDetailTitle>{post.User.nickname}</MetaDetailTitle>
						<MetaDetailDescription>
							{post.content}
						</MetaDetailDescription>
					</MetaDetail>
				</BodyMeta>
			</PostCardBody>
			<PostCardAction>
				<li>
					<AiOutlineShareAlt cursor="pointer" />
				</li>
				<li>
					<AiOutlineHeart color="red" cursor="pointer" />
				</li>
				<li onClick={setCommentForm}>
					<AiOutlineMessage cursor="pointer" />
				</li>
				<li>
					<AiOutlineEllipsis cursor="pointer" />
				</li>
			</PostCardAction>
			{commentForm && (
				<CommentWrapper>
					{me && (
						<div>
							<AddCommentFormWrapper onSubmit={onSubmitComment}>
								{/* <textarea placeholder="댓글쓰기..." />
							<Button>저장</Button> */}
								<textarea
									placeholder="댓글쓰기..."
									value={comment}
									onChange={commentHandler}
								/>
								<Button type="submit" defaultStyle={true}>
									저장
								</Button>
							</AddCommentFormWrapper>
						</div>
					)}
					<div>
						<CommentsList>
							<div>{post.Comments.length}개의 댓글</div>
							{post.Comments.map((v) => (
								<div key={v.User.id}>
									<span>
										<span>{v.User.nickname}</span>
									</span>
									<span>
										<span>{v.content}</span>
									</span>
								</div>
							))}
						</CommentsList>
					</div>
				</CommentWrapper>
			)}
		</PostCardWrapper>
	);
};

export default PostCard;
