import produce from 'immer';

export const LOAD_SEARCH_INFO_REQUEST = 'LOAD_SEARCH_INFO_REQUEST';
export const LOAD_SEARCH_INFO_SUCCESS = 'LOAD_SEARCH_INFO_SUCCESS';
export const LOAD_SEARCH_INFO_FAILURE = 'LOAD_SEARCH_INFO_FAILURE';

export const LOAD_SEARCH_TAG_INFO_REQUEST = 'LOAD_SEARCH_TAG_INFO_REQUEST';
export const LOAD_SEARCH_TAG_INFO_SUCCESS = 'LOAD_SEARCH_TAG_INFO_SUCCESS';
export const LOAD_SEARCH_TAG_INFO_FAILURE = 'LOAD_SEARCH_TAG_INFO_FAILURE';

export const initialState = {
	searchInfo: null,
	loadSearchInfoLoading: false, // 검색
	loadSearchInfoDone: false,
	loadSearchInfoError: null,
};

const reducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			// 검색
			case LOAD_SEARCH_INFO_REQUEST:
			case LOAD_SEARCH_TAG_INFO_REQUEST:
				draft.loadSearchInfoLoading = true;
				draft.loadSearchInfoError = null;
				draft.loadSearchInfoDone = false;
				break;
			case LOAD_SEARCH_INFO_SUCCESS:
			case LOAD_SEARCH_TAG_INFO_SUCCESS:
				action.data && (draft.searchInfo = action.data);
				draft.loadSearchInfoLoading = false;
				draft.loadSearchInfoDone = true;
				break;
			case LOAD_SEARCH_INFO_FAILURE:
			case LOAD_SEARCH_TAG_INFO_FAILURE:
				draft.loadSearchInfoLoading = false;
				draft.loadSearchInfoError = action.error;
				break;
		}
	});

export default reducer;
