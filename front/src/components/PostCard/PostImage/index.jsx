import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { backUrl } from '../../../config/config';

const PostImageWrapper = styled.div`
	display: flex !important;
	align-items: center;
	justify-content: center;
	border-bottom: 1px solid #e8e8e8;
	overflow: hidden;
	background-color: #fff;

	& > img {
		max-height: 637px;
		max-width: 100%;
		@media (max-width: ${({ theme }) => theme.deviceSizes.TABLET}) {
			max-height: 40vh;
		}
		@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
			max-height: 60vh;
		}
	}
`;

const StyledSlick = styled(Slider)`
	.slick-slide div {
		outline: none;
	}
	.slick-list,
	.slick-track {
		touch-action: pan-y;
	}
	.slick-track {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f7f7f7;
	}
	.slick-dots {
		bottom: 10px;
		& > li {
			width: 10px;
			height: 10px;
		}
	}
`;

const settings = {
	dots: true,
	infinite: false,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
};

const PostImage = ({ images }) => {
	if (images.length == 1) {
		return (
			<PostImageWrapper>
				<img src={`${backUrl}/${images[0].src}`} key={images[0].src + images[0].id} />
			</PostImageWrapper>
		);
	}
	if (images.length >= 2) {
		return (
			<StyledSlick {...settings}>
				{images.map((v, i) => (
					<PostImageWrapper key={v.src + i + v.id}>
						<img src={`${backUrl}/${v.src}`} />
					</PostImageWrapper>
				))}
			</StyledSlick>
		);
	}
};

export default React.memo(PostImage);
