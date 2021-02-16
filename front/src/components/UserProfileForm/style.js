import styled from 'styled-components';
import Avatar from '../UI/Avatar';

export const ProfileWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;
export const ProfileHeader = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	margin-bottom: 4.4rem;
	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		flex-direction: column;
		margin-bottom: 0;
	}
`;

export const MobileHeader = styled.div`
	width: 100%;
	display: flex;
	padding: 1.5rem;
	flex-direction: row;
`;

export const AvatarWrapper = styled.div`
	width: 30%;
	display: flex;
	justify-content: center;
	flex-shrink: 1;
	margin-right: 2rem;
	min-width: 150px;
	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		width: 77px;
		height: 77px;
		min-width: 77px;

		& > div {
			margin: 0;
			width: 77px;
			height: 77px;
			min-width: 77px;
		}
	}
`;

export const ProfileAvatar = styled(AvatarWrapper)`
	width: 100%;
`;

export const UserInfoWrapper = styled.div`
	width: 70%;
	flex-shrink: 1;
	display: flex;
	flex-direction: column;

	& > div,
	& > ul {
		font-size: 1.6rem;
		margin-bottom: 2rem;
	}
`;

export const NicknameWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	white-space: 'pre-wrap';

	& > h2 {
		font-size: 28px;
		font-weight: 300;
	}

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		width: 100%;
		display: flex;

		flex-direction: column;
		align-items: flex-start;
		flex: 1 1 auto;
		& > h2 {
			margin-bottom: 1.2rem;
		}
		& > div {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 30px;
			margin: 0;
		}
	}
`;

export const ChangeProfile = styled.div`
	font-size: 1.4rem;
	padding: 0.5rem 0.9rem;
	border: 1px solid #dbdbdb;
	border-radius: 3px;
	margin-left: 2rem;
	transition-duration: 0.3s;
	cursor: pointer;
	&:hover {
		background-color: #e8e8e8;
		color: #40a9ff;
	}
`;

export const UlListWrapper = styled.ul`
	display: flex;

	& li:not(:last-child) {
		margin-right: 2rem;
		cursor: pointer;
	}

	& li > span {
		font-weight: 600;
	}

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		border-top: 1px solid #ccc;
		display: flex;
		font-size: 1.3rem;

		& > li {
			display: flex;
			margin: 0;
			flex: 1 1 auto;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 52px;
			line-height: 20px;
		}
		& li:not(:last-child) {
			margin-right: 0;
		}
	}
`;

export const NameAndIntroWrapper = styled.div`
	width: 100%;
	line-height: 18px;
	& > h1 {
		line-height: 24px;
		font-weight: 600;
	}
	& > div {
		white-space: pre-wrap;
	}
	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		padding: 1.5rem;
		font-size: 1.4rem;
	}
`;

export const MainContentWrapper = styled.div`
	border-top: 1px solid #dbdbdb;
`;

export const Divtag = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	font-weight: 600;
	text-align: center;
	& > div:first-child {
		margin-left: 6rem;
	}

	& > div {
		margin-right: 6rem;
	}

	.click_menu {
		color: #000;
		border-top: 1px solid #000;
	}

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		& > div {
			margin: 0;
			&:first-child {
				margin-left: 0;
			}
			display: flex;
			flex: 1 1 auto;
		}
	}
`;

export const NavMevuwrapper = styled.div`
	margin-top: -1px;
	display: flex;
	color: #8e8e8e;
	height: 52px;
	align-items: center;
	justify-content: center;
	font-size: 1.2rem;
	cursor: pointer;

	& > svg {
		margin-right: 0.5rem;
	}
`;

export const PostWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;

export const PostInner = styled.div`
	width: 100%;
	max-width: 614px;
	position: relative;

	@media (max-width: ${({ theme }) => theme.deviceSizes.PC}) {
		width: 65%;
	}

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		width: 100%;
		min-width: 100%;
		margin-right: 0;
	}
`;
