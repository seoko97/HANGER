import React from 'react';
import styled, { css } from 'styled-components';

export const ButtonStyle = styled.button`
	background-color: #1890ff;
	border-color: #1890ff;
	box-sizing: border-box;
	text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
	box-shadow: 0 -2px 0 rgba(0, 0, 0, 0.045);
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1.5rem;
	border-radius: 0.4rem;
	font-size: 1.6em;
	color: #fff;
	transition-property: background-color;
	transition-duration: 0.5s;
	&:hover,
	&:focus {
		color: #fff;
		background-color: #40a9ff;
		border-color: #40a9ff;
	}
`;

const Button = ({ children, defaultStyle }) => {
	return (
		<>
			{defaultStyle ? (
				<button>{children}</button>
			) : (
				<ButtonStyle>{children}</ButtonStyle>
			)}
		</>
	);
};

export default Button;
