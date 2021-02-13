import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Avatar from '../../../UI/Avatar';

const SearchList = styled.li`
	width: 100%;
	display: flex;
	align-items: center;
	flex-direction: row;
	padding: 0.8rem 1.4rem;
	line-height: 18px;
	border-radius: 5px;
	z-index: 10;
	cursor: pointer;
	&:hover {
		background-color: #f5f5f5;
	}
	& > div {
		& > div {
			color: #adadad;
		}
	}
`;

const FirstShap = styled.div`
	font-size: 2.3rem;
	margin-right: 1.6rem;
	color: #e8e8e8;
`;

const SearchListComponent = ({ searchText }) => {
	const { searchInfo } = useSelector((state) => state.search);

	return (
		<>
			{(searchInfo?.User || searchInfo?.tag) &&
				searchInfo?.User &&
				searchText[0] !== '#' &&
				searchInfo?.User.map((v) => (
					<Link href={'/' + v.nickname} key={v.nickname + v.id}>
						<SearchList>
							<Avatar size={32} profileImg={v.profileImg} />
							<div>
								<span>{v.nickname}</span>
								<div>{v.firstName + v.lastName}</div>
							</div>
						</SearchList>
					</Link>
				))}
			{searchInfo?.tag &&
				searchInfo?.tag.map((v) => (
					<Link href={`/tag/${encodeURIComponent(v.name)}`} key={v.name + v.id}>
						<SearchList>
							<FirstShap>#</FirstShap>
							<div>
								<span>{v.name}</span>
								<div>게시글 {v.Posts?.length}</div>
							</div>
						</SearchList>
					</Link>
				))}
		</>
	);
};

export default SearchListComponent;
