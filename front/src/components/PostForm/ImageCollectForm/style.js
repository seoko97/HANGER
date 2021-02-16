import styled, { css } from 'styled-components';

export const ImagesBox = styled.div`
	border: 1px solid #ccc;
	box-sizing: border-box;
	background-color: #f5f5f5;
	margin-bottom: 1.5rem;
	overflow: auto;
	overscroll-behavior: contain;
	overflow-x: hidden;
	max-height: 40vh;
	border-collapse: collapse;

	::-webkit-scrollbar {
		width: 5.2px;
	}
	::-webkit-scrollbar-track {
		background-color: #f5f5f5;
	}
	::-webkit-scrollbar-thumb {
		background: #e8e8e8;
	}
	::-webkit-scrollbar-thumb:hover {
		background: #404040;
	}
	::-webkit-scrollbar-thumb:active {
		background: #808080;
	}

	& > div {
		display: ${({ length }) => (length >= 2 ? 'inline-block' : 'flex')};
		background-color: #fff;
		box-sizing: border-box;
		border: 1px solid #ccc;
		border-collapse: collapse;

		& > div {
			width: 100%;
			position: relative;
		}

		& > div > img {
			object-fit: scale-down;
		}

		${({ length }) =>
			length === 1 &&
			css`
				& > div > img {
					border-radius: 6px;
					width: 100%;
					height: 30vh;
				}
			`}

		${({ length }) =>
			length === 2 &&
			css`
				width: 50%;
				& > div > img {
					width: 100%;
					height: 20vh;
				}
			`}

		${({ length }) =>
			length >= 3 &&
			css`
				width: 50%;
				& :first-child {
					width: 100%;
				}
				& > div > img {
					width: 100%;
					height: 20vh;
				}
			`}
		${({ length }) =>
			length > 3 &&
			length % 2 === 0 &&
			css`
				& :last-child {
					width: 100%;
				}
			`}

		&> div > svg {
			position: absolute;
			top: 5px;
			right: 5px;
			background-color: #f2f3f5;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			font-size: 2rem;
			cursor: pointer;

			&:hover {
				background-color: gray;
			}
		}
	}
`;
