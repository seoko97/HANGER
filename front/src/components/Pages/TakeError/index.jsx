import React from 'react';
import Error from 'next/error';
import styled from 'styled-components';

export const ErrorWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: -50px;
	background-color: #fff;
	& > div {
		background-color: #ccc;
	}
`;

const TakeError = ({ statusCode }) => {
	return (
		<ErrorWrapper>
			<Error statusCode={statusCode} />
		</ErrorWrapper>
	);
};

export default TakeError;
