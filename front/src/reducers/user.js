import produce from 'immer';

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

	signUpLoading: false, // 회원가입 시도중
	signUpDone: false,
	signUpError: null,

	signInLoading: false, // 회원가입 시도중
	signInDone: false,
	signInError: null,

	signOutLoading: false, // 회원가입 시도중
	signOutDone: false,
	signOutError: null,
};

export const userData = {
	id: 1,
	firstName: '지',
	lastName: '석호',
	userId: 'wltjrgh',
	password: '1007',
	birthDate: 0,
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
				console.log(action.data);
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
		}
	});

export default reducer;
