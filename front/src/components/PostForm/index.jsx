import React, { useCallback, useRef, useState } from 'react';
import Modal from '../UI/Modal';
import useInput from '../../hooks/useInput';
import Button from '../UI/Button';
import Avatar from '../UI/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST } from '../../reducers/post';
import { PostFormInner, PostFormWrapper, ImageUpLoadWrapper, AvataWrapper, TextBox } from './style';

const PostForm = () => {
	const dispatch = useDispatch();
	const [modalVisible, setModalVisible] = useState(false);
	const [text, setText] = useInput('');
	const { me } = useSelector((state) => state.user);
	const imageRef = useRef();

	const openModal = useCallback(() => {
		setModalVisible(true);
	}, [modalVisible]);

	const addPost = useCallback(
		(e) => {
			e.preventDefault();
			dispatch({
				type: ADD_POST_REQUEST,
				data: {
					content: text,
				},
			});
			setModalVisible(false);
		},
		[text],
	);

	const onClickImageUpLoad = useCallback(() => {
		imageRef.current.click();
	}, [imageRef.current]);

	// const onChangeImages = useCallback((e) => {
	// 	console.log("image" , e.target.files);
	// 	const imageFormData = new FormData();

	// 	[].forEach.call(e.target.files, (f) => {
	// 		imageFormData.append('image', f);
	// 	})
	// }, []);

	return (
		<PostFormWrapper>
			<PostFormInner>
				<div>
					<Avatar>
						<span>
							<span>지</span>
						</span>
					</Avatar>
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
							<Avatar>{me.firstName}</Avatar>
							<span>{me.nickname}</span>
						</AvataWrapper>
						<TextBox>
							<textarea
								placeholder={`${me.nickname}님, 무슨 생각을 하고 계신가요?`}
								value={text}
								onChange={setText}
							></textarea>
						</TextBox>
						{/* <div>
							<input
								type="file"
								name="image"
								multiple
								hidden
								ref={imageRef}
								onChange={}
							/>
							<ImageUpLoadWrapper>
								이미지 업로드
							</ImageUpLoadWrapper>
						</div> */}
						<Button htmlType="submit">저장</Button>
					</Modal>
				)}
			</div>
		</PostFormWrapper>
	);
};

export default PostForm;
