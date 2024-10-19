import { UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE, RESET_PROFILE_DATA } from './action';

const initialState = {
  profileData: null,
  loading: false,
  error: null,
  msg:null
};

export const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    // case FETCH_DATA_PROFILE_REQUEST:
    //   return { ...state, loading: true, error: null };
    // case FETCH_DATA_PROFILE_SUCCESS:
    //   return { ...state, loading: false, profileData: action.payload,msg:null };
    // case FETCH_DATA_PROFILE_FAILURE:
    //   return { ...state, loading: false, error: action.payload };
    case UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_PROFILE_SUCCESS:
      return { ...state, loading: false, profileData: action.payload.statusCode==0?action.payload.requestData:null,msg:action.payload.statusCode==0?'Profile updated Successfully':action.payload.message };
    case RESET_PROFILE_DATA:
      return { ...state, loading: false, profileData: null };
    case UPDATE_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// export const UpdateProfileReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case UPDATE_PROFILE_REQUEST:
//       return { ...state, loading: true, error: null };
//     case UPDATE_PROFILE_SUCCESS:
//       return { ...state, loading: false, updateprofile: action.payload };
//     case RESET_PROFILE_DATA:
//       return { ...state, loading: false, updateprofile: '' };
//     case UPDATE_PROFILE_FAILURE:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };