import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';

import reducer from '../reducers';
import rootSaga from '../sagas';

const configureStore = () => {
	const sagaMiddleware = createSagaMiddleware();
	const middleware = [sagaMiddleware];

	const enhancer =
		process.env.NODE_ENV === 'production'
			? compose(applyMiddleware(...middleware))
			: composeWithDevTools(applyMiddleware(...middleware));

	const store = createStore(reducer, enhancer);

	// withReduxSaga를 통한 서버사이드랜더링을 위해 설정 추가
	store.sagaTask = sagaMiddleware.run(rootSaga);
	return store;
};

const wrapper = createWrapper(configureStore, {
	debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
