import styled, { css } from 'styled-components';
import React from 'react';

const AvatarWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${({ size }) => (size ? `${size}px` : '32px')};
	height: ${({ size }) => (size ? `${size}px` : '32px')};
	margin-right: 1rem;
	border-radius: 50%;
	border: 1px solid transparent;

	${({ borderGradient }) =>
		!borderGradient
			? css`
					background: -webkit-linear-gradient(white, white),
						-webkit-linear-gradient(left, #13f1fc 0%, #0470dc 100%);
					background: -o-linear-gradient(white, white),
						-o-linear-gradient(left, #13f1fc 0%, #0470dc 100%);

					-moz-background-clip: padding-box, border-box;
					background-clip: padding-box, border-box;
					background-origin: border-box;
					-webkit-background-origin: border-box;
					background-size: 100% 100%;
					box-sizing: content-box;
					cursor: pointer;
			  `
			: css`
					border: 2px solid #e4e6eb;
			  `}

	& > span {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		border: ${({ borderGradient }) =>
			borderGradient ? '' : '1px solid #fff'};
		font-size: 1.3em;
		font-variant: tabular-nums;
		list-style: none;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ccc;

		border-radius: 50%;
		color: white;
		& > span {
			position: absolute;
			transform: scale(1) translateX(-50%);
			left: 50%;
			transform-origin: 0 center;
		}
	}
`;

const Avatar = ({ children, size, borderGradient }) => {
	return (
		<>
			<AvatarWrapper
				size={size}
				borderGradient={borderGradient}
				className="avatar"
			>
				<span>
					<span>{children}</span>
				</span>
			</AvatarWrapper>
		</>
	);
};
export default Avatar;
