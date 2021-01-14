import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	AiOutlineShareAlt,
	AiOutlineMessage,
	AiOutlineHeart,
	AiOutlineEllipsis,
} from 'react-icons/ai';
import PostImage from './PostImage';
import Avatar from '../UI/Avatar';
import Button from '../UI/Button';
import useClick from '../../hooks/useClick';
import useInput from '../../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../../reducers/post';
import {
	AddCommentFormWrapper,
	BodyMeta,
	CommentsList,
	CommentWrapper,
	MetaDetail,
	MetaDetailDescription,
	MetaDetailTitle,
	PostCardAction,
	PostCardBody,
	PostCardHead,
	PostCardWrapper,
} from './style';
import HashTag from '../HashTag';

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
							<HashTag content={post.content} />
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
