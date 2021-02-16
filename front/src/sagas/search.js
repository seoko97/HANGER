import axios from 'axios';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
	LOAD_SEARCH_INFO_SUCCESS,
	LOAD_SEARCH_INFO_FAILURE,
	LOAD_SEARCH_INFO_REQUEST,
	LOAD_SEARCH_TAG_INFO_FAILURE,
	LOAD_SEARCH_TAG_INFO_REQUEST,
	LOAD_SEARCH_TAG_INFO_SUCCESS,
} from '../reducers/search';

function loadSearchInfoAPI(data) {
	return axios.post(`/search/${encodeURIComponent(data)}`);
}

function* loadSearchInfo(action) {
	try {
		const result = yield call(loadSearchInfoAPI, action.data);

		yield delay(300);
		yield put({
			type: LOAD_SEARCH_INFO_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: LOAD_SEARCH_INFO_FAILURE,
			error: err.response.data,
		});
	}
}

function loadSearchTagInfoAPI(data) {
	return axios.post(`/search/${encodeURIComponent(data)}/tag`);
}

function* loadSearchTagInfo(action) {
	try {
		const result = yield call(loadSearchTagInfoAPI, action.data);

		yield delay(300);
		yield put({
			type: LOAD_SEARCH_TAG_INFO_SUCCESS,
			data: result.data,
		});
	} catch (err) {
		yield put({
			type: LOAD_SEARCH_TAG_INFO_FAILURE,
			error: err.response.data,
		});
	}
}

function* watchLoadSearchTagInfo() {
	yield takeLatest(LOAD_SEARCH_TAG_INFO_REQUEST, loadSearchTagInfo);
}

function* watchLoadSearchInfo() {
	yield takeLatest(LOAD_SEARCH_INFO_REQUEST, loadSearchInfo);
}

export default function* postSaga() {
	yield all([fork(watchLoadSearchInfo), fork(watchLoadSearchTagInfo)]);
}
