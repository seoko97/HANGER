import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import PostCard from '../../../PostCard';
import UserProfileForm from '../../../UserProfileForm';
import { LOAD_USER_SAVE_POSTS_REQUEST } from '../../../../reducers/post';

const Save = () => {
	const { mainPosts, unSavePostDone } = useSelector((state) => state.post);
	const { me, userInfo } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		if (unSavePostDone) {
			return dispatch({
				type: LOAD_USER_SAVE_POSTS_REQUEST,
				data: { nickname: userInfo.nickname },
			});
		}
	}, [unSavePostDone !== 'undefined' && unSavePostDone]);

	useEffect(() => {
		if (me?.id !== userInfo.id) {
			Router.push('/');
		}
	}, []);

	return (
		<>
			{me && (
				<UserProfileForm postType="saved">
					{mainPosts.map((c) => (
						<PostCard key={c.id} post={c} />
					))}
				</UserProfileForm>
			)}
		</>
	);
};

export default Save;