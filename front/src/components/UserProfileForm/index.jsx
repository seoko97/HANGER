import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsFilePost, BsBookmark } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import { RiUserFollowLine } from 'react-icons/ri';
import { Helmet } from 'react-helmet';
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
import Router from 'next/router';
import {
	FOLLOW_REQUEST,
	UNFOLLOW_REQUEST,
	USER_FOLLOWERS_REQUEST,
	USER_FOLLOWINGS_REQUEST,
} from '../../reducers/user';
import FollowModal from './FollowModal';
import {
	LOAD_USER_LIKE_POSTS_REQUEST,
	LOAD_USER_POSTS_REQUEST,
	LOAD_USER_SAVE_POSTS_REQUEST,
} from '../../reducers/post';
import { LoadInner } from '../AppLayOut/Header/MobileHeaderForm';
import Loader from '../UI/Loader';

const UserProfileForm = ({ children, postType }) => {
	const { userInfo, me, loadUserInfoError } = useSelector((state) => state.user);

	const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
	const [postMenu, setPostMenu] = useState(postType === 'mainPost' ? true : false);
	const [saveMenu, setSaveMenu] = useState(postType === 'saved' ? true : false);
	const [likeMenu, setLikeMenu] = useState(postType === 'liked' ? true : false);

	const [modalVisible, setModalVisible] = useState(false);
	const [liId, setLiId] = useState('');
	const { width: windowWidth } = useWindowSize();
	const [size, setSize] = useState(false);
	const dispatch = useDispatch();

	const isFollowing = me?.Followings.find((v) => v.id === userInfo?.id);
	useEffect(() => {
		setSize(windowWidth);
	}, [windowWidth]);

	useEffect(() => {
		setModalVisible(false);
	}, [userInfo]);

	const onClickMenu = useCallback(
		(fstHan, twoHan, thrHan) => () => {
			fstHan(true);
			twoHan(false);
			thrHan(false);
		},
		[],
	);

	useEffect(() => {
		loadUserInfoError && Router.replace('/');
	}, [me, userInfo]);

	const onClickFollowBtn = useCallback(() => {
		if (isFollowing) {
			dispatch({
				type: UNFOLLOW_REQUEST,
				data: userInfo?.id,
			});
		} else {
			dispatch({
				type: FOLLOW_REQUEST,
				data: userInfo?.id,
			});
		}
	}, [isFollowing, userInfo]);

	const openModal = useCallback(
		(e) => {
			setLiId(e.target.id);
			setModalVisible(true);

			if (e.target.id === 'followers') {
				dispatch({
					type: USER_FOLLOWERS_REQUEST,
					data: userInfo?.id,
				});
			} else if (e.target.id === 'followings') {
				dispatch({
					type: USER_FOLLOWINGS_REQUEST,
					data: userInfo?.id,
				});
			}
		},
		[modalVisible, userInfo],
	);

	useEffect(() => {
		function onScroll() {
			if (
				window?.pageYOffset + document.documentElement.clientHeight >
				document.documentElement.scrollHeight - 30
			) {
				if (Router.asPath === `/${userInfo?.nickname}`) {
					if (hasMorePosts && !loadPostsLoading) {
						const lastId = mainPosts[mainPosts.length - 1]?.id;
						lastId;
						dispatch({
							type: LOAD_USER_POSTS_REQUEST,
							data: { nickname: userInfo.nickname, lastId },
						});
					}
				} else if (Router.asPath === `/${userInfo?.nickname}/liked`) {
					if (hasMorePosts && !loadPostsLoading) {
						const lastId = mainPosts[mainPosts.length - 1]?.id;
						dispatch({
							type: LOAD_USER_LIKE_POSTS_REQUEST,
							data: { nickname: userInfo.nickname, lastId },
						});
					}
				} else if (Router.asPath === `/${userInfo?.nickname}/saved`) {
					if (hasMorePosts && !loadPostsLoading) {
						const lastId = mainPosts[mainPosts.length - 1]?.id;
						dispatch({
							type: LOAD_USER_SAVE_POSTS_REQUEST,
							data: { nickname: userInfo.nickname, lastId },
						});
					}
				}
			}
		}
		window?.addEventListener('scroll', onScroll);
		return () => {
			window?.removeEventListener('scroll', onScroll);
		};
	}, [hasMorePosts, loadPostsLoading, mainPosts, userInfo]);

	return (
		<>
			<Helmet
				title={userInfo?.nickname ? `${userInfo?.nickname}님의 프로필` : 'HANGER'}
				description={userInfo?.introduction}
				meta={[
					{
						name: 'description',
						content: userInfo?.content,
					},
					{
						property: 'og:title',
						content: `${userInfo?.nickname}님의 프로필`,
					},
					{
						property: 'og:description',
						content: userInfo?.content,
					},
					{
						property: 'og:image',
						content: userInfo?.profileImg ? `${userInfo?.profileImg}` : '/logo.png',
					},
					{
						property: 'og:url',
						content: `https://hangerncloset.com/${userInfo?.nickname}`,
					},
				]}
			/>
			{userInfo && (
				<ProfileWrapper>
					<ProfileHeader>
						{size >= 480
							? size && (
									<>
										<AvatarWrapper>
											<Avatar
												size={150}
												borderGradient={true}
												profileImg={userInfo?.profileImg}
											>
												프로필이미지
											</Avatar>
										</AvatarWrapper>
										<UserInfoWrapper>
											<NicknameWrapper>
												<h2>{userInfo?.nickname}</h2>
												{me?.id === userInfo?.id ? (
													<Link href={`/${userInfo?.nickname}/edit`}>
														<ChangeProfile>프로필 변경</ChangeProfile>
													</Link>
												) : (
													me && (
														<>
															<ChangeProfile
																onClick={onClickFollowBtn}
															>
																{isFollowing ? (
																	<RiUserFollowLine />
																) : (
																	'팔로우'
																)}
															</ChangeProfile>
														</>
													)
												)}
											</NicknameWrapper>

											<UlListWrapper>
												{/* 나중에 Link 처리 */}
												<li onClick={openModal} id="followings">
													팔로우{' '}
													<span>
														{userInfo?.id !== me?.id
															? userInfo?.Followings
															: me?.Followings.length}
													</span>
												</li>
												<li onClick={openModal} id="followers">
													팔로워{' '}
													<span>
														{userInfo?.id !== me?.id
															? userInfo?.Followers
															: me?.Followers.length}
													</span>
												</li>
												<li>
													게시글 <span>{userInfo?.Posts}</span>
												</li>
											</UlListWrapper>

											<NameAndIntroWrapper>
												<h1>{userInfo?.firstName + userInfo?.lastName}</h1>
												{userInfo?.introduction && (
													<div>{userInfo?.introduction} </div>
												)}
											</NameAndIntroWrapper>
										</UserInfoWrapper>
									</>
							  )
							: size && (
									<>
										<MobileHeader>
											<AvatarWrapper>
												<Avatar
													size={150}
													borderGradient={true}
													profileImg={userInfo?.profileImg}
												>
													프로필이미지
												</Avatar>
											</AvatarWrapper>
											<NicknameWrapper>
												<h2>{userInfo?.nickname}</h2>
												{me?.id === userInfo?.id ? (
													// 링크로 감싸기
													<Link href={`/${userInfo?.nickname}/edit`}>
														<ChangeProfile>프로필 변경</ChangeProfile>
													</Link>
												) : (
													me && (
														<>
															<ChangeProfile
																onClick={onClickFollowBtn}
															>
																{isFollowing ? (
																	<RiUserFollowLine />
																) : (
																	'팔로우'
																)}
															</ChangeProfile>
														</>
													)
												)}
											</NicknameWrapper>
										</MobileHeader>
										<NameAndIntroWrapper>
											<h1>{userInfo?.firstName + userInfo?.lastName}</h1>
											{userInfo?.introduction && (
												<div>{userInfo?.introduction}</div>
											)}
										</NameAndIntroWrapper>
										<UlListWrapper>
											{/* 나중에 Link 처리 */}
											<li onClick={openModal} id="followings">
												팔로우
												<span>
													{userInfo?.id !== me?.id
														? userInfo?.Followings
														: me?.Followings.length}
												</span>
											</li>
											<li onClick={openModal} id="followers">
												팔로워{' '}
												<span>
													{userInfo?.id !== me?.id
														? userInfo?.Followers
														: me?.Followers.length}
												</span>
											</li>
											<li>
												게시글 <span>{userInfo?.Posts}</span>
											</li>
										</UlListWrapper>
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
						<PostInner>
							{children}
							{loadPostsLoading && (
								<LoadInner>
									<Loader type="spin" color="#ccc" size={30} />
								</LoadInner>
							)}
						</PostInner>
					</PostWrapper>

					<div>
						{modalVisible && (
							<FollowModal
								title={liId === 'followers' ? '팔로워 목록' : '팔로잉 목록'}
								modalVisible={modalVisible}
								setModalVisible={setModalVisible}
								tagId={liId}
							/>
						)}
					</div>
				</ProfileWrapper>
			)}
		</>
	);
};

export default React.memo(UserProfileForm);
