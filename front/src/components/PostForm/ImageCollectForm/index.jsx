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
							<img src={`${v}`} alt={v} />
							<div>{`${v}`}</div>
							<RiCloseCircleFill onClick={onClickRemoveImage(i)} />
						</div>
					</div>
				))}
			</ImagesBox>
		</>
	);
};

export default React.memo(ImageCollectForm);
