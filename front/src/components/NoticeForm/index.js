import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { NoticeFormWrapper } from './style';
import Button from '../UI/Button';

const NoticeForm = () => {
	const { me } = useSelector((state) => state.user);
	return (
		<>
			<NoticeFormWrapper>
				{me ? (
					'알림'
				) : (
					<>
						<div>로그인 후 사용가능합니다.</div>
						<Button>
							<Link href="/signin">로그인창으로 이동</Link>
						</Button>
					</>
				)}
			</NoticeFormWrapper>
		</>
	);
};

export default NoticeForm;
