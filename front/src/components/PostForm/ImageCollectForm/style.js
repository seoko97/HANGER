import styled, { css } from 'styled-components';

export const ImagesBox = styled.div`
	border: 1px solid #ccc;
	box-sizing: border-box;
	border-radius: 6px;
	margin-bottom: 1.5rem;

	& > div {
		display: ${({ length }) => (length >= 2 ? 'inline-block' : 'flex')};
		background-color: #e4e6e9;
		box-sizing: border-box;
		border: 1px solid #fff;
		border-radius: 6px;

		& > div {
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
