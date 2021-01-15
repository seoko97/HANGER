import React, { useCallback } from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { REMOVE_IMAGE } from '../../../reducers/post';
import { ImagesBox } from './style';

const ImageCollectForm = ({ images }) => {
	const dispatch = useDispatch();

	const onClickRemoveImage = useCallback(
		(i) => () => {
			dispatch({
				type: REMOVE_IMAGE,
				data: i,
			});
		},
		[],
	);

	return (
		<>
			<ImagesBox length={images.length}>
				{images.map((v, i) => (
					<div key={v + i}>
						<div>
							<img src={`http://localhost:3065/${v}`} alt={v} />
							{/* {images.length >= 4 && images.length - 1 == i && (
								<span> + {images.length - 3} 개의 사진</span>
							)} */}
							<RiCloseCircleFill onClick={onClickRemoveImage(i)} />
						</div>
					</div>
				))}
			</ImagesBox>
		</>
	);
};

export default ImageCollectForm;
