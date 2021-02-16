import produce from 'immer';

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOAD_USER_INFO_REQUEST = 'LOAD_USER_INFO_REQUEST';
export const LOAD_USER_INFO_SUCCESS = 'LOAD_USER_INFO_SUCCESS';
export const LOAD_USER_INFO_FAILURE = 'LOAD_USER_INFO_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const SIGN_OUT_FAILURE = 'SIGN_OUT_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const USER_FOLLOWERS_REQUEST = 'USER_FOLLOWERS_REQUEST';
export const USER_FOLLOWERS_SUCCESS = 'USER_FOLLOWERS_SUCCESS';
export const USER_FOLLOWERS_FAILURE = 'USER_FOLLOWERS_FAILURE';

export const USER_FOLLOWINGS_REQUEST = 'USER_FOLLOWINGS_REQUEST';
export const USER_FOLLOWINGS_SUCCESS = 'USER_FOLLOWINGS_SUCCESS';
export const USER_FOLLOWINGS_FAILURE = 'USER_FOLLOWINGS_FAILURE';

export const CHANGE_USER_INFO_REQUEST = 'CHANGE_USER_INFO_REQUEST';
export const CHANGE_USER_INFO_SUCCESS = 'CHANGE_USER_INFO_SUCCESS';
export const CHANGE_USER_INFO_FAILURE = 'CHANGE_USER_INFO_FAILURE';

export const CHANGE_USER_PROFILE_IMAGE_REQUEST = 'CHANGE_USER_PROFILE_IMAGE_REQUEST';
export const CHANGE_USER_PROFILE_IMAGE_SUCCESS = 'CHANGE_USER_PROFILE_IMAGE_SUCCESS';
export const CHANGE_USER_PROFILE_IMAGE_FAILURE = 'CHANGE_USER_PROFILE_IMAGE_FAILURE';

export const LOAD_USER_NOTICE_REQUEST = 'LOAD_USER_NOTICE_REQUEST';
export const LOAD_USER_NOTICE_SUCCESS = 'LOAD_USER_NOTICE_SUCCESS';
export const LOAD_USER_NOTICE_FAILURE = 'LOAD_USER_NOTICE_FAILURE';

export const LOAD_USER_FOLLOWNOTICE_REQUEST = 'LOAD_USER_FOLLOWNOTICE_REQUEST';
export const LOAD_USER_FOLLOWNOTICE_SUCCESS = 'LOAD_USER_FOLLOWNOTICE_SUCCESS';
export const LOAD_USER_FOLLOWNOTICE_FAILURE = 'LOAD_USER_FOLLOWNOTICE_FAILURE';

export const LOAD_NOTICE_LIST_REQUEST = 'LOAD_NOTICE_LIST_REQUEST';
export const LOAD_NOTICE_LIST_SUCCESS = 'LOAD_NOTICE_LIST_SUCCESS';
export const LOAD_NOTICE_LIST_FAILURE = 'LOAD_NOTICE_LIST_FAILURE';

export const initialState = {
	me: null,
	userInfo: null,
	userProfileImg: null,
	userFollowers: [],
	userFollowings: [],
	userNotice: [],
	userFollowNotice: [],
	userMobileNotice: [],

	hasMoreNotices: true,
	hasMoreFollowNotices: true,
	hasMoreMoblieNotices: true,

	signUpLoading: false, // 회원가입
	signUpDone: false,
	signUpError: null,

	signInLoading: false, // 로그인
	signInDone: false,
	signInError: null,

	signOutLoading: false, // 로그아웃
	signOutDone: false,
	signOutError: null,

	loadMyInfoLoading: false, // 내정보 호출
	loadMyInfoDone: false,
	loadMyInfoError: null,

	loadUserInfoLoading: false, // 유저 정보 호출
	loadUserInfoDone: false,
	loadUserInfoError: null,

	changeUserProfileImageLoading: false, // 유저 정보 호출
	changeUserProfileImageDone: false,
	changeUserProfileImageError: null,

	followLoading: false, // 팔로우
	followDone: false,
	followError: null,

	unFollowLoading: false, // 언팔로우
	unFollowDone: false,
	unFollowError: null,

	userFollowersLoading: false, // 팔로워 목록
	userFollowersDone: false,
	userFollowersError: null,

	userFollowingsLoading: false, // 팔로우 목록
	userFollowingsDone: false,
	userFollowingsError: null,

	userNoticeLoading: false, // 알림 목록
	userNoticeDone: false,
	userNoticeError: null,

	userFollowNoticeLoading: false, // 팔로우 알림
	userFollowNoticeDone: false,
	userFollowNoticeError: null,

	userMobileNoticeLoading: false, // 팔로우 알림
	userMobileNoticeDone: false,
	userMobileNoticeError: null,
};

const reducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			// 회원가입
			case SIGN_UP_REQUEST:
				draft.signUpLoading = true;
				draft.signUpError = null;
				draft.signUpDone = false;
				break;
			case SIGN_UP_SUCCESS:
				draft.signUpLoading = false;
				draft.signUpDone = true;
				break;
			case SIGN_UP_FAILURE:
				draft.signUpLoading = false;
				draft.signUpError = action.error;
				break;

			// 로그인
			case SIGN_IN_REQUEST:
				draft.signInLoading = true;
				draft.signInError = null;
				draft.signInDone = false;
				break;
			case SIGN_IN_SUCCESS:
				draft.me = action.data;
				draft.signInLoading = false;
				draft.signInDone = true;
				break;
			case SIGN_IN_FAILURE:
				draft.signInLoading = false;
				draft.signInError = action.error;
				break;

			// 로그아웃
			case SIGN_OUT_REQUEST:
				draft.signOutLoading = true;
				draft.signOutError = null;
				draft.signOutDone = false;
				break;
			case SIGN_OUT_SUCCESS:
				draft.me = null;
				draft.signInDone = false;
				draft.signOutLoading = false;
				draft.signOutDone = true;
				break;
			case SIGN_OUT_FAILURE:
				draft.signOutLoading = false;
				draft.signOutError = action.error;
				break;

			// 프로필 이미지 변경
			case CHANGE_USER_PROFILE_IMAGE_REQUEST:
				draft.changeUserProfileImageLoading = true;
				draft.changeUserProfileImageError = null;
				draft.changeUserProfileImageDone = false;
				break;
			case CHANGE_USER_PROFILE_IMAGE_SUCCESS:
				draft.userProfileImg = action.data;
				draft.changeUserProfileImageLoading = false;
				draft.changeUserProfileImageDone = true;
				break;

			case CHANGE_USER_PROFILE_IMAGE_FAILURE:
				draft.changeUserProfileImageLoading = false;
				draft.changeUserProfileImageError = action.error;
				break;

			// 내정보 호출, 유저 정보 변경
			case LOAD_MY_INFO_REQUEST:
			case CHANGE_USER_INFO_REQUEST:
				draft.loadMyInfoLoading = true;
				draft.loadMyInfoError = null;
				draft.loadMyInfoDone = false;
				break;
			case LOAD_MY_INFO_SUCCESS:
			case CHANGE_USER_INFO_SUCCESS:
				draft.me = action.data;
				draft.loadMyInfoLoading = false;
				draft.loadMyInfoDone = true;
				break;
			case LOAD_MY_INFO_FAILURE:
			case CHANGE_USER_INFO_FAILURE:
				draft.loadMyInfoLoading = false;
				draft.loadMyInfoError = action.error;
				break;

			// 내정보 호출
			case LOAD_USER_INFO_REQUEST:
				draft.userInfo = null;
				draft.loadUserInfoLoading = true;
				draft.loadUserInfoError = null;
				draft.loadUserInfoDone = false;
				break;
			case LOAD_USER_INFO_SUCCESS:
				draft.userInfo = action.data;
				draft.loadUserInfoLoading = false;
				draft.loadUserInfoDone = true;
				break;
			case LOAD_USER_INFO_FAILURE:
				draft.loadUserInfoLoading = false;
				draft.loadUserInfoError = action.error;
				break;

			// 팔로우
			case FOLLOW_REQUEST:
				draft.followLoading = true;
				draft.followError = null;
				draft.followDone = false;
				break;
			case FOLLOW_SUCCESS:
				draft.me.Followings.push({ id: action.data.UserId });

				if (draft.userInfo?.id === action.data.UserId) {
					draft.userInfo.Followers = draft.userInfo.Followers + 1;
				}
				draft.followLoading = false;
				draft.followDone = true;
				break;

			case FOLLOW_FAILURE:
				draft.followLoading = false;
				draft.followError = action.error;
				break;

			// 언팔로우
			case UNFOLLOW_REQUEST:
				draft.UnFollowLoading = true;
				draft.UnFollowError = null;
				draft.UnFollowDone = false;
				break;
			case UNFOLLOW_SUCCESS:
				draft.me.Followings = draft.me.Followings.filter(
					(v) => v.id !== action.data.UserId,
				);

				if (draft.userInfo?.id == action.data.UserId) {
					draft.userInfo.Followers = draft.userInfo.Followers - 1;
				}
				draft.UnFollowLoading = false;
				draft.UnFollowDone = true;
				break;
			case UNFOLLOW_FAILURE:
				draft.UnFollowLoading = false;
				draft.UnFollowError = action.error;
				break;

			// 팔로워 목록
			case USER_FOLLOWERS_REQUEST:
				draft.userFollowers = [];
				draft.userFollowersLoading = true;
				draft.userFollowersError = null;
				draft.userFollowersDone = false;
				break;
			case USER_FOLLOWERS_SUCCESS:
				draft.userFollowers = draft.userFollowers.concat(action.data);
				draft.userFollowersLoading = false;
				draft.userFollowersDone = true;
				break;
			case USER_FOLLOWERS_FAILURE:
				draft.userFollowersLoading = false;
				draft.userFollowersError = action.error;
				break;

			// 팔로잉 목록
			case USER_FOLLOWINGS_REQUEST:
				draft.userFollowings = [];
				draft.userFollowingsLoading = true;
				draft.userFollowingsError = null;
				draft.userFollowingsDone = false;
				break;
			case USER_FOLLOWINGS_SUCCESS:
				draft.userFollowings = draft.userFollowings.concat(action.data);
				draft.userFollowingsLoading = false;
				draft.userFollowingsDone = true;
				break;
			case USER_FOLLOWINGS_FAILURE:
				draft.userFollowingsLoading = false;
				draft.userFollowingsError = action.error;
				break;

			// 알림 목록
			case LOAD_USER_NOTICE_REQUEST:
				draft.userNoticeLoading = true;
				draft.userNoticeError = null;
				draft.userNoticeDone = false;
				break;
			case LOAD_USER_NOTICE_SUCCESS:
				draft.userNotice = draft.userNotice.concat(action.data);
				draft.userNoticeLoading = false;
				draft.userNoticeDone = true;
				draft.hasMoreNotices = action.data.length === 10;
				break;
			case LOAD_USER_NOTICE_FAILURE:
				draft.userNoticeLoading = false;
				draft.userNoticeError = action.error;
				break;

			// 알림 목록
			case LOAD_USER_FOLLOWNOTICE_REQUEST:
				draft.userFollowNotice = [];
				draft.userFollowNoticeLoading = true;
				draft.userFollowNoticeError = null;
				draft.userFollowNoticeDone = false;
				break;
			case LOAD_USER_FOLLOWNOTICE_SUCCESS:
				draft.userFollowNotice = draft.userFollowNotice.concat(action.data);
				draft.userFollowNoticeLoading = false;
				draft.userFollowNoticeDone = true;
				draft.hasMoreFollowNotices = action.data.length === 10;

				break;
			case LOAD_USER_FOLLOWNOTICE_FAILURE:
				draft.userFollowNoticeLoading = false;
				draft.userFollowNoticeError = action.error;
				break;

			// 모바일 알림
			case LOAD_NOTICE_LIST_REQUEST:
				draft.userMobileNoticeLoading = true;
				draft.userMobileNoticeError = null;
				draft.userMobileNoticeDone = false;
				break;
			case LOAD_NOTICE_LIST_SUCCESS:
				draft.userMobileNotice = draft.userMobileNotice.concat(action.data);
				draft.userMobileNoticeLoading = false;
				draft.userMobileNoticeDone = true;
				draft.hasMoreMoblieNotices = action.data.length === 10;
				break;
			case LOAD_NOTICE_LIST_FAILURE:
				draft.userMobileNoticeLoading = false;
				draft.userMobileNoticeError = action.error;
				break;
		}
	});

export default reducer;
