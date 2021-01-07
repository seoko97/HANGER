import React, { Fragment, useCallback } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';

const SignInWrapper = styled(Card)`
	width: 100%;
	max-width: 400px;
	display: flex;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const SignInForm = styled.form`
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

const InputWrapper = styled.div`
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

const GlayLine = styled.div`
	align-items: center;
	width: 100%;
	border-bottom: 1px solid #dadde1;
	display: flex;
	text-align: center;
	margin: 2rem 0;
`;

const SignupLink = styled.div`
	width: 30%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #42b829;
	color: #fff;
	padding: 1.5rem 0;
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

const SignIn = () => {
	const onSignIn = useCallback((e) => {
		e.preventDefault();
		console.log('onSignIn');
	}, []);
	return (
		<Fragment>
			<SignInWrapper>
				<SignInForm onSubmit={onSignIn}>
					<h1>로그인</h1>
					<div></div>
					<InputWrapper>
						<input placeholder="아이디" name="id" />
					</InputWrapper>
					<InputWrapper>
						<input placeholder="비밀번호" name="password" />
					</InputWrapper>
					<Button htmlType="submit">로그인</Button>
					<GlayLine />
					<SignupLink>
						<Link href="/">새 계정 만들기</Link>
					</SignupLink>
				</SignInForm>
			</SignInWrapper>
		</Fragment>
	);
};

export default SignIn;
