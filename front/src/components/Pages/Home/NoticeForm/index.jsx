import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	NoticeFormWrapper,
	NoticeHeader,
	NoticeInner,
	NoticeListWrapper,
	NoticeMain,
	SignOutInner,
} from './style';
import Button from '../../../UI/Button';
import {
	LOAD_USER_FOLLOWNOTICE_REQUEST,
	LOAD_USER_NOTICE_REQUEST,
} from '../../../../reducers/user';
import NoticeListForm from './NoticeListForm';
import FollowNoticeListForm from './FollowNoticeListForm';

const NoticeForm = () => {
	const {
		me,
		userNotice,
		userFollowNotice,
		hasMoreNotices,
		userNoticeLoading,
		hasMoreFollowNotices,
		userFollowNoticeLoading,
	} = useSelector((state) => state.user);

	const [mainNotify, setMainNotify] = useState(true);
	const [followNotify, setFollowNotify] = useState(false);
	const wrapperRef = useRef(0);
	const dispatch = useDispatch();

	useEffect(() => {
		if (me) {
			const handleScroll = () => {
				const scrollHeight = wrapperRef.current.scrollHeight;
				const scrollTop = wrapperRef.current.scrollTop;
				const clientHeight = wrapperRef.current.clientHeight;

				if (clientHeight + scrollTop > scrollHeight - 1) {
					if (mainNotify) {
						if (hasMoreNotices && !userNoticeLoading) {
							const lastId = userNotice[userNotice.length - 1]?.id;
							dispatch({
								type: LOAD_USER_NOTICE_REQUEST,
								lastId,
							});
						}
					} else if (followNotify) {
						if (hasMoreFollowNotices && !userFollowNoticeLoading) {
							const lastId = userFollowNotice[userFollowNotice.length - 1]?.id;
							dispatch({
								type: LOAD_USER_FOLLOWNOTICE_REQUEST,
								lastId,
							});
						}
					}
				}
			};

			wrapperRef?.current?.addEventListener('scroll', handleScroll);
			return () => {
				wrapperRef?.current?.removeEventListener('scroll', handleScroll);
			};
		}
	}, [wrapperRef, hasMoreNotices, userNoticeLoading, userNotice, me, mainNotify]);

	const onClickMainNotice = useCallback(
		(fstHan, twoHan) => () => {
			fstHan(true);
			twoHan(false);

			if (hasMoreNotices && !userNoticeLoading) {
				const lastId = userNotice[userNotice.length - 1]?.id;
				return dispatch({
					type: LOAD_USER_NOTICE_REQUEST,
					lastId,
				});
			}
		},
		[wrapperRef, hasMoreNotices, userNoticeLoading],
	);

	const onClickFollowNotice = useCallback(
		(fstHan, twoHan) => () => {
			fstHan(true);
			twoHan(false);

			if (hasMoreFollowNotices && !userFollowNoticeLoading) {
				const lastId = userFollowNotice[userFollowNotice.length - 1]?.id;
				return dispatch({
					type: LOAD_USER_FOLLOWNOTICE_REQUEST,
					lastId,
				});
			}
		},
		[hasMoreFollowNotices, userFollowNoticeLoading, userFollowNotice],
	);

	return (
		<>
			<NoticeFormWrapper>
				{me ? (
					<>
						<NoticeInner>
							<NoticeHeader>
								<div
									className={mainNotify ? 'click' : undefined}
									onClick={onClickMainNotice(setMainNotify, setFollowNotify)}
								>
									<div>알림</div>
								</div>
								<div
									className={followNotify ? 'click' : undefined}
									onClick={onClickFollowNotice(setFollowNotify, setMainNotify)}
								>
									<div>팔로우</div>
								</div>
							</NoticeHeader>
							<NoticeMain>
								{mainNotify && userNotice && (
									<NoticeListWrapper ref={wrapperRef}>
										<NoticeListForm userNotice={userNotice} />
									</NoticeListWrapper>
								)}

								{followNotify && userFollowNotice && (
									<NoticeListWrapper ref={wrapperRef}>
										<FollowNoticeListForm userFollowNotice={userFollowNotice} />
									</NoticeListWrapper>
								)}
							</NoticeMain>
						</NoticeInner>
					</>
				) : (
					<>
						<SignOutInner>
							<div>로그인 후 사용가능합니다.</div>
							<Button>
								<Link href="/signin">로그인창으로 이동</Link>
							</Button>
						</SignOutInner>
					</>
				)}
			</NoticeFormWrapper>
		</>
	);
};

export default React.memo(NoticeForm);
