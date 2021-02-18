import React, { Fragment, useCallback, useEffect } from 'react';
import Link from 'next/link';
import router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../UI/Loader';
import Button from '../../UI/Button';
import useInput from '../../../hooks/useInput';
import { SIGN_IN_REQUEST } from '../../../reducers/user';
import {
	GlayLine,
	InputWrapper,
	SignInFormWrapper,
	SignInInner,
	SignInWrapper,
	SignupLink,
	LoadInner,
} from './style';

const SignInForm = () => {
	const [userId, setUserId] = useInput('');
	const [password, setPassword] = useInput('');

	const { me, signInDone, signInError, signInLoading } = useSelector((state) => state.user);

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

	useEffect(() => {
		if (signInError) {
			if (signInError !== null) alert(signInError);
		}
	}, [signInError]);

	const onSignIn = useCallback(
		(e) => {
			e.preventDefault();

			if (!userId) return alert('아이디를 입력하세요.');
			if (!password) return alert('비밀번호를 입력하세요.');

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
		!me && (
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
							<Button htmlType="submit">
								{signInLoading ? (
									<LoadInner>
										<Loader type="spin" color="#ccc" size={20} />
									</LoadInner>
								) : (
									'로그인'
								)}
							</Button>
							<GlayLine />
							<SignupLink>
								<Link href="/signup">새 계정 만들기</Link>
							</SignupLink>
						</SignInInner>
					</SignInWrapper>
				</SignInFormWrapper>
			</Fragment>
		)
	);
};

export default React.memo(SignInForm);
