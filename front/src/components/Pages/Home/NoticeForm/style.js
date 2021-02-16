import styled from 'styled-components';
import Card from '../../../UI/Card';

export const NoticeFormWrapper = styled(Card)`
	width: 100%;
	min-height: 200px;
	display: flex;
	flex-direction: column;

	& > div {
		font-size: 1.5rem;
	}
	& > button {
		width: 70%;
		font-size: 1.5rem;
	}
`;

export const NoticeInner = styled.div`
	width: 100%;
	min-height: 200px;
	display: flex;
	flex-direction: column;
`;

export const NoticeHeader = styled.div`
	display: flex;
	width: 100%;
	/* flex-grow: 1; */
	justify-content: center;
	font-size: 1.2rem;
	border-bottom: 1px solid #e8e8e8;
	min-height: 32px;
	& > div {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		&:first-child {
			border-top-left-radius: 5px;
		}
		&:last-child {
			border-top-right-radius: 5px;
		}

		& > div {
			width: 100%;
			text-align: center;
		}
		&:hover,
		&:focus,
		&:active {
			color: #40a9ff;
			background-color: #f5f5f5;
		}

		&.click {
			color: #40a9ff;

			background-color: #f5f5f5;
		}

		&:not(:last-child) {
			& > div {
				border-right: 1px solid #e8e8e8;
			}
		}
	}
`;

export const NoticeMain = styled.div`
	width: 100%;
	display: flex;
`;

export const NoNotice = styled.div`
	width: 100%;
	min-height: 200px;
	display: flex;
	align-items: center;
	justify-content: center;
`;
export const NoticeListWrapper = styled.div`
	width: 100%;
	max-height: 250px;
	min-height: 200px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	overflow: auto;
	overscroll-behavior: contain;
	position: relative;
	::-webkit-scrollbar {
		width: 5.2px;
		position: absolute;
	} /* 스크롤 바 */
	::-webkit-scrollbar-track {
		background-color: #f5f5f5;
	} /* 스크롤 바 밑의 배경 */
	::-webkit-scrollbar-thumb {
		background: #e8e8e8;
	} /* 실질적 스크롤 바 */
	::-webkit-scrollbar-thumb:hover {
		background: #404040;
	} /* 실질적 스크롤 바 위에 마우스를 올려다 둘 때 */
	::-webkit-scrollbar-thumb:active {
		background: #808080;
	} /* 실질적 스크롤 바를 클릭할 때 */
`;

export const NoticeList = styled.li`
	width: 100%;
	padding: 1rem 1.1rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	line-height: 20px;
	font-size: 1.3rem;
	font-weight: 350;
	cursor: pointer;
	position: relative;

	&:hover {
		background-color: #f5f5f5;
	}
	& > div > span {
		font-weight: 450;
	}
`;

export const SignOutInner = styled.div`
	width: 100%;
	min-height: 200px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	& > div {
		font-size: 1.4rem;
		margin-bottom: 1.6rem;
	}
	& > button {
		width: 60%;
		min-width: 150px;
		font-size: 1.5rem;
	}
`;

export const TimeToday = styled.div`
	position: absolute;
	font-size: 1rem;
	opacity: 0.7;
	right: 11px;
	top: 0;

	@media (max-width: ${({ theme }) => theme.deviceSizes.TABLET}) {
		position: relative;
		right: 0;
	}
`;
