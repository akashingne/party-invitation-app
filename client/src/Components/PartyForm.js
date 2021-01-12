import {
  Button,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import alertify from "alertifyjs";
import { guestContext } from "../Context/Guest/guestProvider";

import "../Assets/CSS/PartyForm.css";

const PartyForm = () => {
  const { addGuest, editable, clearEdit, updateGuest } = useContext(
    guestContext
  );
  const [isValidMobile, setIsValidMobile] = useState(null);
  // const [errorMsg, setErrorMsg] = useState("");
  const [guest, setGuest] = useState({
    _id: 5,
    name: "",
    mobile: "",
    dietary: "Veg",
    isConfirm: false,
  });

  useEffect(() => {
    if (editable !== null) {
      setGuest(editable);
    } else {
      setGuest({
        _id: 5,
        name: "",
        mobile: "",
        dietary: "Veg",
        isConfirm: false,
      });
    }
  }, [editable]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidMobile) {
      addGuest(guest);
      setGuest({ name: "", mobile: "", dietary: "Veg", isConfirm: false });
      setIsValidMobile(null);
      alertify.success("Guest edited");
      // setErrorMsg("");
    } else {
      alertify.error("Invalid mobile number");
    }
  };

  const handleUpdate = () => {
    if (isValidMobile) {
      updateGuest(guest);
      clearEdit();
      setIsValidMobile(null);
      alertify.success("Guest created");
    } else {
      alertify.error("Invalid mobile number");
    }
  };

  const handleCancel = () => {
    setGuest({ name: "", mobile: "", dietary: "Veg", isConfirm: false });
    clearEdit();
  };

  const handleMobileNumber = (e) => {
    console.log("hello");
    const mobileNumberPattern = /^[0-9]{10}$/;
    if (mobileNumberPattern.test(guest.mobile)) {
      setIsValidMobile(true);
    } else {
      setIsValidMobile(false);
    }
  };

  return (
    <div className="partyForm">
      <div className="partyForm_main">
        <h2>Invite Someone</h2>
        <form>
          <FormGroup>
            <TextField
              onChange={(e) => setGuest({ ...guest, name: e.target.value })}
              type="text"
              label="Enter Name"
              variant="outlined"
              value={guest?.name}
              required
            />
            <TextField
              onChange={(e) => setGuest({ ...guest, mobile: e.target.value })}
              onKeyUp={handleMobileNumber}
              id="mobile"
              type="text"
              label="Enter Mobile Number"
              variant="outlined"
              color={`${isValidMobile === false ? "secondary" : "primary"}`}
              value={guest?.mobile}
              required
            />
          </FormGroup>
          <FormLabel component="legend">Dietary</FormLabel>
          <RadioGroup
            name="dietary"
            value={guest?.dietary}
            onChange={(e) => setGuest({ ...guest, dietary: e.target.value })}
            // onChange={(event) => setDietary(event.target.value)}
          >
            <FormControlLabel value="Veg" control={<Radio />} label="Veg" />
            <FormControlLabel
              value="Non-Veg"
              control={<Radio />}
              label="Non-Veg"
            />
          </RadioGroup>
          {editable === null ? (
            <FormGroup>
              <Button
                onClick={handleSubmit}
                type="button"
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </FormGroup>
          ) : (
            <FormGroup>
              <Button
                onClick={handleUpdate}
                type="button"
                className="mr-2"
                variant="contained"
                color="primary"
              >
                Edit
              </Button>
              <Button
                type="button"
                onClick={handleCancel}
                variant="contained"
                color="primary"
              >
                Calcel
              </Button>
            </FormGroup>
          )}
        </form>
      </div>
    </div>
  );
};

export default PartyForm;
