import styled from 'styled-components';

export const LeftForm = styled.div`
	width: 60%;
	min-width: 60%;
	margin-right: 8rem;

	@media (max-width: ${({ theme }) => theme.deviceSizes.TABLET}) {
		margin-right: 4rem;
	}

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		width: 100%;
		min-width: 100%;
		margin-right: 0;
	}
`;

export const RightForm = styled.aside`
	width: 40%;
	min-width: 200px;
	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		display: none;
	}
`;
