import styled, { css } from 'styled-components';

export const SearchFormWrapper = styled.div`
	display: flex;
`;

export const IconWrapepr = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	margin-right: 1rem;
`;

export const SearchForm = styled.div`
	width: 100vw;
	background: #fff;
	position: absolute;
	left: 0;
	top: 70px;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-shadow: 0 4px 2px -2px rgb(0 0 0 / 10%);
	font-size: 1.4rem;

	& > span {
		margin-bottom: 1rem;
	}

	animation: fadein 0.4s;
	-moz-animation: fadein 0.4s; /* Firefox */
	-webkit-animation: fadein 0.4s; /* Safari and Chrome */
	-o-animation: fadein 0.4s; /* Opera */

	@keyframes fadein {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@-moz-keyframes fadein {
		/* Firefox */
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@-webkit-keyframes fadein {
		/* Safari and Chrome */
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@-o-keyframes fadein {
		/* Opera */
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	& > label {
		width: 90%;
		height: 35px;
		position: relative;
		padding: 1rem 0.8rem;
		background-color: #f5f5f5;
		display: flex;
		align-items: center;
		border-radius: 20px;
		margin-bottom: 1rem;

		& > svg {
			margin-right: 1rem;
		}
		& > input {
			display: flex;
			width: 100%;
			align-items: center;
			border: 0;
			font-size: 1.5rem;
			background-color: #f5f5f5;
			outline: none;
		}
		input::-ms-clear,
		input::-ms-reveal {
			display: none;
			width: 0;
			height: 0;
		}
		input::-webkit-search-decoration,
		input::-webkit-search-cancel-button,
		input::-webkit-search-results-button,
		input::-webkit-search-results-decoration {
			display: none;
		}
	}
	& > div {
		width: 100%;
	}
`;
