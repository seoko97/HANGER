import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const LoaderWrappers = styled.div`
	position: absolute;
	right: 10px;
`;

const Loader = ({ type, color, size }) => {
	return (
		<>
			<LoaderWrappers>
				<ReactLoading type={type} color={color} height={size} width={size} />
			</LoaderWrappers>
		</>
	);
};

export default Loader;
