import React, { createContext } from "react";
import { useReducer } from "react";
import axios from "../../axios";
import { requests } from "../../requests";
import { userAction } from "./userAction";
import userReducer from "./userReducer";

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  message: "",
};

export const userContext = createContext(initialState);

const GuestProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Actions

  // Action for login user
  const loginUser = (user) => {
    try {
      axios.post(requests.signIn, { user: user }).then((result) => {
        console.log(result);
        if (result) {
          if (result.data.success) {
            localStorage.setItem("token", result.data.token);
            dispatch({
              type: userAction.LOGIN_SUCCESS,
              payload: result.data.user,
            });
          } else {
            dispatch({
              type: userAction.LOGIN_FAIL,
              payload: result.data.message,
            });
          }
        }
      });
    } catch (error) {
      dispatch({
        type: userAction.LOGIN_FAIL,
        payload: error,
      });
    }
  };

  // Action for logout user
  const logoutUser = () => {
    localStorage.removeItem("token");
    dispatch({
      type: userAction.LOGOUT_SUCCESS,
    });
  };

  // Action for Register user
  const registerUser = (user) => {
    try {
      axios.post(requests.signUp, { user: user }).then((result) => {
        if (result) {
          console.log(result);
          if (result.data.success) {
            localStorage.setItem("token", result.data.token);
            dispatch({
              type: userAction.REGISTER_SUCCESS,
              payload: result.data.user,
            });
          } else {
            dispatch({
              type: userAction.REGISTER_FAIL,
              payload: result.data.message,
            });
          }
        }
      });
    } catch (error) {
      dispatch({
        type: userAction.REGISTER_FAIL,
        payload: error,
      });
    }
  };

  // Action for getting user
  const getUser = () => {
    try {
      const userToken = localStorage.getItem("token");

      if (userToken) {
        axios
          .get(requests.getUser, {
            headers: { authorization: `Bearer ${userToken}` },
          })
          .then((result) => {
            if (result) {
              if (result.data.user) {
                dispatch({
                  type: userAction.USER_LOADED,
                  payload: result.data.user,
                });
              }
            }
          });
      }
    } catch (error) {
      dispatch({
        type: userAction.AUTH_ERROR,
        payload: error,
      });
    }
  };

  return (
    <userContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        message: state.message,
        loginUser,
        logoutUser,
        registerUser,
        getUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default GuestProvider;
