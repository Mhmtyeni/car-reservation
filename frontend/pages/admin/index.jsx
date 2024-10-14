import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  GrCar,
  GrDocumentTime,
  GrDocumentText,
  GrMenu,
  GrMap,
  GrHostMaintenance,
  GrRedo,
} from "react-icons/gr";
import AddCar from "../../components/admin/AddCar";
import UploadForm from "../../components/admin/UploadForm";
import ConfirmationReservation from "../../components/admin/ConfirmationReservation";
import AdminPastReservation from "../../components/admin/AdminPastReservation";
import Adminlinkedin from "../../components/admin/AdminLinkedin";
import HamburgerMenu from "../../components/ui/HamburgerMenu";
import AdminMenu from "../../components/uibasic/AdminMenu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddPassiveCar from "../../components/admin/AddPassiveCar";
import AddDeleteCar from "../../components/admin/AddDeleteCar";

const Index = () => {
  const router = useRouter();
  const { tab } = router.query;
  const [tabs, setTabs] = useState(Number(tab) || 0);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (tab) {
      setTabs(Number(tab));

      if (Number(tab) === 2 || Number(tab) === 3 || Number(tab) === 4) {
        setIsSubMenuOpen(true);
      } else {
        setIsSubMenuOpen(false);
      }
    }
  }, [tab]);

  const handleAdminCLick = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };
  const handleTabClick = (index) => {
    setTabs(index);

    router.push(`/admin?tab=${index}`);
  };

  return (
    <div className=" h-min-[100vh] pb-14 w-screen relative lg:bg-white/70 bg-white rounded-[10px] md:flex pt-14 ">
      <div className="relative md:h-[460px] md:left-10 border-r-2 flex-shrink-0 md:pr-10 border-x-zinc-100 items-center flex md:flex-col justify-center gap-x-20 ">
        <div className="flex flex-col items-center">
          <Image
            src="/element/client1.jpg"
            alt=""
            height={80}
            width={80}
            className="object-cover rounded-full md:h-20 md:w-20 h-10 w-10"
          />
          <span className="mt-2 profile-Text"> admin </span>
        </div>
        <div className="justify-center items-center absolute right-14 top-5 cursor-pointer flex md:hidden">
          <span className="carcardAnimate2 absolute opacity-10 z-10" />
          <GrMenu onClick={() => setIsOpen(true)} className="ico-navbar z-20" />
        </div>
        <ul className="w-full mt-10 md:block hidden border-t border-r-2 pr-24 pt-12 border-x-zinc-100">
          <li
            className={`profile-Link ${tabs === 0 && "profile-Click"}`}
            onClick={() => handleTabClick(0)}
          >
            <GrCar />
            <span className="profile-Text"> Randevular </span>
          </li>
          <li
            className={`profile-Link ${tabs === 1 && "profile-Click"}`}
            onClick={() => handleTabClick(1)}
          >
            <GrDocumentTime />
            <span className="profile-Text"> geçmiş işlemler </span>
          </li>

          <li
            className={`profile-Link  ${tabs === 7 && "profile-Click"}`}
            onClick={() => handleAdminCLick()}
          >
            <GrHostMaintenance />
            <span className="profile-Text"> araç yönetimi </span>
          </li>
          {isSubMenuOpen && (
            <ul className="ml-4">
              <li
                className={`profile-Link ${tabs === 2 && "profile-Click"}`}
                onClick={() => handleTabClick(2)}
              >
                <GrRedo />
                <span className="profile-Text"> Aktif Araçlar </span>
              </li>
              <li
                className={`profile-Link ${tabs === 3 && "profile-Click"}`}
                onClick={() => handleTabClick(3)}
              >
                <GrRedo />
                <span className="profile-Text"> Pasif Araçlar </span>
              </li>
              <li
                className={`profile-Link ${tabs === 4 && "profile-Click"}`}
                onClick={() => handleTabClick(4)}
              >
                <GrRedo />
                <span className="profile-Text"> Silinmiş Araçlar </span>
              </li>
            </ul>
          )}
          <li
            className={`profile-Link-linkedin ${
              tabs === 5 && "profile-Click-linkedin "
            }`}
            onClick={() => handleTabClick(5)}
          >
            <GrMap />
            <span className="profile-Text"> Filo izleme </span>
          </li>
          <li
            className={`profile-Link ${tabs === 6 && "profile-Click"}`}
            onClick={() => handleTabClick(6)}
          >
            <GrDocumentText />
            <span className="profile-Text"> raporlama </span>
          </li>
        </ul>
      </div>
      <div className="md:ml-20 p-4 w-full overflow-x-auto scroll">
        {tabs === 0 && <ConfirmationReservation />}
        {tabs === 1 && <AdminPastReservation />}
        {tabs === 2 && <AddCar />}
        {tabs === 3 && <AddPassiveCar />}
        {tabs === 4 && <AddDeleteCar />}
        {tabs === 5 && <Adminlinkedin />}
        {tabs === 6 && <UploadForm />}
      </div>
      <HamburgerMenu
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        menuComponent={<AdminMenu />}
      />

      <ToastContainer draggable={true} />
    </div>
  );
};

export default Index;
