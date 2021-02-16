import styled, { css } from 'styled-components';
import Card from '../../UI/Card';

export const HeaderWrapper = styled.header`
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
export const HeaderInner = styled.div`
	margin: 0 auto;
	width: 90%;
	max-width: 935px;

	display: flex;
	height: 5em;

	@media (max-width: ${({ theme }) => theme.deviceSizes.TABLET}) {
		width: 90%;
	}

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		width: 100%;
		margin: 0;

		padding: 0 1rem;
	}
`;

export const HeaderPinWrapper = styled.div`
	width: 30%;
	display: flex;
	align-items: center;
	font-weight: bold;
	color: #40a9ff;
	font-size: 1.6em;
	white-space: nowrap;
	& > img {
		cursor: pointer;
		height: 20px;
	}
`;

export const HearderNav = styled.nav`
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
`;

export const SignUpMenu = styled.div`
	display: flex;
	cursor: pointer;
	justify-content: center;
	align-items: center;
	border-radius: 7px;
	padding: 0.6rem 0.5rem;
	&:hover {
		background-color: #e4e6eb;
		transition-duration: 0.5s;
	}

	${({ isBannerComponentVisible }) =>
		isBannerComponentVisible &&
		css`
			background-color: #e4e6eb;
			transition-duration: 0.5s;
		`}
`;

export const AvatarWrapper = styled.div`
	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		& > div {
			margin-right: 0;
		}
	}
`;

export const NicknameWrapper = styled.div`
	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		display: none;
	}
`;

export const MenuWrapper = styled.div`
	position: relative;

	animation: fadein 0.4s;
	-moz-animation: fadein 0.4s; /* Firefox */
	-webkit-animation: fadein 0.4s; /* Safari and Chrome */
	-o-animation: fadein 0.4s; /* Opera */

	@keyframes fadein {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@-moz-keyframes fadein {
		/* Firefox */
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@-webkit-keyframes fadein {
		/* Safari and Chrome */
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@-o-keyframes fadein {
		/* Opera */
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`;
export const ItemList = styled(Card)`
	width: 300px;
	font-size: 1.4rem;
	position: absolute;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
	top: 37px;
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
			font-weight: 300;

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
		width: 100vw;
		box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.1);
		top: 35px;
		border-radius: 0;
		right: -15px;
	}
`;

export const NameWrapper = styled.div`
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

export const SignOutWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.6rem;
	cursor: pointer;

	& + div {
		font-weight: 400;
		font-size: 1.3rem;
		margin-left: 1rem;
	}
	&:hover {
		background-color: #e8e8e8;
		color: #40a9ff;
	}
`;

export const SearchFormWrapper = styled.div`
	display: flex;
	position: relative;
`;

export const SearchForm = styled.div`
	margin-right: 2rem;

	& > label {
		position: relative;
		min-width: 223px;
		min-height: 40px;
		padding: 1rem 0.8rem;
		background-color: #f5f5f5;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20px;

		& > svg {
			margin-right: 1rem;
		}
		& > input {
			display: flex;
			align-items: center;
			border: 0;
			font-size: 1.5rem;
			background-color: #f5f5f5;
			outline: none;
		}
		input::-ms-clear,
		input::-ms-reveal {
			display: none;
			width: 0;
			height: 0;
		}
		input::-webkit-search-decoration,
		input::-webkit-search-cancel-button,
		input::-webkit-search-results-button,
		input::-webkit-search-results-decoration {
			display: none;
		}
	}
`;

export const SearchListInner = styled(Card)`
	min-width: 300px;
	max-height: 250px;
	position: absolute;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.2);
	border: 0;
	display: flex;
	flex-direction: column;
	font-size: 1.4rem;

	top: 10px;
	left: -35px;
`;
