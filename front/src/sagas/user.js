import axios from 'axios';
import { all, call, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import {
	CHANGE_USER_INFO_FAILURE,
	CHANGE_USER_INFO_REQUEST,
	CHANGE_USER_INFO_SUCCESS,
	CHANGE_USER_PROFILE_IMAGE_FAILURE,
	CHANGE_USER_PROFILE_IMAGE_REQUEST,
	CHANGE_USER_PROFILE_IMAGE_SUCCESS,
	LOAD_MY_INFO_FAILURE,
	LOAD_MY_INFO_REQUEST,
	LOAD_MY_INFO_SUCCESS,
	LOAD_USER_INFO_FAILURE,
	LOAD_USER_INFO_REQUEST,
	LOAD_USER_INFO_SUCCESS,
	LOAD_USER_NOTICE_FAILURE,
	LOAD_USER_NOTICE_REQUEST,
	LOAD_USER_NOTICE_SUCCESS,
	LOAD_USER_FOLLOWNOTICE_FAILURE,
	LOAD_USER_FOLLOWNOTICE_REQUEST,
	LOAD_USER_FOLLOWNOTICE_SUCCESS,
	SIGN_IN_FAILURE,
	SIGN_IN_REQUEST,
	SIGN_IN_SUCCESS,
	SIGN_OUT_FAILURE,
	SIGN_OUT_REQUEST,
	SIGN_OUT_SUCCESS,
	SIGN_UP_FAILURE,
	SIGN_UP_REQUEST,
	SIGN_UP_SUCCESS,
	FOLLOW_FAILURE,
	FOLLOW_REQUEST,
	FOLLOW_SUCCESS,
	UNFOLLOW_FAILURE,
	UNFOLLOW_REQUEST,
	UNFOLLOW_SUCCESS,
	USER_FOLLOWERS_FAILURE,
	USER_FOLLOWERS_REQUEST,
	USER_FOLLOWERS_SUCCESS,
	USER_FOLLOWINGS_FAILURE,
	USER_FOLLOWINGS_REQUEST,
	USER_FOLLOWINGS_SUCCESS,
	LOAD_NOTICE_LIST_FAILURE,
	LOAD_NOTICE_LIST_REQUEST,
	LOAD_NOTICE_LIST_SUCCESS,
} from '../reducers/user';

function signUpAPI(data) {
	return axios.post('/user/signup', data);
}

function* signUp(action) {
	try {
		yield call(signUpAPI, action.data);

		yield put({
			type: SIGN_UP_SUCCESS,
		});
	} catch (err) {
		yield put({
			type: SIGN_UP_FAILURE,
			error: err.response?.data ? err.response.data : err,
		});
	}
}

function signInAPI(data) {
	return axios.post('/user/signin', data);
}

function* signIn(action) {
	try {
		const result = yield call(signInAPI, action.data);

		yield put({
			type: SIGN_IN_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: SIGN_IN_FAILURE,
			error: err.response?.data ? err.response.data : err,
		});
	}
}

function signOutAPI() {
	return axios.post('/user/signout');
}

function* signOut() {
	try {
		yield call(signOutAPI);

		yield put({
			type: SIGN_OUT_SUCCESS,
		});
	} catch (err) {
		yield put({
			type: SIGN_OUT_FAILURE,
			error: err.response?.data ? err.response.data : err,
		});
	}
}

function loadMyInfoAPI() {
	return axios.get('/user');
}

function* loadMyInfo() {
	try {
		const result = yield call(loadMyInfoAPI);

		yield put({
			type: LOAD_MY_INFO_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: LOAD_MY_INFO_FAILURE,
			error: err.response?.data ? err.response.data : err,
		});
	}
}

function loadUserInfoAPI(data) {
	return axios.get(`/user/${data}`);
}

function* loadUserInfo(action) {
	try {
		const result = yield call(loadUserInfoAPI, action.data.nickname);

		yield put({
			type: LOAD_USER_INFO_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: LOAD_USER_INFO_FAILURE,
			error: err.response?.data ? err.response.data : err,
		});
	}
}

function changeUserInfoAPI(data) {
	return axios.patch(`/user/${data.oldNickname}/edit`, data);
}

function* changeUserInfo(action) {
	try {
		const result = yield call(changeUserInfoAPI, action.data);

		yield put({
			type: CHANGE_USER_INFO_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: CHANGE_USER_INFO_FAILURE,
			error: err.response?.data ? err.response.data : err,
		});
	}
}

function changeUserProfileImgAPI(data) {
	return axios.patch(`/user/${data.get('nickname')}/profileimg`, data);
}

function* changeUserProfileImg(action) {
	try {
		const result = yield call(changeUserProfileImgAPI, action.data);

		yield put({
			type: CHANGE_USER_PROFILE_IMAGE_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: CHANGE_USER_PROFILE_IMAGE_FAILURE,
			error: err.response?.data ? err.response.data : err,
		});
	}
}

function followAPI(data) {
	return axios.patch(`/user/${data}/follow`);
}

function* follow(action) {
	try {
		const result = yield call(followAPI, action.data);

		yield put({
			type: FOLLOW_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: FOLLOW_FAILURE,
			error: err.response?.data ? err.response.data : err,
		});
	}
}

function unFollowAPI(data) {
	return axios.delete(`/user/${data}/follow`);
}

function* unFollow(action) {
	try {
		const result = yield call(unFollowAPI, action.data);

		yield put({
			type: UNFOLLOW_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: UNFOLLOW_FAILURE,
			error: err.response?.data ? err.response.data : err,
		});
	}
}

function userFollowersAPI(data) {
	return axios.get(`/user/${data}/followers`);
}

function* userFollowers(action) {
	try {
		const result = yield call(userFollowersAPI, action.data);

		yield put({
			type: USER_FOLLOWERS_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: USER_FOLLOWERS_FAILURE,
			error: err.response?.data ? err.response.data : err,
		});
	}
}

function userFollowingsAPI(data) {
	return axios.get(`/user/${data}/followings`);
}

function* userFollowings(action) {
	try {
		const result = yield call(userFollowingsAPI, action.data);

		yield put({
			type: USER_FOLLOWINGS_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: USER_FOLLOWINGS_FAILURE,
			error: err.response?.data ? err.response.data : err,
		});
	}
}

function loadUserNoticeAPI(lastId) {
	return axios.post(`/user/notice?lastId=${lastId || 0}`);
}

function* loadUserNotice(action) {
	try {
		const result = yield call(loadUserNoticeAPI, action.lastId);

		yield delay(800);

		yield put({
			type: LOAD_USER_NOTICE_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: LOAD_USER_NOTICE_FAILURE,
			error: err.response?.data ? err.response.data : err,
		});
	}
}

function loadUserFollowNoticeAPI(lastId) {
	return axios.post(`/user/followNotice?lastId=${lastId || 0}`);
}

function* loadUserFollowNotice(action) {
	try {
		const result = yield call(loadUserFollowNoticeAPI, action.lastId);

		yield put({
			type: LOAD_USER_FOLLOWNOTICE_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: LOAD_USER_FOLLOWNOTICE_FAILURE,
			error: err.response?.data ? err.response.data : err,
		});
	}
}

function loadUserMobileNoticeAPI(lastId) {
	return axios.post(`/user/moblieNotice?lastId=${lastId || 0}`);
}

function* loadUserMobileNotice(action) {
	try {
		const result = yield call(loadUserMobileNoticeAPI, action.lastId);

		yield delay(1000);

		yield put({
			type: LOAD_NOTICE_LIST_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: LOAD_NOTICE_LIST_FAILURE,
			error: err.response?.data ? err.response.data : err,
		});
	}
}

function* watchLoadUserMobileNotice() {
	yield takeLatest(LOAD_NOTICE_LIST_REQUEST, loadUserMobileNotice);
}

function* watchLoadUserFollowNotice() {
	yield takeLatest(LOAD_USER_FOLLOWNOTICE_REQUEST, loadUserFollowNotice);
}

function* watchLoadUserNotice() {
	yield takeLatest(LOAD_USER_NOTICE_REQUEST, loadUserNotice);
}

function* watchUserFollowings() {
	yield takeLatest(USER_FOLLOWINGS_REQUEST, userFollowings);
}

function* watchUserFollowers() {
	yield takeLatest(USER_FOLLOWERS_REQUEST, userFollowers);
}

function* watchUnFollow() {
	yield takeLatest(UNFOLLOW_REQUEST, unFollow);
}

function* watchFollow() {
	yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchChangeUserProfileImg() {
	yield takeLatest(CHANGE_USER_PROFILE_IMAGE_REQUEST, changeUserProfileImg);
}

function* watchChangeUserInfo() {
	yield takeLatest(CHANGE_USER_INFO_REQUEST, changeUserInfo);
}

function* watchLoadUserInfo() {
	yield takeLatest(LOAD_USER_INFO_REQUEST, loadUserInfo);
}

function* watchLoadMyInfo() {
	yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
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
	yield all([
		fork(watchSignUp),
		fork(watchLoadUserInfo),
		fork(watchSignIn),
		fork(watchSignOut),
		fork(watchLoadMyInfo),
		fork(watchChangeUserInfo),
		fork(watchChangeUserProfileImg),
		fork(watchFollow),
		fork(watchUnFollow),
		fork(watchUserFollowers),
		fork(watchUserFollowings),
		fork(watchLoadUserNotice),
		fork(watchLoadUserFollowNotice),
		fork(watchLoadUserMobileNotice),
	]);
}
