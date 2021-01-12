import React, { createContext } from "react";
import { useReducer } from "react";
import axios from "../../axios";
import { requests } from "../../requests";
import guestReducer from "./guestReducer";
import { guestAction } from "./guestAction";

const initialState = {
  guests: [],
  invitedOnly: false,
  editable: null,
};

export const guestContext = createContext(initialState);

const GuestProvider = ({ children }) => {
  const [state, dispatch] = useReducer(guestReducer, initialState);

  // Actions

  // Action for getting guest list
  const getGuests = () => {
    try {
      const userToken = localStorage.getItem("token");

      if (userToken) {
        axios
          .get(requests.getGuest, {
            headers: { authorization: `Bearer ${userToken}` },
          })
          .then((result) => {
            if (result) {
              if (result.data.success) {
                dispatch({
                  type: guestAction.GET_GUESTS,
                  payload: result.data.guests,
                });
              }
            }
          });
      }
    } catch (error) {
      throw error;
    }
  };

  // Action from add new guest
  const addGuest = (guest) => {
    try {
      const userToken = localStorage.getItem("token");

      if (userToken) {
        axios
          .post(
            requests.postGuest,
            { guest: guest },
            {
              headers: { authorization: `Bearer ${userToken}` },
            }
          )
          .then((result) => {
            if (result) {
              if (result.data.success) {
                dispatch({
                  type: guestAction.ADD_GUEST,
                  payload: result.data.guest,
                });
              }
            }
          });
      }
    } catch (error) {
      throw error;
    }
  };

  // Action for confirmation guest
  const confirmGuest = (id) => {
    try {
      const userToken = localStorage.getItem("token");

      if (userToken) {
        axios
          .put(
            `${requests.editConfirm}/${id}`,
            {},
            {
              headers: { authorization: `Bearer ${userToken}` },
            }
          )
          .then((result) => {
            console.log(result);
            if (result) {
              if (result.data.success) {
                dispatch({
                  type: guestAction.CONFIRMATION,
                  payload: id,
                });
              }
            }
          });
      }
    } catch (error) {
      throw error;
    }
  };

  // Action for active guests only
  function activeGuests(filter) {
    dispatch({
      type: guestAction.ACTIVE_ONLY,
      payload: filter,
    });
  }

  // Action for delete guest
  const deleteGuest = (id) => {
    try {
      const userToken = localStorage.getItem("token");

      if (userToken) {
        axios
          .delete(`${requests.deleteGuest}/${id}`, {
            headers: { authorization: `Bearer ${userToken}` },
          })
          .then((result) => {
            if (result) {
              if (result.data.success) {
                dispatch({
                  type: guestAction.DELETE_GUEST,
                  payload: id,
                });
              }
            }
          });
      }
    } catch (error) {
      throw error;
    }
  };

  // Action for get guest for edit
  const editGuest = (guest) => {
    dispatch({
      type: guestAction.EDIT_GUEST,
      payload: guest,
    });
  };

  // Action for clear editable
  const clearEdit = () => {
    dispatch({
      type: guestAction.CLEAR_EDIT,
    });
  };

  // Action for update guest
  const updateGuest = (guest) => {
    try {
      const userToken = localStorage.getItem("token");

      if (userToken) {
        axios
          .patch(
            `${requests.editGuest}/${guest._id}`,
            {
              guest,
            },
            {
              headers: { authorization: `Bearer ${userToken}` },
            }
          )
          .then((result) => {
            console.log(result);
            if (result) {
              if (result.data.success) {
                dispatch({
                  type: guestAction.UPDATE_GUEST,
                  payload: guest,
                });
              }
            }
          });
      }
    } catch (error) {
      throw error;
    }
  };

  // Action for clear user data
  const clearUserData = () => {
    dispatch({
      type: guestAction.CLEAR_USER_DATA,
    });
  };

  return (
    <guestContext.Provider
      value={{
        guests: state.guests,
        invitedOnly: state.invitedOnly,
        editable: state.editable,
        getGuests,
        addGuest,
        confirmGuest,
        activeGuests,
        deleteGuest,
        editGuest,
        clearEdit,
        updateGuest,
        clearUserData,
      }}
    >
      {children}
    </guestContext.Provider>
  );
};

export default GuestProvider;
