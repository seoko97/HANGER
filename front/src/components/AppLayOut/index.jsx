import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import { Layout, MainContents, Section } from './styled';

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
