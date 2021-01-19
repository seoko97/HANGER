import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { VscBookmark, VscSignOut } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../../UI/Avatar';
import useInput from '../../../hooks/useClick';
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
} from './style';

const Header = () => {
	const dispatch = useDispatch();
	const me = useSelector((state) => state.user.me);

	const [banner, bannerHandler, setBanner] = useInput(false);

	const onlogOut = useCallback(() => {
		dispatch({
			type: SIGN_OUT_REQUEST,
		});
	}, []);

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
								<SignUpMenu onClick={bannerHandler}>
									<Avatar />

									<div>{me.nickname}</div>
									{banner && (
										<MenuWrapper>
											<ItemList>
												<div>
													<div>
														<Avatar size={50} borderGradient={true} />

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
													<hr />
													<div>검색창</div>
													<hr />
													<div>
														<SignOutWrapper>
															<VscBookmark size={25} />
														</SignOutWrapper>
														<div>
															<span>저장됨</span>
														</div>
													</div>

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

export default Header;
