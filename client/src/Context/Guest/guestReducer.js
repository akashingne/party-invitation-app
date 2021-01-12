import { guestAction } from "./guestAction";

const guestReducer = (state, { type, payload }) => {
  // console.log("guests", state.guests);
  switch (type) {
    case guestAction.GET_GUESTS:
      return {
        ...state,
        guests: payload,
      };

    case guestAction.ADD_GUEST:
      return {
        ...state,
        guests: [...state.guests, payload],
      };

    case guestAction.CONFIRMATION:
      const findGuest = state.guests.find((guest) => guest._id === payload);

      const updatedGuest = {
        _id: payload,
        name: findGuest.name,
        mobile: findGuest.mobile,
        dietary: findGuest.dietary,
        isConfirm: !findGuest.isConfirm,
      };

      const confirmGuest = state.guests.map((guest) => {
        if (guest._id === payload) {
          return updatedGuest;
        }
        return guest;
      });
      return {
        ...state,
        guests: confirmGuest,
      };

    case guestAction.ACTIVE_ONLY:
      return {
        ...state,
        invitedOnly: payload,
      };

    case guestAction.DELETE_GUEST:
      return {
        ...state,
        guests: state.guests.filter((guest) => guest._id !== payload),
      };

    case guestAction.EDIT_GUEST:
      return {
        ...state,
        editable: payload,
      };

    case guestAction.CLEAR_EDIT:
      return {
        ...state,
        editable: null,
      };

    case guestAction.UPDATE_GUEST:
      return {
        ...state,
        guests: state.guests.map((guest) =>
          guest._id === payload._id ? payload : guest
        ),
      };

    case guestAction.CLEAR_USER_DATA:
      return {
        ...state,
        guests: [],
        invitedOnly: false,
        editable: null,
      };

    default:
      return state;
  }
};

export default guestReducer;
