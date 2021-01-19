import React, { useCallback } from 'react';
import useInput from '../../../hooks/useInput';
import styled from 'styled-components';
import { RiCloseCircleFill } from 'react-icons/ri';

export const ModalOverlay = styled.div`
	box-sizing: border-box;
	display: ${(props) => (props.visible ? 'block' : 'none')};
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: #f1f1f2;
	opacity: 0.5;
	z-index: 999;
`;

export const ModalWrapper = styled.div`
	box-sizing: border-box;
	display: ${(props) => (props.visible ? 'block' : 'none')};
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1000;
	overflow: auto;
	outline: 0;
`;

const ModalInner = styled.form`
	box-sizing: border-box;
	position: relative;
	box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
	background-color: #fff;
	border-radius: 1rem;
	width: 500px;
	display: flex;
	flex-direction: column;
	top: 50%;
	transform: translateY(-50%);
	margin: 0 auto;
	padding: 2rem 1.6rem 2rem 1.6rem;

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		width: 90%;
	}
`;

const CloseBox = styled(RiCloseCircleFill)`
	position: absolute;
	top: 8px;
	right: 14px;
	background-color: #f2f3f5;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	font-size: 2rem;
	cursor: pointer;

	&:hover {
		transition-duration: 0.2s;
		background-color: gray;
	}
`;

const HerderBox = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid #cccccc;

	& > h2 {
		font-size: 1.6rem;
		font-weight: bold;
		padding-bottom: 1em;
	}
`;

const Modal = ({ children, submit, setModal, maskClosable, closable, visible, title }) => {
	const onMaskClick = useCallback((e) => {
		if (e.target === e.currentTarget) {
			onClose(e);
		}
	}, []);

	const onClose = useCallback(() => {
		setModal(false);
	}, []);

	return (
		<>
			<ModalOverlay visible={visible} />
			<ModalWrapper
				onClick={maskClosable ? onMaskClick : null}
				tabIndex="-1"
				visible={visible}
			>
				<ModalInner tabIndex="0" onSubmit={submit}>
					{closable && <CloseBox onClick={onClose} size={32} />}
					<HerderBox>
						<h2>{title}</h2>
					</HerderBox>
					{children}
				</ModalInner>
			</ModalWrapper>
		</>
	);
};

export default Modal;
