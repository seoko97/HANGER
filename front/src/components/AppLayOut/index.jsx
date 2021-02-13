import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { Layout, MainContents, Section } from './style';

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

export default React.memo(AppLayOut);
