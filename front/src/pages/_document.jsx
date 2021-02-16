import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { Helmet } from 'react-helmet';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
				});
			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				helmet: Helmet.renderStatic(),
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			};
		} catch (error) {
			console.error(error);
		} finally {
			sheet.seal();
		}
	}

	render() {
		const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
		const htmlAttrs = htmlAttributes.toComponent();
		const bodyAttrs = bodyAttributes.toComponent();

		return (
			<Html {...htmlAttrs} lang="ko">
				<Head>{Object.values(helmet).map((el) => el.toComponent())}</Head>
				<body {...bodyAttrs}>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
export default MyDocument;
