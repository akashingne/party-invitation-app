import { userAction } from "./userAction";

const userReducer = (state, { type, payload }) => {
  switch (type) {
    case userAction.USER_LOADED:
    case userAction.REGISTER_SUCCESS:
    case userAction.LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        message: "",
      };

    case userAction.REGISTER_FAIL:
    case userAction.AUTH_ERROR:
    case userAction.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        message: payload,
      };

    case userAction.LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        message: "",
      };

    default:
      return state;
  }
};

export default userReducer;
