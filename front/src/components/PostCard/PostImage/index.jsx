import React from 'react';
import styled from 'styled-components';

const PostImageWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-bottom: 1px solid #ccc;
	background-color: rgba(214, 212, 212, 0.5);

	& > img {
		max-width: 100%;
		max-height: 60vh;
	}
`;

const PostImage = ({ images }) => {
	return (
		<PostImageWrapper>
			<img src={images.src} />
		</PostImageWrapper>
	);
};

export default PostImage;
