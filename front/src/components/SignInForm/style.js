import styled from 'styled-components';
import Card from '../UI/Card';

export const SignInFormWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: -20px;

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		margin-top: 0;
	}
`;

export const SignInWrapper = styled(Card)`
	width: 100%;
	max-width: 400px;
	display: flex;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
`;

export const SignInInner = styled.form`
	display: flex;
	width: 100%;
	padding: 2em;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	& > button {
		width: 100%;
	}

	& > h1 {
		font-size: 2.4rem;
		font-weight: 600;
		& + div {
			width: 100%;
			margin: 2rem 0;
			border-bottom: 1px solid #dadde1;
		}
	}
`;

export const InputWrapper = styled.div`
	width: 100%;
	margin-bottom: 1.6rem;
	& > input {
		width: 100%;
		height: 50px;
		font-size: 1.6rem;
		border: 1px solid #ccc;
		border-radius: 6px;
		padding: 1.4rem 1.6rem;
	}
	& > input::placeholder {
		font-size: 1.6rem;
	}
`;

export const GlayLine = styled.div`
	align-items: center;
	width: 100%;
	border-bottom: 1px solid #dadde1;
	display: flex;
	text-align: center;
	margin: 2rem 0;
`;

export const SignupLink = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #42b829;
	color: #fff;
	padding: 1.5rem 1rem;
	border-radius: 6px;
	font-size: 1.6rem;
	font-weight: 500;
	transition-property: background-color;
	transition-duration: 0.5s;
	cursor: pointer;
	&:focus {
		background-color: #ace0a2;
		border-color: #ace0a2;
	}
	&:hover {
		background-color: #328c20;
		border-color: #328c20;
	}
`;
