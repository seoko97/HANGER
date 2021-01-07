import produce from 'immer';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const initialState = {
	me: null,

	signUpLoading: false, // 회원가입 시도중
	signUpDone: false,
	signUpError: null,
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
		}
	});

export default reducer;
