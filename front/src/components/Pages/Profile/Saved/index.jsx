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
	}, [unSavePostDone]);

	useEffect(() => {
		if (userInfo) {
			if (userInfo?.id !== me?.id) {
				return Router.push('/');
			}
		}
	}, []);

	return (
		<>
			{userInfo?.id === me?.id && (
				<UserProfileForm postType="saved">
					{mainPosts.map((c) => (
						<PostCard key={c.id} post={c} />
					))}
				</UserProfileForm>
			)}
		</>
	);
};

export default React.memo(Save);
