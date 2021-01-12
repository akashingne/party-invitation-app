import React from "react";

import "../Assets/CSS/Home.css";
import Filter from "../Components/Filter";
import Header from "../Components/Header";
import Invitations from "../Components/Invitations";
import PartyForm from "../Components/PartyForm";
import PartyTable from "../Components/PartyTable";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <div className="container">
        <div className="home_top">
          <Filter />
          <PartyForm />
          <PartyTable />
        </div>
        <div className="home_bottom">
          <Invitations />
        </div>
      </div>
    </div>
  );
};

export default Home;
