import Link from 'next/link';
import React from 'react';
import useTimeForToday from '../../../../hooks/useTimeForToday';
import Avatar from '../../../UI/Avatar';
import { NoNotice, NoticeList, TimeToday } from './style';

const FollowNoticeListForm = ({ userFollowNotice }) => {
	return (
		<>
			{userFollowNotice && userFollowNotice[0] ? (
				userFollowNotice.map((v) => (
					<Link href={`/${v.targetUser.nickname}`} key={v.id + v.noticed + v.createdAt}>
						<NoticeList>
							<>
								<Avatar profileImg={v.targetUser.profileImg} />
								<div>
									<span>{v.targetUser.nickname}</span>
									님이
									<div>회원님을 팔로우했습니다.</div>
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

export default React.memo(FollowNoticeListForm);
