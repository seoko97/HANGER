import React, { Fragment, useCallback, useEffect } from 'react';
import Link from 'next/link';
import router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/UI/Button';
import useInput from '../../hooks/useInput';
import { SIGN_IN_REQUEST } from '../../reducers/user';
import {
	GlayLine,
	InputWrapper,
	SignInFormWrapper,
	SignInInner,
	SignInWrapper,
	SignupLink,
} from './style';

const SignInForm = () => {
	const [userId, setUserId] = useInput('');
	const [password, setPassword] = useInput('');

	const { me, signInDone } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	useEffect(() => {
		if (me) {
			router.replace('/');
		}
	}, [me]);

	useEffect(() => {
		if (signInDone) {
			router.replace('/');
		}
	}, [signInDone]);

	const onSignIn = useCallback(
		(e) => {
			e.preventDefault();

			dispatch({
				type: SIGN_IN_REQUEST,
				data: {
					userId,
					password,
				},
			});
		},
		[userId, password],
	);
	return (
		<Fragment>
			<SignInFormWrapper>
				<SignInWrapper>
					<SignInInner onSubmit={onSignIn}>
						<h1>로그인</h1>
						<div></div>
						<InputWrapper>
							<input
								placeholder="아이디"
								name="id"
								value={userId}
								onChange={setUserId}
							/>
						</InputWrapper>
						<InputWrapper>
							<input
								placeholder="비밀번호"
								name="password"
								value={password}
								onChange={setPassword}
								type="password"
							/>
						</InputWrapper>
						<Button htmlType="submit">로그인</Button>
						<GlayLine />
						<SignupLink>
							<Link href="/signup">새 계정 만들기</Link>
						</SignupLink>
					</SignInInner>
				</SignInWrapper>
			</SignInFormWrapper>
		</Fragment>
	);
};

export default SignInForm;
