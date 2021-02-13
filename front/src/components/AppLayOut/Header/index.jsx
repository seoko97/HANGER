import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { VscBookmark, VscSignOut } from 'react-icons/vsc';
import { AiOutlineSearch, AiOutlineLike, AiOutlineEdit } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import router from 'next/router';
import Loader from '../../UI/Loader';
import Avatar from '../../UI/Avatar';
import useInput from '../../../hooks/useInput';
import { SIGN_OUT_REQUEST } from '../../../reducers/user';
import {
	HeaderInner,
	HeaderPinWrapper,
	HeaderWrapper,
	HearderNav,
	ItemList,
	MenuWrapper,
	SignOutWrapper,
	NameWrapper,
	SignUpMenu,
	SearchFormWrapper,
	SearchForm,
	SearchListInner,
	NicknameWrapper,
	AvatarWrapper,
} from './style';
import SearchListComponent from './SearchListComponent';
import useComponentVisible from '../../../hooks/useComponentVisible';
import { LOAD_SEARCH_INFO_REQUEST, LOAD_SEARCH_TAG_INFO_REQUEST } from '../../../reducers/search';
import useWindowSize from '../../../hooks/useWindowSize';
import MobileHeaderForm from './MobileHeaderForm';

const Header = () => {
	const dispatch = useDispatch();
	const me = useSelector((state) => state.user.me);
	const { loadSearchInfoLoading } = useSelector((state) => state.search);

	const [searchText, texthandler, setText] = useInput('');
	const { width: windowWidth } = useWindowSize();
	const [size, setSize] = useState(0);

	const {
		ref: searchRef,
		isComponentVisible: isSearchComponentVisible,
		setIsComponentVisible: setIsSearchComponentVisible,
	} = useComponentVisible(false);

	const {
		ref: bannerRef,
		isComponentVisible: isBannerComponentVisible,
		setIsComponentVisible: setIsBannerComponentVisible,
	} = useComponentVisible(false);

	useEffect(() => {
		setSize(windowWidth);
	}, [windowWidth]);

	useEffect(() => {
		setIsSearchComponentVisible(false);
		setIsBannerComponentVisible(false);
		setText('');
	}, [me]);

	const onlogOut = useCallback(() => {
		dispatch({
			type: SIGN_OUT_REQUEST,
		});
		router.push('/');
	}, []);

	useEffect(() => {
		if (searchText[0] === '#') {
			if (searchText[1]) {
				const newStr = searchText.substr(1);
				return dispatch({
					type: LOAD_SEARCH_TAG_INFO_REQUEST,
					data: newStr,
				});
			}
			return;
		}
		if (searchText[0] !== '#' && searchText) {
			return dispatch({
				type: LOAD_SEARCH_INFO_REQUEST,
				data: searchText,
			});
		}
	}, [searchText]);

	return (
		<>
			<HeaderWrapper>
				<HeaderInner>
					<HeaderPinWrapper>
						<Link href="/">지석호(로고)</Link>
					</HeaderPinWrapper>
					<HearderNav>
						{me ? (
							<>
								{size >= 480 ? (
									<SearchFormWrapper>
										<SearchForm
											ref={searchRef}
											onClick={() => setIsSearchComponentVisible(true)}
										>
											<label>
												{!isSearchComponentVisible && (
													<AiOutlineSearch size={15} />
												)}
												<input
													type="search"
													placeholder="검색어를 입력하세요"
													value={searchText}
													onChange={texthandler}
												/>
												{searchText && loadSearchInfoLoading && (
													<Loader type="spin" color="#ccc" size={20} />
												)}
											</label>

											{isSearchComponentVisible &&
												searchText &&
												!loadSearchInfoLoading && (
													<SearchFormWrapper>
														<SearchListInner>
															<SearchListComponent
																isSearchComponentVisible={
																	isSearchComponentVisible
																}
																searchText={searchText}
															/>
														</SearchListInner>
													</SearchFormWrapper>
												)}
										</SearchForm>
									</SearchFormWrapper>
								) : (
									<MobileHeaderForm
										searchRef={searchRef}
										isSearchComponentVisible={isSearchComponentVisible}
										setIsSearchComponentVisible={setIsSearchComponentVisible}
									/>
								)}
								<SignUpMenu
									ref={bannerRef}
									onClick={() =>
										setIsBannerComponentVisible(!isBannerComponentVisible)
									}
									isBannerComponentVisible={isBannerComponentVisible}
								>
									<AvatarWrapper>
										<Avatar profileImg={me?.profileImg} />
									</AvatarWrapper>

									<NicknameWrapper>{me.nickname}</NicknameWrapper>
									{isBannerComponentVisible && (
										<MenuWrapper>
											<ItemList>
												<div>
													<Link href={'/' + me.nickname}>
														<div>
															<Avatar
																size={50}
																borderGradient={true}
																profileImg={me?.profileImg}
															/>

															<NameWrapper>
																<div>
																	<span>{me.nickname}</span>
																</div>
																<div>
																	<span>
																		{me.firstName + me.lastName}
																	</span>
																</div>
															</NameWrapper>
														</div>
													</Link>

													<hr />
													<Link href={`/${me.nickname}/saved`}>
														<div>
															<SignOutWrapper>
																<VscBookmark size={25} />
															</SignOutWrapper>
															<div>
																<span>저장됨</span>
															</div>
														</div>
													</Link>

													<Link href={`/${me.nickname}/liked`}>
														<div>
															<SignOutWrapper>
																<AiOutlineLike size={25} />
															</SignOutWrapper>
															<div>
																<span>좋아요</span>
															</div>
														</div>
													</Link>
													<Link href={`/${me.nickname}/edit`}>
														<div>
															<SignOutWrapper>
																<AiOutlineEdit size={25} />
															</SignOutWrapper>
															<div>
																<span>프로필 수정</span>
															</div>
														</div>
													</Link>

													<div onClick={onlogOut}>
														<SignOutWrapper>
															<VscSignOut size={25} />
														</SignOutWrapper>
														<div>
															<span>로그아웃</span>
														</div>
													</div>
												</div>
											</ItemList>
										</MenuWrapper>
									)}
								</SignUpMenu>
							</>
						) : (
							<ul>
								<li>
									<Link href="/signin">로그인</Link>
								</li>
								<li>
									<Link href="/signup">회원가입</Link>
								</li>
								<li>
									<div>사이트정보</div>
								</li>
							</ul>
						)}
					</HearderNav>
				</HeaderInner>
			</HeaderWrapper>
		</>
	);
};

export default React.memo(Header);
