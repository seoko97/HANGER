import styled from 'styled-components';
import Card from '../UI/Card';

export const PostCardWrapper = styled(Card)`
	width: 90%;

	& :not(:last-child) {
		margin-bottom: 2em;
	}
	& > ul {
		border-radius: 5px;
	}

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		width: 100%;
		& :not(:last-child) {
			margin-bottom: 1em;
		}
	}
`;

export const PostCardHead = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	border-bottom: 1px solid #e8e8e8;
	padding: 1em 2.4em;

	& > button {
		border: 1px solid #ccc;
		border-radius: 3px;
		height: 32px;
		padding: 0 1em;
		background-color: white;
		font-size: 1.4rem;
		color: #808080;
		&:focus,
		&:hover {
			color: #40a9ff;
			border-color: #40a9ff;
		}
	}
`;

export const PostCardBody = styled.div`
	padding: 2rem;
`;

export const BodyMeta = styled.div`
	display: flex;
`;

export const MetaDetail = styled.div`
	width: 100%;
	& > div:not(:last-child) {
		margin-bottom: 8px;
	}
`;
export const MetaDetailTitle = styled.div`
	overflow: hidden;
	font-weight: 500;
	font-size: 1.6rem;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

export const MetaDetailDescription = styled.div`
	font-weight: normal;
	box-sizing: border-box;
	font-size: 1.4rem;
	line-height: 1.3em;
`;

export const PostCardAction = styled.ul`
	display: flex;
	font-size: 1.6em;
	color: #898989;
	& > li {
		width: 25%;
		text-align: center;
		margin: 1.2rem 0;
		&:hover,
		&:focus {
			color: #40a9ff;
		}
	}
`;

export const CommentWrapper = styled.div`
	width: 100%;
	display: flex;
	border-top: 1px solid #e4e6eb;
	flex-direction: column;
	& > div {
		width: 100%;
		display: flex;
	}
`;

export const AddCommentFormWrapper = styled.form`
	width: 100%;
	display: flex;
	align-items: center;
	padding: 1rem 2rem;

	& > textarea {
		font-size: 1.4rem;
		height: auto;
		border: none;
		resize: none;
		overflow: visible;
		height: 18px;
		outline: none;
		flex-grow: 1;
	}
	& > button {
		font-size: 1.4rem;
		border: 0;
		font-weight: 600;
		box-shadow: 0;
		color: #0095f6;
		display: flex;
		position: relative;
		background-color: rgba(0, 0, 0, 0);
		cursor: pointer;
		&:hover {
			color: #47b3f9;
		}
	}
`;

export const CommentsList = styled.div`
	flex: 1 1 auto;
	padding: 1rem 2rem;
	font-size: 1.4rem;

	& > div:first-child {
		font-size: 1.3rem;
		font-weight: 300;
	}

	& > div {
		display: block;
		margin-bottom: 1.2rem;

		& > span {
			display: inline;
			position: relative;
			font-weight: 300;
			line-height: 1.3em;
		}

		& > span:first-child {
			margin-right: 0.6rem;
			font-weight: 600;
			cursor: pointer;
		}
	}
`;
