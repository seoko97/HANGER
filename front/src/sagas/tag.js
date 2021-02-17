import axios from 'axios';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
	LOAD_HASHTAG_POSTS_FAILURE,
	LOAD_HASHTAG_POSTS_REQUEST,
	LOAD_HASHTAG_POSTS_SUCCESS,
} from '../reducers/post';

function loadHashtagPostsAPI(data) {
	return axios.get(`/tag/${encodeURIComponent(data.tag)}?lastId=${data.lastId || 0}`);
}

function* loadHashtagPosts(action) {
	try {
		const result = yield call(loadHashtagPostsAPI, action.data);

		yield put({
			type: LOAD_HASHTAG_POSTS_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: LOAD_HASHTAG_POSTS_FAILURE,
			error: err.response.data,
		});
	}
}

function* watchLoadHashtagPosts() {
	yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

export default function* tagSaga() {
	yield all([fork(watchLoadHashtagPosts)]);
}
