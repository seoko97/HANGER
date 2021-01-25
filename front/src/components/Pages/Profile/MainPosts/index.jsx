import React from 'react';
import { useSelector } from 'react-redux';
import PostCard from '../../../PostCard';
import UserProfileForm from '../../../UserProfileForm';

const Profile = () => {
	const { mainPosts } = useSelector((state) => state.post);
	return (
		<>
			<UserProfileForm postType="mainPost">
				{mainPosts.map((c) => (
					<PostCard key={c.id} post={c} />
				))}
			</UserProfileForm>
		</>
	);
};

export default Profile;
