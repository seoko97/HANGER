import styled from 'styled-components';
import Card from '../UI/Card';

export const SignUpFormWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: -20px;

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		margin-top: 0;
	}
`;

export const SignUpWrapper = styled(Card)`
	width: 100%;
	max-width: 600px;
	display: flex;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
`;

export const SignUpInner = styled.div`
	width: 100%;
`;
export const SignUpHeader = styled.div`
	width: 100%;
	padding: 2em 0 1em 2em;

	border-bottom: 1px solid #ccc;
	& > div:first-child {
		font-size: 2.8rem;
		font-weight: 600;
	}
	& > div:last-child {
		font-size: 1.5rem;
		color: #606770;
		margin: 1rem 0;
	}
`;

export const SignUpMainContent = styled.form`
	width: 100%;
	padding: 2em;
	display: flex;
	flex-direction: column;
	align-items: center;
	& > div {
		width: 100%;
		display: flex;
		& > span {
			margin-bottom: 0.5rem;
			font-size: 1.4rem;
		}
		& > label {
			margin-left: 0.5rem;
			font-size: 1.4rem;
		}
		& > input {
			margin-bottom: 3rem;
		}
	}
	& > button {
		width: 25%;
		min-width: 100px;
	}
`;

export const InputBox = styled.div`
	position: relative;

	& > input {
		width: 100%;
		padding: 0.8rem 1rem;
		font-size: 1.4rem;
		border-radius: 5px;
		border: 1px solid #ccd0d5;
		&:nth-child(2) {
			margin-left: 10px;
		}
		background-color: rgb(245, 246, 247);
		&[type='date'] {
			background-color: #fff;
		}
	}
	& > div {
		position: absolute;
		top: 5px;
		right: 1.2rem;
		border-radius: 5px;

		&:hover,
		&:active {
			background-color: grey;
		}
	}
`;

export const CheckBox = styled.div`
	width: 100%;
	font-size: 1.4rem;
	border-radius: 5px;
	margin-bottom: 3rem;
	border: 1px solid #ccd0d5;
	&:nth-child(2) {
		margin-left: 10px;
	}
	display: flex;
	padding: 0.8rem 1rem;

	justify-content: space-between;
`;
