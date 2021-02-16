import React, { useEffect } from 'react';
import { AiOutlineSearch, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { RiSearchLine, RiSearchFill } from 'react-icons/ri';
import { IconWrapepr, SearchForm, SearchFormWrapper } from './style';
import useInput from '../../../../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../UI/Loader';
import SearchListComponent from '../SearchListComponent';
import {
	LOAD_SEARCH_INFO_REQUEST,
	LOAD_SEARCH_TAG_INFO_REQUEST,
} from '../../../../reducers/search';
import useComponentVisible from '../../../../hooks/useComponentVisible';
import { LOAD_NOTICE_LIST_REQUEST } from '../../../../reducers/user';
import MobileNoticeList from './MobileNoticeList';
import styled from 'styled-components';

export const LoadInner = styled.div`
	display: flex;
	justify-content: center;
	margin: 1rem 0;
	& > div {
		position: relative;
		right: 0;
	}
`;

export const NoticeForm = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
	max-height: 100vh;
	overscroll-behavior: contain;
	overflow: scroll;
	& > div:first-child {
		width: 100%;
		padding: 1rem;
		& > span {
			float: left;
			font-size: 1.7rem;
			color: #545454;
		}
	}
`;

const MobileHeaderForm = ({ searchRef, isSearchComponentVisible, setIsSearchComponentVisible }) => {
	const { loadSearchInfoLoading } = useSelector((state) => state.search);
	const {
		hasMoreMoblieNotices,
		userMobileNoticeDone,
		userMobileNoticeLoading,
		userMobileNotice,
	} = useSelector((state) => state.user);
	const { me } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [searchText, textHandler, setSearchText] = useInput('');

	const {
		ref: noticeRef,
		isComponentVisible: isNoticeComponentVisible,
		setIsComponentVisible: setIsNoticeComponentVisible,
	} = useComponentVisible(false);

	useEffect(() => {
		setIsSearchComponentVisible(false);
		setIsNoticeComponentVisible(false);
		setSearchText('');
	}, [me]);

	useEffect(() => {
		if (searchText[0] === '#') {
			if (searchText[1]) {
				const newStr = searchText.substr(1);
				return dispatch({
					type: LOAD_SEARCH_TAG_INFO_REQUEST,
					data: newStr,
				});
			}
			return;
		}
		if (searchText[0] !== '#' && searchText) {
			return dispatch({
				type: LOAD_SEARCH_INFO_REQUEST,
				data: searchText,
			});
		}
	}, [searchText]);

	useEffect(() => {
		if (isNoticeComponentVisible && hasMoreMoblieNotices && !userMobileNotice[0]) {
			dispatch({
				type: LOAD_NOTICE_LIST_REQUEST,
			});
		}
	}, [isNoticeComponentVisible]);

	return (
		<>
			<SearchFormWrapper ref={searchRef}>
				<IconWrapepr onClick={() => setIsSearchComponentVisible(!isSearchComponentVisible)}>
					{isSearchComponentVisible ? (
						<RiSearchFill size={25} />
					) : (
						<RiSearchLine size={25} />
					)}
				</IconWrapepr>
				{isSearchComponentVisible && (
					<SearchForm>
						<label>
							{isSearchComponentVisible && <AiOutlineSearch size={15} />}
							<input
								type="search"
								placeholder="검색어를 입력하세요"
								value={searchText}
								onChange={textHandler}
							/>
							{searchText && loadSearchInfoLoading && (
								<Loader type="spin" color="#ccc" size={20} />
							)}
						</label>

						{isSearchComponentVisible && searchText && !loadSearchInfoLoading && (
							<>
								<span>검색내용: {searchText}</span>
								<div>
									<SearchListComponent searchText={searchText} />
								</div>
							</>
						)}
					</SearchForm>
				)}
			</SearchFormWrapper>
			<SearchFormWrapper ref={noticeRef}>
				<IconWrapepr onClick={() => setIsNoticeComponentVisible(!isNoticeComponentVisible)}>
					{isNoticeComponentVisible ? (
						<AiFillHeart size={25} />
					) : (
						<AiOutlineHeart size={25} />
					)}
				</IconWrapepr>
				{isNoticeComponentVisible && (
					<SearchForm>
						<NoticeForm>
							<div>
								<span>알림</span>
							</div>

							{userMobileNoticeDone && (
								<>
									<MobileNoticeList userMobileNotice={userMobileNotice} />
								</>
							)}

							{userMobileNoticeLoading && (
								<LoadInner>
									<Loader type="spin" color="#545454" size={20} />
								</LoadInner>
							)}
						</NoticeForm>
					</SearchForm>
				)}
			</SearchFormWrapper>
		</>
	);
};

export default MobileHeaderForm;
