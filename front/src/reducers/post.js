import produce from 'immer';
import shortId from 'shortid';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const initialState = {
	mainPosts: [],
	hasMorePosts: true,

	addPostLoading: false, // 포스트 생성
	addPostDone: false,
	addPostError: null,

	loadPostsLoading: false, // 포스트 불러오기
	loadPostsDone: false,
	loadPostsError: null,

	addCommentLoading: false, // 댓글 저장
	addCommentDone: false,
	addCommentError: null,
};

const dummyComment = {
	id: shortId.generate(),
	content: '더미댓글입니다.',
	User: {
		id: 1,
		nickname: 'develo_Ji',
	},
};

const reducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			// 포스트 불러오기
			case ADD_POST_REQUEST:
				draft.addPostLoading = true;
				draft.addPostError = null;
				draft.addPostDone = false;
				break;
			case ADD_POST_SUCCESS:
				draft.addPostLoading = false;
				draft.addPostDone = true;
				draft.mainPosts.unshift(action.data);
				break;
			case ADD_POST_FAILURE:
				draft.addPostLoading = false;
				draft.addPostError = action.error;
				break;

			// 포스트 불러오기
			case LOAD_MAIN_POSTS_REQUEST:
				draft.loadPostsLoading = true;
				draft.loadPostsError = null;
				draft.loadPostsDone = false;
				break;
			case LOAD_MAIN_POSTS_SUCCESS:
				draft.loadPostsLoading = false;
				draft.loadPostsDone = true;
				draft.mainPosts = action.data.concat(draft.mainPosts);
				break;
			case LOAD_MAIN_POSTS_FAILURE:
				draft.loadPostsLoading = false;
				draft.loadPostsError = action.error;
				break;

			// 댓글 저장
			case ADD_COMMENT_REQUEST:
				draft.addCommentLoading = true;
				draft.addCommentError = null;
				draft.addCommentDone = false;
				break;
			case ADD_COMMENT_SUCCESS:
				const post = draft.mainPosts.find((v) => v.id === action.data.postId);
				post.Comments.unshift(dummyComment);
				draft.addCommentLoading = false;
				draft.addCommentDone = true;
				break;
			case ADD_COMMENT_FAILURE:
				draft.addCommentLoading = false;
				draft.addCommentError = action.error;
				break;
		}
	});

export default reducer;
