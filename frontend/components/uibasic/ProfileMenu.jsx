"use client";

import React, { useState } from "react";
import Account from "../../components/profile/Account";
import PastReservation from "../../components/profile/PastReservation";
import UserReservation from "../../components/profile/UserReservation";
import Support from "../../components/profile/Support";
import { GrFolder, GrCircleQuestion, GrCar, GrUser } from "react-icons/gr";

const ProfileMenu = () => {
  const [tabs, setTabs] = useState();

  const renderContent = () => {
    switch (tabs) {
      case "reservation":
        return <UserReservation />;
      case "past":
        return <PastReservation />;
      case "account":
        return <Account />;
      case "support":
        return <Support />;
      default:
        return <UserReservation />;
    }
  };
  const handleTabClick = (tab) => {
    setTabs(tab);
  };
  return (
    <div>
      <ul className="justify-center items-center flex flex-col border-x-zinc-100">
        <li
          className={`profile-Link ${
            tabs === "reservation" ? " profile-Click" : ""
          }`}
          onClick={() => handleTabClick("reservation")}
        >
          <GrCar />
          <span className=" profile-Text"> Randevular </span>
        </li>
        <li
          className={`profile-Link ${tabs === "past" ? " profile-Click" : ""}`}
          onClick={() => handleTabClick("past")}
        >
          <GrFolder />
          <span className=" profile-Text">geçmiş işlemler</span>
        </li>
        <li
          className={`profile-Link ${
            tabs === "account" ? " profile-Click" : ""
          }`}
          onClick={() => handleTabClick("account")}
        >
          <GrUser />
          <span className=" profile-Text">Profil düzenle</span>
        </li>
        <li
          className={`profile-Link ${
            tabs === "support" ? "profile-Click" : ""
          }`}
          onClick={() => handleTabClick("support")}
        >
          <GrCircleQuestion />
          <span className=" profile-Text"> Destek </span>
        </li>
      </ul>
      <div>{renderContent()}</div>
    </div>
  );
};

export default ProfileMenu;
