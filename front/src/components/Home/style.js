import styled from 'styled-components';

export const LeftForm = styled.div`
	width: 100%;
	max-width: 614px;
	position: relative;
	margin-right: 3rem;

	@media (max-width: ${({ theme }) => theme.deviceSizes.PC}) {
		width: 65%;
	}

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		width: 100%;
		min-width: 100%;
		margin-right: 0;
	}
`;

export const RightForm = styled.div`
	padding: 0;
	width: 100%;
	max-width: 293px;
	position: fixed;
	height: 100vh;

	@media (max-width: ${({ theme }) => theme.deviceSizes.PC}) {
		max-width: 28.5%;
	}

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		display: none;
	}
`;

export const HomeWrapper = styled.div`
	display: flex;
	width: 100%;
	margin: 0 auto;
`;
