import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  loading: false,
  error: undefined,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.GOOGLE_SIGNIN_SUCCESS:
    case UserActionTypes.EMAIL_SIGNIN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
        error: undefined,
      };
    case UserActionTypes.GOOGLE_SIGNIN_FAIL:
    case UserActionTypes.EMAIL_SIGNIN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
