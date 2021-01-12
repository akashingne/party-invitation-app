import { Call, CheckBox, Delete, Edit } from "@material-ui/icons";
import React, { useContext } from "react";
import alertify from "alertifyjs";

import "../Assets/CSS/Invitation.css";
import { guestContext } from "../Context/Guest/guestProvider";

const Invitation = ({ guest }) => {
  const { confirmGuest, deleteGuest, editGuest, editable } = useContext(
    guestContext
  );
  const { _id, name, mobile, dietary, isConfirm } = guest;

  const handleConfirmation = () => {
    confirmGuest(_id);
  };

  const handleEdit = () => {
    editGuest(guest);
  };

  const handleDelete = () => {
    alertify.confirm(
      "Are you sure to delete",
      () => {
        deleteGuest(_id);
        alertify.success(`ok ${_id}`);
      },
      () => {
        alertify.error("cancle");
      }
    );
  };

  return (
    <div className="invitation">
      <div className={`invitation_wrap ${editable ? "disable_wrapper" : ""}`}>
        <div className="invitation_header">
          <div className="invitation_header_left">
            <span>Confirmed</span>
            <CheckBox
              className={isConfirm ? "invitation_confirmation" : null}
              onClick={handleConfirmation}
            />
          </div>
          <div className="invitation_header_right">
            <Edit
              className="invitation_header_right_edit"
              onClick={handleEdit}
            />
            <Delete
              className="invitation_header_right_delete"
              onClick={handleDelete}
            />
          </div>
        </div>
        <div className="invitation_body">
          <span className={`${dietary === "Veg" ? "vegDiet" : "non-VegDiet"}`}>
            {dietary}
          </span>
          <div className="invitation_body_main">
            <h2>{name}</h2>
            <p>
              <Call /> {mobile}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invitation;
