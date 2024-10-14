"use client";

import React, { useState } from "react";
import ConfirmationReservation from "../../components/admin/ConfirmationReservation";
import AdminPastReservation from "../../components/admin/AdminPastReservation";
import Adminlinkedin from "../../components/admin/Adminlinkedin";
import UploadForm from "../../components/admin/UploadForm";
import AddCar from "../../components/admin/AddCar";

import {
  GrMap,
  GrCar,
  GrDocumentTime,
  GrDocumentText,
  GrHostMaintenance,
} from "react-icons/gr";

const AdminMenu = () => {
  const [tabs, setTabs] = useState();

  const renderContent = () => {
    switch (tabs) {
      case "confirmation":
        return <ConfirmationReservation />;
      case "admin":
        return <AdminPastReservation />;
      case "addcar":
        return <AddCar />;
      case "lorem ipsum":
        return <Adminlinkedin />;
      case "upload":
        return <UploadForm />;
      default:
        return <ConfirmationReservation />;
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
            tabs === "confirmation" ? "  profile-Click" : ""
          }`}
          onClick={() => handleTabClick("confirmation")}
        >
          <GrCar />
          <span className="profile-Text"> Randevular </span>
        </li>
        <li
          className={`profile-Link ${
            tabs === "admin" ? "  profile-Click" : ""
          }`}
          onClick={() => handleTabClick("admin")}
        >
          <GrDocumentTime />
          <span className="profile-Text"> geçmiş işlemler </span>
        </li>

        <li
          className={`profile-Link ${
            tabs === "addcar" ? "  profile-Click" : ""
          }`}
          onClick={() => handleTabClick("addcar")}
        >
          <GrHostMaintenance />
          <span className="profile-Text"> araç yönetimi </span>
        </li>
        <li
          className={`profile-Link ${
            tabs === "linkedin" ? "  profile-Click" : ""
          }`}
          onClick={() => handleTabClick("linkedin")}
        >
          <GrMap />
          <span className="profile-Text"> Filo izleme </span>
        </li>
        <li
          className={`profile-Link ${
            tabs === "upload" ? "  profile-Click" : ""
          }`}
          onClick={() => handleTabClick("upload")}
        >
          <GrDocumentText />
          <span className="profile-Text"> raporlama </span>
        </li>
      </ul>
      <div>{renderContent()}</div>
    </div>
  );
};
export default AdminMenu;
