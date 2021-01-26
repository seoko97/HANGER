import styled from 'styled-components';
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
	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
	}
`;

export const SignUpMenu = styled.div`
	display: flex;
	cursor: pointer;
	border-radius: 7px;
	&:hover {
		background-color: #e4e6eb;
		transition-duration: 0.5s;
	}

	& > div {
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

export const MenuWrapper = styled.div`
	position: relative;
`;
export const ItemList = styled(Card)`
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
		width: 100vw;
		box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.1);
		top: 52px;
		border-radius: 0;
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
	margin-right: 2rem;
	background-color: #e4e6eb;
	padding: 0.6rem;
	border-radius: 50%;
	& + div {
		font-weight: 600;
	}
`;
