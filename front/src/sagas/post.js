import axios from 'axios';
import { all, call, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import {
	ADD_COMMENT_FAILURE,
	ADD_COMMENT_REQUEST,
	ADD_COMMENT_SUCCESS,
	ADD_POST_FAILURE,
	ADD_POST_REQUEST,
	ADD_POST_SUCCESS,
	LOAD_MAIN_POSTS_FAILURE,
	LOAD_MAIN_POSTS_REQUEST,
	LOAD_MAIN_POSTS_SUCCESS,
} from '../reducers/post';

function loadPostsAPI(lastId) {
	return axios.get(`/posts?lastId=${lastId || 0}`);
}

function* loadPosts(action) {
	try {
		const result = yield call(loadPostsAPI, action.lastId);
		yield delay(1000);

		yield put({
			type: LOAD_MAIN_POSTS_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: LOAD_MAIN_POSTS_FAILURE,
			error: err.response,
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

function addPostAPI(data) {
	return axios.post('/post', data);
}

function* addPost(action) {
	try {
		const result = yield call(addPostAPI, action.data);
		yield delay(1000);

		yield put({
			type: ADD_POST_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: ADD_POST_FAILURE,
			error: err.response.data,
		});
	}
}
function* watchAddPost() {
	yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
	yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchLoadPosts() {
	yield throttle(3000, LOAD_MAIN_POSTS_REQUEST, loadPosts);
}

export default function* postSaga() {
	yield all([fork(watchLoadPosts), fork(watchAddComment), fork(watchAddPost)]);
}
