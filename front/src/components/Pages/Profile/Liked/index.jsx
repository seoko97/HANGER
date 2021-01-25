import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../../../PostCard';
import UserProfileForm from '../../../UserProfileForm';

const Like = () => {
	const { mainPosts, unLikePostDone } = useSelector((state) => state.post);
	const { userInfo } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		if (unLikePostDone) {
			return dispatch({
				type: LOAD_USER_SAVE_POSTS_REQUEST,
				data: { nickname: userInfo.nickname },
			});
		}
	}, [unLikePostDone !== 'undefined' && unLikePostDone]);

	return (
		<>
			<UserProfileForm postType="liked">
				{mainPosts.map((c) => (
					<PostCard key={c.id} post={c} />
				))}
			</UserProfileForm>
		</>
	);
};

export default Like;
