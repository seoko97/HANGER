import styled from 'styled-components';
import Card from '../UI/Card';

export const PostFormWrapper = styled(Card)`
	width: 90%;
	margin-bottom: 2em;
	display: flex;
	align-items: center;
	padding: 1.5em 2em;
	justify-content: center;

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		width: 100%;
		margin-bottom: 1em;
	}
`;

export const PostFormInner = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	& > div:last-child {
		width: 100%;
		background-color: #f0f2f5;
		border-radius: 2rem;
		padding: 1em;
		font-size: 1.6rem;
		color: #65676b;
		cursor: pointer;

		&:hover {
			background-color: #e4e6e9;
		}

		@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
			width: 100%;
			font-size: 1.3em;
		}
	}
`;

export const ImageUpLoadWrapper = styled.button`
	margin-bottom: 1rem;
`;

export const AvataWrapper = styled.div`
	display: flex;
	align-items: center;
	margin: 1rem 0;
	font-weight: 600;

	& > span {
		font-size: 2rem;
	}
`;

export const TextBox = styled.div`
	width: 100%;
	margin-bottom: 2em;

	& textarea {
		min-height: 300px;
		border: 0;
		width: 100%;
		height: 100%;
		font-size: 2rem;
		resize: none;

		::placeholder {
			color: #cccccc;
		}
		:focus {
			outline: none;
		}
	}

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		& textarea {
			font-size: 1.6em;
		}
	}
`;
