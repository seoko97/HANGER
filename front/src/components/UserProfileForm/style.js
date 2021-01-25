import styled from 'styled-components';

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
`;

export const AvatarWrapper = styled.div`
	width: 30%;
	display: flex;
	justify-content: center;
	flex-shrink: 1;
	margin-right: 2rem;
	& > div {
	}
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

	& > h2 {
		font-size: 28px;
		font-weight: 300;
	}
`;

export const ChangeProfile = styled.div`
	font-size: 1.4rem;
	padding: 0.5rem 0.9rem;
	border: 1px solid #dbdbdb;
	border-radius: 3px;
	margin-left: 2rem;
	cursor: pointer;
`;

export const UlListWrapper = styled.ul`
	display: flex;

	& li:not(:last-child) {
		margin-right: 2rem;
	}

	& li > span {
		font-weight: 600;
	}
`;

export const NameAndIntroWrapper = styled.div`
	width: 100%;
	line-height: 18px;
	& > h1 {
		line-height: 24px;
		font-weight: 600;
	}
	& > span {
		white-space: wrap;
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