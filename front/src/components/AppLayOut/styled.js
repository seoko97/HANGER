import styled from 'styled-components';

export const Layout = styled.div`
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-height: 100%;
	/* min-height: 100vh; */
`;

export const Section = styled.section`
	width: 60%;
	display: flex;
	flex-grow: 1;

	margin: 1em auto;
	margin-top: 100px;

	flex: 1;

	@media (max-width: ${({ theme }) => theme.deviceSizes.TABLET}) {
		width: 90%;
	}

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		width: 100%;
		margin-top: 80px;
	}
`;

export const MainContents = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;
