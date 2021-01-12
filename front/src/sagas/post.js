import axios from 'axios';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
	ADD_COMMENT_FAILURE,
	ADD_COMMENT_REQUEST,
	ADD_COMMENT_SUCCESS,
	LOAD_POSTS_FAILURE,
	LOAD_POSTS_REQUEST,
	LOAD_POSTS_SUCCESS,
} from '../reducers/post';
import { dummyPost } from '../dummy';

function loadPostsAPI(data) {
	return axios.post('/user/signout', data);
}

function* loadPosts(action) {
	try {
		// yield call(signUpAPI);
		yield delay(1000);

		yield put({
			type: LOAD_POSTS_SUCCESS,
			data: dummyPost(2),
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: LOAD_POSTS_FAILURE,
			error: err.response.data,
		});
	}
}

function addCommentAPI(data) {
	return axios.post('/user/signout', data);
}

function* addComment(action) {
	try {
		// yield call(signUpAPI);
		yield delay(1000);

		yield put({
			type: ADD_COMMENT_SUCCESS,
			data: action.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: ADD_COMMENT_FAILURE,
			error: err.response.data,
		});
	}
}
function* watchAddComment() {
	yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchLoadPosts() {
	yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

export default function* postSaga() {
	yield all([fork(watchLoadPosts), fork(watchAddComment)]);
}
