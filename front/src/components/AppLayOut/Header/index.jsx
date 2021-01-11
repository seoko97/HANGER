import React, { Fragment, useCallback, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { VscBookmark, VscSignOut } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../../UI/Avatar';
import Card from '../../UI/Card';
import useInput from '../../../hooks/useClick';
import { SIGN_OUT_REQUEST } from '../../../reducers/user';

const HeaderWrapper = styled.header`
	width: 100%;
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	height: 70px;
	background-color: #ffffff;
	box-shadow: 2px 2px 5px #cccccc;
	z-index: 1;

	-ms-user-select: none;
	-moz-user-select: -moz-none;
	-khtml-user-select: none;
	-webkit-user-select: none;
	user-select: none;
`;
const HeaderInner = styled.div`
	margin: 0 auto;
	width: 60%;
	display: flex;
	height: 5em;

	@media (max-width: ${({ theme }) => theme.deviceSizes.TABLET}) {
		width: 80%;
	}

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		width: 100%;
		margin: 0;

		padding: 0 1rem;
	}
`;

const HeaderPinWrapper = styled.div`
	width: 30%;
	display: flex;
	align-items: center;
	font-weight: bold;
	color: #40a9ff;
	font-size: 1.6em;
	white-space: nowrap;
`;

const HearderNav = styled.nav`
	width: 70%;
	font-size: 1.2rem;
	display: flex;
	justify-content: flex-end;
	align-items: center;

	& > ul {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;

		& > li {
			margin-left: 1em;
		}
	}
	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
	}
`;

const SignUpMenu = styled.div`
	display: flex;
	cursor: pointer;
	border-radius: 7px;
	padding: 1rem;
	&:hover {
		background-color: #e4e6eb;
	}

	& > div {
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

const MenuWrapper = styled.div`
	position: relative;
`;
const ItemList = styled(Card)`
	width: 400px;
	position: absolute;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
	top: 55px;
	right: -10px;
	border-radius: 5px;
	z-index: 100;

	& > div {
		padding: 1rem;
		& > div {
			display: flex;
			align-items: center;
			border-radius: 8px;
			padding: 0.8rem;
			cursor: pointer;
			font-size: 1.5rem;

			&:hover,
			&:active {
				background-color: #e2e2e2;
			}
		}
		& > hr {
			margin: 1rem;
			background-color: #dadde1;
			border-width: 0;
			color: #dadde1;
			height: 1px;
		}
	}
	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		width: 95vw;
	}
`;

const NameWrapper = styled.div`
	font-size: 1.6rem;
	& > div {
		margin-top: 5px;
		margin-bottom: 5px;
		&:last-child {
			font-size: 1.4rem;
			color: #65676b;
		}
	}
`;

const SignOutWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 2rem;
	background-color: #e4e6eb;
	padding: 0.6rem;
	border-radius: 50%;
	& + div {
		font-weight: 600;
	}
`;

const Header = () => {
	const dispatch = useDispatch();
	const me = useSelector((state) => state.user.me);

	const [banner, bannerHandler] = useInput(false);

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
						<Link href="/">
							<a>지석호(로고)</a>
						</Link>
					</HeaderPinWrapper>
					<HearderNav>
						{me ? (
							<Fragment>
								<SignUpMenu onClick={bannerHandler}>
									<Avatar>{me.firstName}</Avatar>
									<div>{me.nickname}</div>
									{banner && (
										<MenuWrapper>
											<ItemList>
												<div>
													<div>
														<Avatar
															size={50}
															borderGradient={
																true
															}
														>
															{me.firstName}
														</Avatar>
														<NameWrapper>
															<div>
																<span>
																	{
																		me.nickname
																	}
																</span>
															</div>
															<div>
																<span>
																	{me.firstName +
																		me.lastName}
																</span>
															</div>
														</NameWrapper>
													</div>
													<hr />
													<div>검색창</div>
													<hr />
													<div>
														<SignOutWrapper>
															<VscBookmark
																size={25}
															/>
														</SignOutWrapper>
														<div>
															<span>저장됨</span>
														</div>
													</div>

													<div>
														<SignOutWrapper>
															<VscSignOut
																size={25}
															/>
														</SignOutWrapper>
														<div onClick={onlogOut}>
															<span>
																로그아웃
															</span>
														</div>
													</div>
												</div>
											</ItemList>
										</MenuWrapper>
									)}
								</SignUpMenu>
							</Fragment>
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
