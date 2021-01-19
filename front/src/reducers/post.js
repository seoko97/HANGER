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

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const SAVE_POST_REQUEST = 'SAVE_POST_REQUEST';
export const SAVE_POST_SUCCESS = 'SAVE_POST_SUCCESS';
export const SAVE_POST_FAILURE = 'SAVE_POST_FAILURE';

export const UNSAVE_POST_REQUEST = 'UNSAVE_POST_REQUEST';
export const UNSAVE_POST_SUCCESS = 'UNSAVE_POST_SUCCESS';
export const UNSAVE_POST_FAILURE = 'UNSAVE_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const initialState = {
	mainPosts: [],
	hasMorePosts: true,
	imagesPath: [],

	addPostLoading: false, // 포스트 생성
	addPostDone: false,
	addPostError: null,

	loadPostsLoading: false, // 포스트 불러오기
	loadPostsDone: false,
	loadPostsError: null,

	addCommentLoading: false, // 댓글 저장
	addCommentDone: false,
	addCommentError: null,

	upLoadImagesLoading: false, // 이미지 업로드
	upLoadImagesDone: false,
	upLoadImagesError: null,

	likePostLoading: false, // 포스트 좋아요
	likePostDone: false,
	likePostError: null,

	unLikePostLoading: false, // 포스트 좋아요 취소
	unLikePostDone: false,
	unLikePostError: null,

	removePostLoading: false, // 포스트 삭제
	removePostDone: false,
	removePostError: null,

	savePostLoading: false, // 포스트 저장하기
	savePostDone: false,
	savePostError: null,

	UnSavePostLoading: false, // 포스트 저장하기 취소
	UnSavePostDone: false,
	UnSavePostError: null,
};

const reducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			// 폼에 올려둔 이미지 제거
			case REMOVE_IMAGE:
				draft.imagesPath = draft.imagesPath.filter((v, i) => i !== action.data);
				break;

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
			case ADD_COMMENT_SUCCESS: {
				const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
				console.log(post);
				post.Comments.unshift(action.data);
				draft.mainPosts;
				draft.addCommentLoading = false;
				draft.addCommentDone = true;
				break;
			}
			case ADD_COMMENT_FAILURE:
				draft.addCommentLoading = false;
				draft.addCommentError = action.error;
				break;

			// 이미지 업로드
			case UPLOAD_IMAGES_REQUEST:
				draft.upLoadImagesLoading = true;
				draft.upLoadImagesError = null;
				draft.upLoadImagesDone = false;
				break;
			case UPLOAD_IMAGES_SUCCESS:
				action.data.forEach((image) => draft.imagesPath.unshift(image));
				draft.upLoadImagesLoading = false;
				draft.upLoadImagesDone = true;
				break;
			case UPLOAD_IMAGES_FAILURE:
				draft.upLoadImagesLoading = false;
				draft.upLoadImagesError = action.error;
				break;

			// 저장하기 클릭
			case SAVE_POST_REQUEST:
				draft.savePostLoading = true;
				draft.savePostError = null;
				draft.savePostDone = false;
				break;
			case SAVE_POST_SUCCESS: {
				const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
				post.Savers.push({ id: action.data.UserId });
				draft.savePostLoading = false;
				draft.savePostDone = true;
				break;
			}
			case SAVE_POST_FAILURE:
				draft.savePostLoading = false;
				draft.savePostError = action.error;
				break;

			// 저장하기 취소
			case UNSAVE_POST_REQUEST:
				draft.UnSavePostLoading = true;
				draft.unSavePostError = null;
				draft.unSavePostDone = false;
				break;
			case UNSAVE_POST_SUCCESS: {
				const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
				post.Savers = post.Savers.filter((v) => v.id !== action.data.UserId);
				draft.unSavePostLoading = false;
				draft.unSavePostDone = true;
				break;
			}
			case UNSAVE_POST_FAILURE:
				draft.unSavePostLoading = false;
				draft.unSavePostError = action.error;
				break;

			// 좋아요 클릭
			case LIKE_POST_REQUEST:
				draft.likePostLoading = true;
				draft.likePostError = null;
				draft.likePostDone = false;
				break;
			case LIKE_POST_SUCCESS: {
				const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
				post.Likers.push({ id: action.data.UserId });
				draft.likePostLoading = false;
				draft.likePostDone = true;
				break;
			}
			case LIKE_POST_FAILURE:
				draft.likePostLoading = false;
				draft.likePostError = action.error;
				break;

			// 좋아요 취소
			case UNLIKE_POST_REQUEST:
				draft.unLikePostLoading = true;
				draft.unLikePostError = null;
				draft.unLikePostDone = false;
				break;
			case UNLIKE_POST_SUCCESS: {
				const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
				post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
				draft.unLikePostLoading = false;
				draft.unLikePostDone = true;
				break;
			}
			case UNLIKE_POST_FAILURE:
				draft.unLikePostLoading = false;
				draft.unLikePostError = action.error;
				break;

			case REMOVE_POST_REQUEST:
				draft.removePostLoading = true;
				draft.removePostError = null;
				draft.removePostDone = false;
				break;

			case REMOVE_POST_SUCCESS: {
				draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
				draft.removePostLoading = false;
				draft.removePostDone = true;
				break;
			}
			case REMOVE_POST_FAILURE:
				draft.removePostLoading = false;
				draft.removePostError = action.error;
				break;
		}
	});

export default reducer;
