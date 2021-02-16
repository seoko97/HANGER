import React from 'react';
import styled from 'styled-components';
import Avatar from '../../UI/Avatar';

const InfoPageWrapper = styled.div`
	width: 100%;
	font-size: 1.3rem;
	line-height: 20px;
	font-weight: 350;

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		padding: 0 1.5rem;
	}
`;

const PageHeader = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	& > div {
		& > div {
			margin-right: 0;
		}
	}
	margin-bottom: 13px;
`;

const PageMain = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 1.4rem;
	color: #003154;
	margin-bottom: 13px;

	a {
		color: #1890ff;
	}
`;

const MainContent = styled.div`
	width: 100%;
	text-align: center;
	font-size: 1.6rem;
	line-height: 30px;

	#warning {
		color: #ff7c7c;
	}
	#hanger {
		color: #1890ff;
	}

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		font-size: 1.3rem;
	}
`;

const Info = () => {
	return (
		<>
			<InfoPageWrapper>
				<PageHeader>
					<div>
						<Avatar size={160} profileImg={'/develop.jpeg'} develop="true" />
					</div>
				</PageHeader>
				<PageMain>
					<div>개발자: 지석호</div>
					<div>Mail: sukho10007@gmail.com</div>
					<div>Kakaotalk: sukho1007</div>
					<div>
						Github:{' '}
						<a href="https://github.com/seokho10007" color="#1890ff">
							https://github.com/seokho10007
						</a>
					</div>
				</PageMain>
				<MainContent>
					<span>소개</span>
					<br />
					본 페이지는 포트폴리오 용 페이지입니다. <br />
					가급적 타 사이트에서 <span id="warning"> 사용하지 않는 아이디와 비밀번호</span>
					를 사용해 주시기 바랍니다.
					<br />
					SNS <span id="hanger">HANGER</span> 는 간단한 회원가입을 통해 이용할 수
					있습니다. <br />
					자신의 일상을 친구에게 공유해보세요!
				</MainContent>
			</InfoPageWrapper>
		</>
	);
};

export default Info;
