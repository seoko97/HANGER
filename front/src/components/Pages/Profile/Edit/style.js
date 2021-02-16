import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';
import Card from '../../../UI/Card';

export const EditFormWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	& hr {
		margin: 0 4rem;
		background-color: #dadde1;
		border-width: 0;
		color: #dadde1;
		height: 1px;
	}
`;

export const EditFormInner = styled(Card)`
	width: 80%;
	min-height: 70%;

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		width: 100%;
	}
`;
export const EditFormHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 2rem;
	font-weight: 600;
	padding: 2rem 1.5rem;
`;

export const IdWrpper = styled.div`
	display: flex;
	flex-direction: column;
	& > span:first-child {
		font-size: 2rem;
		margin-bottom: 1rem;
	}
	& > span:last-child {
		font-size: 1.3rem;
		background-color: #fff;
		border: 1px solid #e8e8e8;
		border-radius: 5px;
		padding: 0.5rem 0.7rem;
		cursor: pointer;
		color: #0095f6;
		&:hover,
		&:focus {
			background-color: #e8e8e8;
			transition: all 0.2s;
			color: #027dce;
		}
	}
`;

export const EditFormMain = styled.form`
	display: flex;
	width: 100%;
	flex-direction: column;
	padding: 2rem 4rem;

	& > div,
	& > span {
		font-size: 1.6rem;
		margin-bottom: 2rem;
	}
`;

export const AvatarForm = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	& > div:first-child {
		width: 100px;
		height: 100px;
		display: flex;
		justify-content: flex-end;
		margin-right: 2rem;
		position: relative;
		background-color: #e8e8e8;
		border-radius: 50%;
		border: 1px solid #ddd;
		overflow: hidden;
		box-sizing: border-box;

		@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
			width: 77px;
			height: 77px;
		}
		& > img {
			border-radius: 50%;
			width: 100%;
			height: 100%;
		}
		& > svg {
			position: absolute;
			width: 100%;
			height: 70%;
			bottom: 0;
			color: white;
		}
	}
`;

export const NameForm = styled.div`
	width: 100%;
	display: flex;
	padding-left: 4.2rem;

	& > div:first-child {
		margin-right: 1rem;
	}

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		padding-left: 0;
	}
`;

export const InputForm = styled.div`
	width: 100%;
	font-weight: 500;
	display: flex;
	align-items: center;
	& > span {
		display: flex;
		justify-content: flex-end;
		width: 12%;
		margin-right: 2rem;
	}

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		display: flex;
		flex-direction: column;
		align-items: baseline;
		& > span {
			display: flex;
			width: 100%;
			margin: 0 0 0.5rem 0.5rem;
			justify-content: flex-start;
		}
		& > input {
			width: 100%;
		}
	}
`;

export const Input = styled.input`
	width: 88%;
	height: 32px;
	padding-left: 1rem;
	border: 1px solid #dbdbdb;
	border-radius: 5px;
`;

export const TextareaForm = styled.div`
	width: 100%;
	font-weight: 500;
	display: flex;
	& > span {
		display: flex;
		justify-content: flex-end;
		width: 12%;
		line-height: 20px;
		margin-right: 2rem;
	}
	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		flex-direction: column;
		& > span {
			margin: 0 0 0.5rem 0.5rem;
			justify-content: flex-start;
		}
	}
`;

export const TextArea = styled(Textarea)`
	min-width: 85%;
	max-width: 85%;
	display: flex;
	min-height: 100px;
	padding: 0.6rem 1rem;
	line-height: 20px;
	border: 1px solid #dbdbdb;
	border-radius: 5px;

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		min-width: 100%;
		max-width: 100%;
	}
`;

export const ButtonForm = styled.div`
	display: flex;
	flex: 1 1 auto;
	align-items: center;
	justify-content: center;
	margin-top: 3rem;
	& > div:first-child {
		margin-right: 1rem;
		background-color: #1890ff;
		border-color: #1890ff;
		color: #fff;
		&:hover,
		&:focus {
			background-color: #40a9ff;
			border-color: #40a9ff;
		}
	}
	& > div {
		cursor: pointer;
		width: 25%;
		border-color: #e8e8e8;
		background-color: #e8e8e8;
		box-sizing: border-box;
		box-shadow: 0 -2px 0 rgba(0, 0, 0, 0.045);
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1.5rem;
		border-radius: 0.4rem;
		font-size: 1.6rem;
		color: #000;
		transition-property: background-color;
		transition-duration: 0.5s;
		&:hover,
		&:focus {
			background-color: #d1d1d1;
			border-color: #d1d1d1;
		}
	}
`;
