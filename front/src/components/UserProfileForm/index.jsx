import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { BsFilePost, BsBookmark } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import Link from 'next/link';
import {
	ChangeProfile,
	Divtag,
	MainContentWrapper,
	NameAndIntroWrapper,
	NavMevuwrapper,
	NicknameWrapper,
	PostInner,
	PostWrapper,
	ProfileHeader,
	ProfileWrapper,
	UlListWrapper,
	UserInfoWrapper,
	AvatarWrapper,
	MobileHeader,
} from './style';
import Avatar from '../UI/Avatar';
import useWindowSize from '../../hooks/useWindowSize';

const UserProfileForm = ({ children, postType }) => {
	const { userInfo, me } = useSelector((state) => state.user);
	const [postMenu, setPostMenu] = useState(postType === 'mainPost' ? true : false);
	const [saveMenu, setSaveMenu] = useState(postType === 'saved' ? true : false);
	const [likeMenu, setLikeMenu] = useState(postType === 'liked' ? true : false);
	const { width: windowWidth } = useWindowSize();

	const onClickMenu = useCallback(
		(fstHan, twoHan, thrHan) => () => {
			fstHan(true);
			twoHan(false);
			thrHan(false);
		},
		[],
	);

	console.log(windowWidth);

	return (
		<>
			{userInfo && (
				<ProfileWrapper>
					<ProfileHeader>
						{windowWidth >= 480 ? (
							<>
								<AvatarWrapper>
									<Avatar size={150} borderGradient={true}>
										프로필이미지
									</Avatar>
								</AvatarWrapper>
								<UserInfoWrapper>
									<NicknameWrapper>
										<h2>{userInfo.nickname}</h2>
										{me?.id === userInfo.id ? (
											<ChangeProfile>프로필 변경</ChangeProfile>
										) : (
											<></>
										)}
									</NicknameWrapper>

									<UlListWrapper>
										{/* 나중에 Link 처리 */}
										<li>
											팔로잉 <span>{userInfo.Followings}</span>
										</li>
										<li>
											팔로워 <span>{userInfo.Followers}</span>
										</li>
										<li>
											게시글 <span>{userInfo.Posts}</span>
										</li>
									</UlListWrapper>

									<NameAndIntroWrapper>
										<h1>{userInfo.firstName + userInfo.lastName}</h1>
										{userInfo.introduction && (
											<span>{userInfo.introduction}</span>
										)}
									</NameAndIntroWrapper>
								</UserInfoWrapper>
							</>
						) : (
							<>
								<MobileHeader>
									<AvatarWrapper>
										<Avatar size={150} borderGradient={true}>
											프로필이미지
										</Avatar>
									</AvatarWrapper>
									<NicknameWrapper>
										<h2>{userInfo.nickname}</h2>
										{me?.id === userInfo.id ? (
											// 링크로 감싸기
											<ChangeProfile>프로필 변경</ChangeProfile>
										) : (
											<></>
										)}
									</NicknameWrapper>
								</MobileHeader>
								<NameAndIntroWrapper>
									<h1>{userInfo.firstName + userInfo.lastName}</h1>
									{userInfo.introduction && <span>{userInfo.introduction}</span>}
								</NameAndIntroWrapper>
							</>
						)}
					</ProfileHeader>
					<MainContentWrapper>
						<Divtag>
							<Link href={'/' + userInfo.nickname}>
								<NavMevuwrapper
									className={postMenu && 'click_menu'}
									onClick={onClickMenu(setPostMenu, setSaveMenu, setLikeMenu)}
								>
									<BsFilePost size={15} />
									게시글
								</NavMevuwrapper>
							</Link>
							{me && me.id === userInfo.id && (
								<Link href={'/' + userInfo.nickname + '/saved'}>
									<NavMevuwrapper
										className={saveMenu && 'click_menu'}
										onClick={onClickMenu(setSaveMenu, setPostMenu, setLikeMenu)}
									>
										<BsBookmark size={15} />
										저장됨
									</NavMevuwrapper>
								</Link>
							)}
							<Link href={'/' + userInfo.nickname + '/liked'}>
								<NavMevuwrapper
									className={likeMenu && 'click_menu'}
									onClick={onClickMenu(setLikeMenu, setPostMenu, setSaveMenu)}
								>
									<AiOutlineHeart size={15} />
									좋아요
								</NavMevuwrapper>
							</Link>
						</Divtag>
					</MainContentWrapper>
					<PostWrapper>
						<PostInner>{children}</PostInner>
					</PostWrapper>
				</ProfileWrapper>
			)}
		</>
	);
};

export default UserProfileForm;
