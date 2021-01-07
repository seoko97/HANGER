import styled from 'styled-components';

const Avatar = styled.div`
	padding-right: 1.6rem;
	& > span {
		box-sizing: border-box;
		font-size: 1.3em;
		font-variant: tabular-nums;
		list-style: none;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ccc;
		width: 32px;
		height: 32px;
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
export default Avatar;
