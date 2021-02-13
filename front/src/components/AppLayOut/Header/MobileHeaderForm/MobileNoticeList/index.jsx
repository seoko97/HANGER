import Link from 'next/link';
import React from 'react';
import useTimeForToday from '../../../../../hooks/useTimeForToday';
import { NoNotice, NoticeList, TimeToday } from '../../../../Pages/Home/NoticeForm/style';
import Avatar from '../../../../UI/Avatar';

const MobileNoticeList = ({ userMobileNotice }) => {
	return (
		<>
			{userMobileNotice && userMobileNotice[0] ? (
				userMobileNotice.map((v) => (
					<Link
						href={
							v.noticed !== 'follow'
								? `/post/${v.PostId}`
								: `/${v.targetUser.nickname}`
						}
						key={v.id + v.noticed + v.createdAt}
					>
						<NoticeList>
							<>
								<Avatar
									profileImg={v.targetUser.profileImg}
									nickname={v.nickname}
								/>
								<div>
									<span>{v.targetUser.nickname}</span>
									님이
									{v.noticed === 'save' && <div>내 게시글을 저장했습니다.</div>}
									{v.noticed === 'like' && (
										<div>내 게시글에 좋아요를 남겼습니다.</div>
									)}
									{v.noticed === 'comment' && (
										<div>내 게시글에 댓글을 남겼습니다.</div>
									)}
									{v.noticed === 'follow' && <div>회원님을 팔로우했습니다.</div>}
									<TimeToday>{useTimeForToday(v.createdAt)}</TimeToday>
								</div>
							</>
						</NoticeList>
					</Link>
				))
			) : (
				<NoNotice>알림이 없습니다.</NoNotice>
			)}
		</>
	);
};

export default MobileNoticeList;
