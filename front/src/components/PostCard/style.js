import styled from 'styled-components';
import Card from '../UI/Card';

export const PostCardWrapper = styled(Card)`
	width: 100%;

	& :not(:last-child) {
		margin-bottom: 2em;
	}
	& > ul {
		border-radius: 5px;
	}

	@media (max-width: ${({ theme }) => theme.deviceSizes.TABLET}) {
		min-width: 0;
	}

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		min-width: 0;

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
	padding: 1em 2em;
	min-height: 53px;

	& > button {
		cursor: pointer;
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
	padding-bottom: 1rem;
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
	& > span {
		cursor: pointer;
	}
`;

export const MetaDetailDescription = styled.div`
	font-weight: normal;
	box-sizing: border-box;
	font-size: 1.4rem;
	line-height: 1.3em;
	white-space: pre-wrap;
	word-break: break-all;
	& > a {
		color: #40a9ff;
	}
`;

export const PostCardAction = styled.ul`
	display: flex;
	font-size: 1.6em;
	color: #898989;
	& > li {
		position: relative;
		width: 25%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 1.2rem 0;
		&:hover,
		&:focus {
			color: #40a9ff;
		}
		& > span {
			font-size: 1.2rem;
			margin-left: 1rem;
		}
	}
`;

export const Balloon = styled.div`
	cursor: pointer;
	position: absolute;
	color: #000;
	font-size: 1.2rem;
	padding: 1rem;
	top: -40px;
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	border-radius: 5px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1), 0 8px 5px rgba(0, 0, 0, 0.1);
	&:hover {
		color: #40a9ff;
	}

	&:after {
		border-top: 8px solid #fff;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-bottom: 0 solid transparent;
		content: '';
		position: absolute;
		left: 12px;
		top: 30px;
		padding: 0;
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
		border: none;
		resize: none;
		overflow: visible;
		outline: none;
		flex-grow: 1;
		max-height: 85px;
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

	& > div:nth-child(2) {
		margin-top: 1rem;
	}
	& > div:not(:first-child) {
		margin-bottom: 0.4rem;
	}

	& > div {
		display: block;

		& > span,
		& > div {
			white-space: pre-wrap;
			word-break: break-all;
			display: inline;
			position: relative;
			font-weight: 300;
			line-height: 1.3em;
			& > a {
				color: #40a9ff;
			}
		}

		& > span:first-child {
			margin-right: 0.6rem;
			font-weight: 500;
			cursor: pointer;
		}
	}
`;

export const TimeWrapper = styled.div`
	color: #ccc;
	margin-top: 1rem;
`;
