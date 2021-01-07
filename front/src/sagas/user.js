import axios from 'axios';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from '../reducers/user';

function signUpAPI(data) {
	return axios.post('/user', data);
}

function* signUp(action) {
	try {
		// const result = yield call(signUpAPI);
		yield delay(1000);

		yield put({
			type: SIGN_UP_SUCCESS,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: SIGN_UP_FAILURE,
			error: err.response.data,
		});
	}
}
function* watchSignUp() {
	yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
	yield all([fork(watchSignUp)]);
}
