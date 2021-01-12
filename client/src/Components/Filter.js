import { FormGroup, Switch, TextField } from "@material-ui/core";
import React, { useContext, useRef } from "react";

import "../Assets/CSS/Filter.css";
import { guestContext } from "../Context/Guest/guestProvider";

const Filter = () => {
  const { invitedOnly, activeGuests } = useContext(guestContext);

  return (
    <div className="filter">
      <div className="filter_switch">
        <Switch
          checked={invitedOnly}
          onChange={() => activeGuests(!invitedOnly)}
        />
        <span>Show only invited</span>
      </div>
      {/* <FormGroup>
        <TextField
          type="text"
          className="filter_by"
          label="Search by charecters"
          variant="outlined"
        />
      </FormGroup> */}
    </div>
  );
};

export default Filter;
