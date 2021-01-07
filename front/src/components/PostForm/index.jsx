import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Modal from '../UI/Modal';
import useInput from '../../hooks/useInput';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Avatar from '../UI/Avatar';

const PostFormWrapper = styled(Card)`
	width: 90%;
	margin-bottom: 2em;
	display: flex;
	align-items: center;
	padding: 1.5em 2em;
	justify-content: center;

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		width: 100%;
		margin-bottom: 1em;
	}
`;

const PostFormInner = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	& > div:last-child {
		width: 100%;
		background-color: #f0f2f5;
		border-radius: 2rem;
		padding: 1em;
		font-size: 1.6rem;
		color: #65676b;
		cursor: pointer;

		&:hover {
			background-color: #e4e6e9;
		}
	}
`;

const AvataWrapper = styled.div`
	display: flex;
	align-items: center;
	margin: 1rem 0;
	font-weight: bold;

	& > span {
		font-size: 2rem;
	}
`;

const TextBox = styled.div`
	width: 100%;
	margin-bottom: 2em;

	& textarea {
		min-height: 300px;
		border: 0;
		width: 100%;
		height: 100%;
		font-size: 2rem;

		::placeholder {
			color: #cccccc;
		}
		:focus {
			outline: none;
		}
	}

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		& textarea {
			font-size: 1.6em;
		}
	}
`;

const PostForm = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [text, setText] = useInput('');

	const openModal = useCallback(() => {
		setModalVisible(true);
	}, [modalVisible]);

	const addPost = useCallback((e) => {
		e.preventDefault();
		console.log('addPost');
	}, []);

	return (
		<PostFormWrapper>
			<PostFormInner>
				<Avatar>
					<span>
						<span>지</span>
					</span>
				</Avatar>
				<div onClick={openModal}>
					지석호님, 무슨 생각을 하고 계신가요?
				</div>
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
							<Avatar>
								<span>
									<span>지</span>
								</span>
							</Avatar>
							<span>지석호</span>
						</AvataWrapper>
						<TextBox>
							<textarea
								placeholder={
									'지석호님, 무슨 생각을 하고 계신가요?'
								}
								value={text}
								onChange={setText}
							></textarea>
						</TextBox>
						<Button htmlType="submit">저장</Button>
					</Modal>
				)}
			</div>
		</PostFormWrapper>
	);
};

export default PostForm;
