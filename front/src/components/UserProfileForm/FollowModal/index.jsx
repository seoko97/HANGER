import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Avatar from '../../UI/Avatar';
import Modal from '../../UI/Modal';

const FollowModalInner = styled.div`
	min-height: 30vh;
`;

const FollowerList = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1 1;
	cursor: pointer;

	&:hover {
		background-color: #f5f5f5;
	}
`;

const FollowUser = styled.li`
	display: flex;
	padding: 8px 16px;
	flex-direction: row;

	@media (max-width: ${({ theme }) => theme.deviceSizes.MOBILE}) {
		padding: 10px 0;
	}
`;

const TextWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex: 1 1 auto;
	min-width: 70px;
	font-size: 1.4rem;
	text-transform: none;
	& > div:first-child {
		margin-bottom: 1rem;
		font-weight: 530;
		& > span:hover {
			cursor: pointer;
			text-decoration: underline;
		}
	}
	& > div:last-child {
		font-weight: 400;
		color: #8e8e8e;
	}
`;

const FollowModal = ({ modalVisible, setModalVisible, title, tagId }) => {
	const { userFollowers, userFollowings } = useSelector((state) => state.user);

	return (
		<>
			<Modal
				visible={modalVisible}
				setModal={setModalVisible}
				closable={true}
				maskClosable={true}
				title={title}
				maxWidth={300}
			>
				<FollowModalInner>
					{tagId === 'followers'
						? userFollowers.map((v) => (
								<Link key={v.id + v.createdAt} href={`/${v.nickname}`}>
									<FollowerList>
										<FollowUser>
											<div>
												<Avatar
													profileImg={v?.profileImg}
													size={43}
													nickname={v.nickname}
												/>
											</div>
											<TextWrapper>
												<div>
													<span>{v.nickname}</span>
												</div>
												<div>
													<span>{v.firstName + v.lastName}</span>
												</div>
											</TextWrapper>
										</FollowUser>
									</FollowerList>
								</Link>
						  ))
						: userFollowings.map((v) => (
								<Link key={v.id + v.createdAt} href={`/${v.nickname}`}>
									<FollowerList>
										<FollowUser>
											<div>
												<Avatar
													profileImg={v?.profileImg}
													size={43}
													nickname={v.nickname}
												/>
											</div>
											<TextWrapper>
												<div>
													<span>{v.nickname}</span>
												</div>
												<div>
													<span>{v.firstName + v.lastName}</span>
												</div>
											</TextWrapper>
										</FollowUser>
									</FollowerList>
								</Link>
						  ))}
				</FollowModalInner>
			</Modal>
		</>
	);
};

export default React.memo(FollowModal);
