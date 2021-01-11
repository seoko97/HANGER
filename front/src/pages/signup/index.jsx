import React, { Fragment, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Router from 'next/router';
import { SIGN_UP_REQUEST } from '../../reducers/user';
import useInput from '../../hooks/useInput';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';

const SignUpWrapper = styled(Card)`
	width: 100%;
	max-width: 600px;
	display: flex;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const SignUpInner = styled.div`
	width: 100%;
`;
const SignUpHeader = styled.div`
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

const SignUpMainContent = styled.form`
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
			margin-bottom: 1.2rem;
		}
	}
	& > button {
		width: 25%;
		min-width: 100px;
	}
`;

const InputBox = styled.div`
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

const CheckBox = styled.div`
	width: 100%;
	font-size: 1.4rem;
	border-radius: 5px;
	margin-bottom: 1.2rem;
	border: 1px solid #ccd0d5;
	&:nth-child(2) {
		margin-left: 10px;
	}
	display: flex;
	padding: 0.8rem 1rem;

	justify-content: space-between;
`;

const SignUp = () => {
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

	const { signUpDone } = useSelector((state) => state.user);

	useEffect(() => {
		signUpDone && Router.replace('/');
	}, [signUpDone]);

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

			console.log('onSignInEnd');
		},
		[gender, term, password],
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

export default SignUp;
