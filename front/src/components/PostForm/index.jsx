import React, { useCallback, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../UI/Modal';
import useInput from '../../hooks/useInput';
import Button from '../UI/Button';
import Avatar from '../UI/Avatar';
import ImageCollectForm from './ImageCollectForm';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST } from '../../reducers/post';
import {
	PostFormInner,
	PostFormWrapper,
	ImageUpLoadWrapper,
	AvataWrapper,
	TextBox,
	ImageUpLoadForm,
} from './style';
import { BsImage } from 'react-icons/bs';

const PostForm = () => {
	const dispatch = useDispatch();
	const [modalVisible, setModalVisible] = useState(false);
	const [text, texthandler, setText] = useInput('');
	const { me } = useSelector((state) => state.user);
	const { addPostDone, imagesPath } = useSelector((state) => state.post);
	const imageRef = useRef();

	useState(() => {
		if (addPostDone) {
			setText('');
		}
	}, [addPostDone]);

	const openModal = useCallback(() => {
		setModalVisible(true);
	}, [modalVisible]);

	const addPost = useCallback(
		(e) => {
			e.preventDefault();
			if (!text || !text.trim()) {
				return alert('게시글을 작성하세요.');
			}

			setText(text.replace(/(?:\r\n|\r|\n)/g, '<br/>'));

			const formData = new FormData();
			imagesPath.forEach((f) => {
				formData.append('image', f);
			});
			formData.append('content', text);

			dispatch({
				type: ADD_POST_REQUEST,
				data: formData,
			});
			setText('');
			setModalVisible(false);
		},
		[text, imagesPath],
	);

	const onClickImageUpLoad = useCallback(() => {
		imageRef.current.click();
	}, [imageRef.current]);

	const onChangeImages = useCallback((e) => {
		const imageFormData = new FormData();

		[].forEach.call(e.target.files, (f) => {
			f && imageFormData.append('image', f);
		});

		dispatch({
			type: UPLOAD_IMAGES_REQUEST,
			data: imageFormData,
		});
	}, []);

	return (
		<PostFormWrapper>
			<PostFormInner>
				<div>
					<Avatar profileImg={me?.profileImg} />
				</div>
				<div onClick={openModal}>{me.nickname}님, 무슨 생각을 하고 계신가요?</div>
			</PostFormInner>

			<div>
				{modalVisible && (
					<Modal
						visible={modalVisible}
						setModal={setModalVisible}
						closable={true}
						maskClosable={true}
						title="게시물 만들기"
						submit={addPost}
					>
						<AvataWrapper>
							<Avatar profileImg={me?.profileImg}>{me.firstName}</Avatar>
							<span>{me.nickname}</span>
						</AvataWrapper>
						<TextBox>
							<TextareaAutosize
								wrap="hard"
								rows="2"
								cols="20"
								placeholder={`${me.nickname}님, 무슨 생각을 하고 계신가요?`}
								value={text}
								onChange={texthandler}
							/>
						</TextBox>
						{imagesPath[0] && <ImageCollectForm images={imagesPath} />}
						<ImageUpLoadForm>
							<input
								type="file"
								name="image"
								multiple
								hidden
								ref={imageRef}
								onChange={onChangeImages}
							/>
							<ImageUpLoadWrapper onClick={onClickImageUpLoad}>
								<BsImage color="#41B45C" size={24} />
								<span>이미지 업로드</span>
							</ImageUpLoadWrapper>
							<Button htmlType="submit">저장</Button>
						</ImageUpLoadForm>
					</Modal>
				)}
			</div>
		</PostFormWrapper>
	);
};

export default React.memo(PostForm);
