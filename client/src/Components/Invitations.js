import React, { useContext } from "react";

import "../Assets/CSS/Invitations.css";
import Invitation from "./Invitation";
import { guestContext } from "../Context/Guest/guestProvider";

const Invitations = () => {
  const { guests, invitedOnly } = useContext(guestContext);

  const filteredGuests = invitedOnly
    ? guests?.filter((guest) => guest.isConfirm === true)
    : guests;

  return (
    <div className="invitations">
      <div className="invitations_wrap">
        {filteredGuests.length > 0
          ? filteredGuests?.map((guest) => (
              <Invitation key={guest?._id} guest={guest} />
            ))
          : "No guest available...!"}
      </div>
    </div>
  );
};

export default Invitations;
