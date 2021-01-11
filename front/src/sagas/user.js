import axios from 'axios';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
	SIGN_IN_FAILURE,
	SIGN_IN_REQUEST,
	SIGN_IN_SUCCESS,
	SIGN_OUT_FAILURE,
	SIGN_OUT_REQUEST,
	SIGN_OUT_SUCCESS,
	SIGN_UP_FAILURE,
	SIGN_UP_REQUEST,
	SIGN_UP_SUCCESS,
} from '../reducers/user';
import { dummyUser1 } from '../dummy';

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

function signInAPI(data) {
	return axios.post('/user', data);
}

function* signIn(action) {
	try {
		// const result = yield call(signUpAPI);
		yield delay(1000);

		yield put({
			type: SIGN_IN_SUCCESS,
			// 더미유저
			data: dummyUser1,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: SIGN_IN_FAILURE,
			error: err.response.data,
		});
	}
}

function signOutAPI(data) {
	return axios.post('/user/signout', data);
}

function* signOut(action) {
	try {
		// yield call(signUpAPI);
		yield delay(1000);

		yield put({
			type: SIGN_OUT_SUCCESS,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: SIGN_OUT_FAILURE,
			error: err.response.data,
		});
	}
}
function* watchSignOut() {
	yield takeLatest(SIGN_OUT_REQUEST, signOut);
}

function* watchSignIn() {
	yield takeLatest(SIGN_IN_REQUEST, signIn);
}

function* watchSignUp() {
	yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
	yield all([fork(watchSignUp), fork(watchSignIn), fork(watchSignOut)]);
}
