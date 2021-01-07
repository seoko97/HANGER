import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
	background-color: white;
	border: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
	border-radius: 5px;

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		width: 100%;
		border-radius: 0;
		border: 0;
	}
`;

export default Card;
