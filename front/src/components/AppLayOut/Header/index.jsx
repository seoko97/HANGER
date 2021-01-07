import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const HeaderWrapper = styled.header`
	width: 100%;
	background-color: #ffffff;
	box-shadow: 2px 2px 5px #cccccc;
	align-items: center;
	justify-content: center;
	z-index: 1;

	& > div {
		margin: 0 auto;
		width: 60%;
		display: flex;
		height: 5em;
	}

	@media (max-width: ${({ theme }) => theme.deviceSizes.TABLET}) {
		& > div {
			width: 80%;
		}
	}

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		& > div {
			width: 90%;
		}
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
	& > ul {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;

		& > li {
			margin-left: 1em;
		}
	}
`;

const Header = () => {
	return (
		<HeaderWrapper>
			<div>
				<HeaderPinWrapper>
					<Link href="/">
						<a>지석호(로고)</a>
					</Link>
				</HeaderPinWrapper>
				<HearderNav>
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
				</HearderNav>
			</div>
		</HeaderWrapper>
	);
};

export default Header;
