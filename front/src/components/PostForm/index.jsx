import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Modal from '../UI/Modal';
import useInput from '../../hooks/useInput';
import Button from '../UI/Button';

const PostFormWrapper = styled.div`
	width: 100%;
	background-color: white;
	border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
	border-radius: 5px;
	min-width: 100%;
	margin-bottom: 2em;
	display: flex;
	align-items: center;
	padding: 1.5em 2em;
	justify-content: center;

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		width: 100%;
		border-radius: 0;
		border: 0;
		margin-bottom: 1em;
	}
`;

const Avatar = styled.div`
	padding-right: 1.6rem;
	& > span {
		box-sizing: border-box;
		font-size: 1.3em;
		font-variant: tabular-nums;
		list-style: none;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ccc;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		color: white;
		& > span {
			position: absolute;
			transform: scale(1) translateX(-50%);
			left: 50%;
			transform-origin: 0 center;
		}
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
						<Button type="primary" htmlType="submit">
							저장
						</Button>
					</Modal>
				)}
			</div>
		</PostFormWrapper>
	);
};

export default PostForm;
