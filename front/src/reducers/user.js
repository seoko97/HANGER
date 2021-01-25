import produce from 'immer';

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOAD_USER_INFO_REQUEST = 'LOAD_USER_INFO_REQUEST';
export const LOAD_USER_INFO_SUCCESS = 'LOAD_USER_INFO_SUCCESS';
export const LOAD_USER_INFO_FAILURE = 'LOAD_USER_INFO_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const SIGN_OUT_FAILURE = 'SIGN_OUT_FAILURE';

export const initialState = {
	me: null,
	userInfo: null,

	signUpLoading: false, // 회원가입
	signUpDone: false,
	signUpError: null,

	signInLoading: false, // 로그인
	signInDone: false,
	signInError: null,

	signOutLoading: false, // 로그아웃
	signOutDone: false,
	signOutError: null,

	loadMyInfoLoading: false, // 내정보 호출
	loadMyInfoDone: false,
	loadMyInfoError: null,

	loadUserInfoLoading: false, // 유저 정보 호출
	loadUserInfoDone: false,
	loadUserInfoError: null,
};

const reducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			// 회원가입
			case SIGN_UP_REQUEST:
				draft.signUpLoading = true;
				draft.signUpError = null;
				draft.signUpDone = false;
				break;
			case SIGN_UP_SUCCESS:
				draft.signUpLoading = false;
				draft.signUpDone = true;
				break;
			case SIGN_UP_FAILURE:
				draft.signUpLoading = false;
				draft.signUpError = action.error;
				break;

			// 로그인
			case SIGN_IN_REQUEST:
				draft.signInLoading = true;
				draft.signInError = null;
				draft.signInDone = false;
				break;
			case SIGN_IN_SUCCESS:
				draft.me = action.data;
				draft.signInLoading = false;
				draft.signInDone = true;
				break;
			case SIGN_IN_FAILURE:
				draft.signInLoading = false;
				draft.signInError = action.error;
				break;

			// 로그아웃
			case SIGN_OUT_REQUEST:
				draft.signOutLoading = true;
				draft.signOutError = null;
				draft.signOutDone = false;
				break;
			case SIGN_OUT_SUCCESS:
				draft.me = null;
				draft.signInDone = false;
				draft.signOutLoading = false;
				draft.signOutDone = true;
				break;
			case SIGN_OUT_FAILURE:
				draft.signOutLoading = false;
				draft.signOutError = action.error;
				break;

			// 내정보 호출
			case LOAD_MY_INFO_REQUEST:
				draft.loadMyInfoLoading = true;
				draft.loadMyInfoError = null;
				draft.loadMyInfoDone = false;
				break;
			case LOAD_MY_INFO_SUCCESS:
				draft.me = action.data;
				draft.loadMyInfoLoading = false;
				draft.loadMyInfoDone = true;
				break;
			case LOAD_MY_INFO_FAILURE:
				draft.loadMyInfoLoading = false;
				draft.loadMyInfoError = action.error;
				break;

			// 내정보 호출
			case LOAD_USER_INFO_REQUEST:
				draft.loadUserInfoLoading = true;
				draft.loadUserInfoError = null;
				draft.loadUserInfoDone = false;
				break;
			case LOAD_USER_INFO_SUCCESS:
				draft.userInfo = action.data;
				draft.loadUserInfoLoading = false;
				draft.loadUserInfoDone = true;
				break;
			case LOAD_USER_INFO_FAILURE:
				draft.loadUserInfoLoading = false;
				draft.loadUserInfoError = action.error;
				break;
		}
	});

export default reducer;
