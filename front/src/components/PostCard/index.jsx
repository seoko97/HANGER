import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import {
	AiOutlineMessage,
	AiOutlineHeart,
	AiTwotoneHeart,
	AiOutlineEllipsis,
} from 'react-icons/ai';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import PostImage from './PostImage';
import Avatar from '../UI/Avatar';
import Button from '../UI/Button';
import useClick from '../../hooks/useClick';
import useInput from '../../hooks/useInput';
import {
	ADD_COMMENT_REQUEST,
	REMOVE_POST_REQUEST,
	LIKE_POST_REQUEST,
	UNLIKE_POST_REQUEST,
	SAVE_POST_REQUEST,
	UNSAVE_POST_REQUEST,
} from '../../reducers/post';
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
	Balloon,
} from './style';
import HashTag from '../HashTag';

const PostCard = ({ post }) => {
	const dispatch = useDispatch();
	const { me } = useSelector((state) => state.user);
	const [commentForm, setCommentForm] = useClick(false);
	const [onEllForm, setEllForm] = useClick(false);
	const [save, setSave] = useState(false);

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

	const onRemovePost = useCallback(() => {
		console.log(me?.id, post.User.id);
		if (!me) {
			return alert('로그인이 필요합니다.');
		}
		if (post.User.id !== me.id) {
			return alert('내 게시물이 아닙니다.');
		}

		return dispatch({
			type: REMOVE_POST_REQUEST,
			data: post.id,
		});
	}, [me]);

	const onLike = useCallback(() => {
		if (!me) return alert('로그인 후 사용가능합니다.');
		return dispatch({
			type: LIKE_POST_REQUEST,
			data: post.id,
		});
	}, [me]);

	const onUnLike = useCallback(() => {
		if (!me) return alert('로그인 후 사용가능합니다.');
		return dispatch({
			type: UNLIKE_POST_REQUEST,
			data: post.id,
		});
	}, [me]);

	const onClickBookmark = useCallback(() => {
		if (!me) return alert('로그인 후 사용가능합니다.');

		setSave(!save);

		return dispatch({
			type: SAVE_POST_REQUEST,
			data: post.id,
		});
	}, [me]);

	const liked = post.Likers.find((v) => v.id === me.id);
	// const Saved = post.Savers.find((v) => v.id === me.id);

	return (
		<PostCardWrapper>
			<PostCardHead>
				<button>팔로우</button>
			</PostCardHead>
			{post.Images[0] && <PostImage images={post.Images} />}
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
				<li onClick={setSave}>
					{save ? (
						<BsBookmarkFill cursor="pointer" color="#40a9ff" />
					) : (
						<BsBookmark cursor="pointer" />
					)}
				</li>
				<li cursor="pointer">
					{liked ? (
						<AiTwotoneHeart onClick={onUnLike} color="#fc8383" cursor="pointer" />
					) : (
						<AiOutlineHeart onClick={onLike} cursor="pointer" />
					)}
				</li>
				<li onClick={setCommentForm}>
					<AiOutlineMessage cursor="pointer" />
				</li>
				<li>
					<AiOutlineEllipsis cursor="pointer" onClick={setEllForm} />
					{onEllForm && (
						<Balloon>
							{post.User.id === me?.id ? (
								<span onClick={onRemovePost}>삭제</span>
							) : (
								<span onClick={onRemovePost}>신고</span>
							)}
						</Balloon>
					)}
				</li>
			</PostCardAction>
			{commentForm && (
				<CommentWrapper>
					{me && (
						<div>
							<AddCommentFormWrapper onSubmit={onSubmitComment}>
								<TextareaAutosize
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
								<div key={v.id + v.content}>
									<span>
										<span>{v.User.nickname}</span>
									</span>
									<span>
										<HashTag content={v.content} />
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
