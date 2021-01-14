import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Router from 'next/router';
import { SIGN_UP_REQUEST } from '../../reducers/user';
import useInput from '../../hooks/useInput';
import Button from '../../components/UI/Button';
import {
	SignUpWrapper,
	InputBox,
	SignUpHeader,
	SignUpInner,
	SignUpMainContent,
	CheckBox,
} from './style';

const SignUpFrom = () => {
	const [firstName, setFirstName] = useInput('');
	const [lastName, setLastName] = useInput('');
	const [userId, setUserId] = useInput('');
	const [nickname, setNickname] = useInput('');
	const [birth, setBirth] = useInput('0000-00-00');
	const [gender, setGender] = useInput('');

	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [term, setTerm] = useState(false);
	const [termError, setTermError] = useState(false);
	const [visible, setVisible] = useState(false);
	const [type, setType] = useState('password');

	const { me, signUpError, signUpDone } = useSelector((state) => state.user);

	useEffect(() => {
		signUpDone && Router.replace('/');
	}, [signUpDone]);

	useEffect(() => {
		me && Router.replace('/');
	}, [me]);

	const dispatch = useDispatch();

	const onSignUp = useCallback(
		(e) => {
			e.preventDefault();

			console.log('onSignIn');

			if (password.length < 4) {
				console.log('ss');
				return setPasswordError(true);
			}
			if (!term) {
				return setTermError(true);
			}

			dispatch({
				type: SIGN_UP_REQUEST,
				data: {
					userId,
					password,
					firstName,
					lastName,
					nickname,
					birth,
					gender,
				},
			});

			signUpError && alert('이미 존재하는 아이디입니다.');

			console.log('onSignInEnd');
		},
		[userId, nickname, firstName, lastName, birth, gender, term, password],
	);
	const onChangePassword = useCallback(
		(e) => {
			setPassword(e.target.value);

			if (password.length >= 3) setPasswordError(false);

			console.log(password.length, passwordError);
		},
		[password, passwordError],
	);

	const useChecked = useCallback((e) => {
		setTerm(e.target.checked);
		e.target.checked && setTermError(false);
	}, []);

	const onChangeType = useCallback(() => {
		setVisible(!visible);
		type == 'password' ? setType('text') : setType('password');
	}, [visible, type]);

	return (
		<Fragment>
			<SignUpWrapper>
				<SignUpInner>
					<SignUpHeader>
						<div>가입하기</div>
						<div>빠르고 간단합니다.</div>
					</SignUpHeader>
					<SignUpMainContent onSubmit={onSignUp}>
						<InputBox>
							<input
								placeholder="성(姓)"
								type="text"
								value={firstName}
								onChange={setFirstName}
								required
							/>
							<input
								placeholder="이름(성은 제외)"
								type="text"
								value={lastName}
								onChange={setLastName}
								required
							/>
						</InputBox>

						<InputBox>
							<input
								placeholder="아이디"
								type="text"
								value={userId}
								onChange={setUserId}
								required
							/>
						</InputBox>

						<InputBox>
							<input
								placeholder="비밀번호(4글자 이상)"
								type={type}
								value={password}
								onChange={onChangePassword}
								required
							/>
							<div onClick={onChangeType} title="비밀번호 확인">
								{!visible ? (
									<AiOutlineEye size={23} />
								) : (
									<AiOutlineEyeInvisible size={23} />
								)}
							</div>
						</InputBox>
						{passwordError && (
							<div
								style={{
									color: 'red',
									fontSize: '1.2rem',
									marginBottom: '1.2rem',
								}}
							>
								비밀번호는 4글자 이상이어야 합니다.
							</div>
						)}

						<InputBox>
							<input
								placeholder="닉네임"
								type="text"
								value={nickname}
								onChange={setNickname}
								required
							/>
						</InputBox>

						<div>
							<span>생일</span>
						</div>
						<InputBox>
							<input
								type="date"
								name="date"
								value={birth}
								onChange={setBirth}
								required
							/>
						</InputBox>

						<div>
							<span>성별</span>
						</div>
						<div>
							<CheckBox>
								<label htmlFor="male">남성</label>
								<input
									type="radio"
									name="gender"
									value="male"
									required
									onClick={setGender}
								/>
							</CheckBox>

							<CheckBox>
								<label htmlFor="female">여성</label>
								<input
									type="radio"
									name="gender"
									value="female"
									required
									onClick={setGender}
								/>
							</CheckBox>
						</div>

						<div>
							<input
								name="term"
								type="checkbox"
								checked={term}
								onChange={useChecked}
							/>
							<label htmlFor="term">동의함</label>
						</div>
						{termError && (
							<div
								style={{
									color: 'red',
									fontSize: '1.2rem',
									marginBottom: '1.2rem',
								}}
							>
								약관에 동의하셔야 합니다.
							</div>
						)}
						<Button type="submit">가입하기</Button>
					</SignUpMainContent>
				</SignUpInner>
			</SignUpWrapper>
		</Fragment>
	);
};

export default SignUpFrom;
