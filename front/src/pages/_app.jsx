import Head from 'next/head';
import React, { Fragment } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import wrapper from '../store/configureStore';
import withReduxSaga from 'next-redux-saga';
import AppLayOut from '../components/AppLayOut';
import theme from '../theme';

const GlobalStyle = createGlobalStyle`
	${reset}
	a,
	ul,
	li,
	button,
	form{
		 border: 0;
         text-decoration:none;
         color:inherit;
		 outline:none;
		resize: none;
		 list-style:none;
		 text-transform: none;
     }
	 
     *{
         box-sizing: border-box;
		 margin:0;
		 padding:0;
     }
     html,
	 body,
	 #__next{
		 margin:0;
		 padding:0;
		 width:100%;
		 height:100%;
         font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
         font-size: 10px;
		 background-color: #EFF2F5;

     }
	 input[type='date'], input[type='time'] {
    -webkit-appearance: none;
	}
`;

const SH_BLOG = ({ Component, pageProps }) => {
	return (
		<Fragment>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<Head>
					<title>SH BLOG</title>
				</Head>
				<AppLayOut>
					<Component {...pageProps} />
				</AppLayOut>
			</ThemeProvider>
		</Fragment>
	);
};

export default wrapper.withRedux(withReduxSaga(SH_BLOG));
