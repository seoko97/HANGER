import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
	display: flex;
	justify-content: center;
	align-items: center;
	bottom: 0;
	width: 100%;
	background-color: #272343;
	font-size: 1.3em;
	padding: 1rem 0;
	position: relative;
	& > div {
		width: 70%;
		color: #f0f2f5;
		& > div:first-child {
			& > span:nth-child(-n + 2)::after {
				content: '|';
				color: #cccccc;
				margin: 0 1em;
			}
			& > span:nth-child(n + 2) {
				color: #cccccc;
			}
		}
	}
`;

const Footer = () => (
	<FooterWrapper>
		<div>
			<div>
				<span>지석호</span>
				<span>mail: sukho1007@naver.com</span>
				<span>github: seokho10007</span>
			</div>
			<div>CopyRight 2020. 지석호. All rights reserved.</div>
		</div>
	</FooterWrapper>
);

export default Footer;
