import React, { useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import useInput from '../../../../hooks/useInput';
import {
	CHANGE_USER_INFO_REQUEST,
	CHANGE_USER_PROFILE_IMAGE_REQUEST,
} from '../../../../reducers/user';
import { FaUserAlt } from 'react-icons/fa';
import {
	EditFormWrapper,
	AvatarForm,
	ButtonForm,
	EditFormHeader,
	EditFormInner,
	EditFormMain,
	IdWrpper,
	Input,
	InputForm,
	NameForm,
	TextArea,
	TextareaForm,
} from './style';
import { backUrl } from '../../../../config/config';

const Edit = () => {
	const { me, userProfileImg } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [firstName, setFirstName] = useInput(me ? me?.firstName : '');
	const [lastName, setLastName] = useInput(me ? me?.lastName : '');
	const [nickname, setNickname] = useInput(me ? me?.nickname : '');
	const [intro, setIntro] = useInput(me ? me?.introduction : '');

	const imageInput = useRef();
	const onClickImageUpload = useCallback(() => {
		imageInput.current.click();
	}, [imageInput.current]);

	useEffect(() => {
		!me && Router.push('/');
	}, []);

	const onSubmit = useCallback(
		(e) => {
			e.preventDefault();

			const qa = confirm('저장하시겠습니까?');

			if (qa) {
				dispatch({
					type: CHANGE_USER_INFO_REQUEST,
					data: {
						oldNickname: me?.nickname,
						newNickname: nickname,
						firstName,
						lastName,
						introduction: intro,
					},
				});

				return Router.replace(`/${nickname}`);
			}
		},
		[me?.nickname, nickname, firstName, lastName, intro],
	);

	const onChangeImage = useCallback((e) => {
		if (e.target.files.length > 1) return alert('한 장만 선택할 수 있습니다.');

		const formData = new FormData();
		formData.append('image', e.target.files[0]);
		formData.append('nickname', me?.nickname);

		dispatch({
			type: CHANGE_USER_PROFILE_IMAGE_REQUEST,
			data: formData,
		});
	}, []);

	return (
		<>
			<EditFormWrapper>
				<EditFormInner>
					<EditFormHeader>
						<h2>프로필 수정</h2>
					</EditFormHeader>
					<hr />

					<EditFormMain>
						<AvatarForm>
							<div>
								{userProfileImg || me?.profileImg ? (
									<img
										src={
											userProfileImg
												? `http://localhost:3065/${userProfileImg}`
												: `http://localhost:3065/${me?.profileImg}`
										}
									/>
								) : (
									<FaUserAlt />
								)}
							</div>
							<IdWrpper>
								<span>{me?.userId}</span>
								<input
									type="file"
									name="image"
									multiple
									hidden
									ref={imageInput}
									onChange={onChangeImage}
								/>
								<span onClick={onClickImageUpload} id="profile_change">
									프로필 사진 변경
								</span>
							</IdWrpper>
						</AvatarForm>
						<NameForm>
							<InputForm>
								<span>성</span>
								<Input
									placeholder={me?.firstName}
									value={firstName}
									onChange={setFirstName}
								/>
							</InputForm>
							<InputForm>
								<span>이름</span>
								<Input
									placeholder={me?.lastName}
									value={lastName}
									onChange={setLastName}
								/>
							</InputForm>
						</NameForm>
						<InputForm>
							<span>닉네임</span>
							<Input
								placeholder={me?.nickname}
								value={nickname}
								onChange={setNickname}
								onKeyUp={(e) =>
									(e.target.value = e.target.value.replace(/[^a-zA-Z-_0-9]/g, ''))
								}
							/>
						</InputForm>
						<TextareaForm>
							<span>소개</span>
							<TextArea value={intro} onChange={setIntro} />
						</TextareaForm>
						<ButtonForm>
							<div onClick={onSubmit}>완료</div>
							<Link href={`/${me?.nickname}`}>
								<div>취소</div>
							</Link>
						</ButtonForm>
					</EditFormMain>
				</EditFormInner>
			</EditFormWrapper>
		</>
	);
};

export default React.memo(Edit);
