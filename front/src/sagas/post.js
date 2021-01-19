import axios from 'axios';
import { all, call, fork, put, takeEvery, takeLatest, throttle } from 'redux-saga/effects';
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
	UPLOAD_IMAGES_REQUEST,
	UPLOAD_IMAGES_SUCCESS,
	UPLOAD_IMAGES_FAILURE,
	REMOVE_POST_SUCCESS,
	REMOVE_POST_FAILURE,
	REMOVE_POST_REQUEST,
	LIKE_POST_SUCCESS,
	LIKE_POST_FAILURE,
	LIKE_POST_REQUEST,
	UNLIKE_POST_SUCCESS,
	UNLIKE_POST_FAILURE,
	UNLIKE_POST_REQUEST,
} from '../reducers/post';

function loadPostsAPI(lastId) {
	return axios.get(`/posts?lastId=${lastId || 0}`);
}

function* loadPosts(action) {
	try {
		const result = yield call(loadPostsAPI, action.lastId);

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
	return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
	try {
		const result = yield call(addCommentAPI, action.data);

		yield put({
			type: ADD_COMMENT_SUCCESS,
			data: result.data,
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

function upLoadImagesAPI(data) {
	return axios.post('/post/images', data);
}

function* upLoadImages(action) {
	try {
		const result = yield call(upLoadImagesAPI, action.data);

		yield put({
			type: UPLOAD_IMAGES_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: UPLOAD_IMAGES_FAILURE,
			error: err.response.data,
		});
	}
}

function removePostAPI(data) {
	return axios.delete(`/post/${data}`);
}

function* removePost(action) {
	try {
		const result = yield call(removePostAPI, action.data);

		console.log(result.data, '데이터입니다.');

		yield put({
			type: REMOVE_POST_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: REMOVE_POST_FAILURE,
			error: err.response.data,
		});
	}
}

function likePostAPI(data) {
	return axios.patch(`/post/${data}/like`);
}

function* likePost(action) {
	try {
		const result = yield call(likePostAPI, action.data);

		yield put({
			type: LIKE_POST_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: LIKE_POST_FAILURE,
			error: err.response.data,
		});
	}
}

function unLikePostAPI(data) {
	return axios.delete(`/post/${data}/like`);
}

function* unLikePost(action) {
	try {
		const result = yield call(unLikePostAPI, action.data);

		yield put({
			type: UNLIKE_POST_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: UNLIKE_POST_FAILURE,
			error: err.response.data,
		});
	}
}

function* watchUnLikePost() {
	yield takeLatest(UNLIKE_POST_REQUEST, unLikePost);
}

function* watchLikePost() {
	yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchRemovePost() {
	yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchUpLoadImages() {
	yield takeLatest(UPLOAD_IMAGES_REQUEST, upLoadImages);
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
	yield all([
		fork(watchLoadPosts),
		fork(watchAddComment),
		fork(watchAddPost),
		fork(watchUpLoadImages),
		fork(watchRemovePost),
		fork(watchLikePost),
		fork(watchUnLikePost),
	]);
}
