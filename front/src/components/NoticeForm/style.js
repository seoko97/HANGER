import styled from 'styled-components';
import Card from '../UI/Card';

export const NoticeFormWrapper = styled(Card)`
	width: 100%;
	min-height: 200px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	& > div {
		font-size: 1.5rem;
		margin-bottom: 3rem;
	}
	& > button {
		width: 70%;
		font-size: 1.5rem;
	}
`;
