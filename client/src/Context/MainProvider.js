import React from "react";
import GuestProvider from "./Guest/guestProvider";
import UserProvider from "./User/userProvider";

const MainProvider = ({ children }) => {
  return (
    <UserProvider>
      <GuestProvider>{children}</GuestProvider>
    </UserProvider>
  );
};

export default MainProvider;
