import React, { useContext } from "react";

import "../Assets/CSS/PartyTable.css";
import { guestContext } from "../Context/Guest/guestProvider";

const PartyTable = () => {
  const { guests } = useContext(guestContext);

  const totalInvited = guests?.length;
  const attendingAll = guests?.filter((guest) => guest.isConfirm === true);
  const totalAttending = attendingAll?.length;
  const invited = (type) =>
    guests?.filter((guest) => guest.dietary === type).length;
  const attending = (type) =>
    attendingAll?.filter((guest) => guest.dietary === type).length;

  return (
    <div className="partyTable">
      <div className="partyTable_mainTable">
        <table className="table">
          <thead>
            <tr>
              <th>Guest</th>
              <th>Invited</th>
              <th>Attending</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Veg</th>
              <td>{invited("Veg")}</td>
              <td>{attending("Veg")}</td>
            </tr>
            <tr>
              <th>Non-Veg</th>
              <td>{invited("Non-Veg")}</td>
              <td>{attending("Non-Veg")}</td>
            </tr>
            <tr>
              <th>Total</th>
              <td>{totalInvited}</td>
              <td>{totalAttending}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PartyTable;
