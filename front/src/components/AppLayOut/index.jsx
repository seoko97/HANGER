import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';

const Layout = styled.div`
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-height: 100vh;
`;

const Section = styled.section`
	width: 50%;
	min-width: 600px;
	min-height: 100%;
	display: flex;
	flex-grow: 1;
	justify-content: center;
	margin: 1em auto;
	margin-top: 80px;

	flex: 1;

	@media (max-width: ${({ theme }) => theme.deviceSizes.TABLET}) {
		width: 80%;
		min-width: 0;
	}

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		width: 100%;
	}
`;

const MainContents = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	justify-content: center;
	align-items: center;
`;

const AppLayOut = ({ children }) => {
	return (
		<Layout>
			<Header />
			<Section>
				<MainContents>{children}</MainContents>
			</Section>
			<Footer />
		</Layout>
	);
};

export default AppLayOut;
