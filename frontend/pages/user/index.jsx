import Account from "../../components/profile/Account";
import PastReservation from "../../components/profile/PastReservation";
import UserReservation from "../../components/profile/UserReservation";
import Support from "../../components/profile/Support";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import HamburgerMenu from "../../components/ui/HamburgerMenu";

import {
  GrFolder,
  GrCircleQuestion,
  GrCar,
  GrUser,
  GrMenu,
} from "react-icons/gr";
import ProfileMenu from "../../components/uibasic/ProfileMenu";
import Cookies from "js-cookie";
import { useGetUserQuery } from "../slices/userApi";
import UserImage from "../../components/ui/UserImage";

const Index = () => {
  const [tabs, setTabs] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const { data: user, refetch } = useGetUserQuery(Cookies.get("userId"));
  const profileImage = user?.userImages.filter(
    (x) => x.isActive == true && x.fileDescription === "Profil Fotoğrafı"
  );

  return (
    <div className=" h-min-[100vh] pb-14 w-screen relative lg:bg-white/70 bg-white rounded-[10px] md:flex pt-14 ">
      <div className="relative md:h-[380px] md:left-10 border-r-2 flex-shrink-0 md:pr-10 border-x-zinc-100 items-center flex md:flex-col justify-center gap-x-20 ">
        <div className="flex flex-col items-center">
          <span className=" mt-2 flex flex-col gap-1 items-center justify-center">
            {profileImage?.[0] ? (
              <UserImage imagePath={profileImage?.[0].path} />
            ) : (
              <Image
                width={100}
                height={100}
                src="/element/profileNull.png"
                alt="User Image"
                fetchpriority="high"
                className="object-cover rounded-full sm:w-20 sm:h-20 w-14 h-14"
              />
            )}
            <span className="flex gap-1">
              <p className="profile-Text">{user?.name}</p>
              <p className="profile-Text">{user?.surname}</p>
            </span>
          </span>
          <p className="profile-Text">{user?.sicil}</p>
        </div>
        <div className=" justify-center items-center absolute right-14 top-5 cursor-pointer flex md:hidden">
          <span className="carcardAnimate2 absolute opacity-10 z-10" />
          <GrMenu
            onClick={() => setIsOpen(true)}
            className=" ico-navbar z-20"
          />
        </div>
        <ul className="w-30 mt-10 md:block hidden border-t border-r-2 pr-24 pt-12 border-x-zinc-100">
          <li
            className={`profile-Link ${tabs === 0 && " profile-Click"}`}
            onClick={() => setTabs(0)}
          >
            <GrCar />
            <span className=" profile-Text"> Randevular </span>
          </li>
          <li
            className={`profile-Link ${tabs === 1 && " profile-Click"}`}
            onClick={() => setTabs(1)}
          >
            <GrFolder />
            <span className=" profile-Text">geçmiş işlemler</span>
          </li>
          <li
            className={`profile-Link ${tabs === 2 && " profile-Click"}`}
            onClick={() => setTabs(2)}
          >
            <GrUser />
            <span className=" profile-Text">Profil düzenle</span>
          </li>
          <li
            className={`profile-Link ${tabs === 3 && "profile-Click"}`}
            onClick={() => setTabs(3)}
          >
            <GrCircleQuestion />
            <span className=" profile-Text"> Destek </span>
          </li>
        </ul>
      </div>

      <div className="md:ml-20 p-4 w-full overflow-x-auto scroll">
        {tabs === 0 && <UserReservation />}
        {tabs === 1 && <PastReservation />}
        {tabs === 2 && <Account />}
        {tabs === 3 && <Support />}
      </div>
      <HamburgerMenu
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        menuComponent={<ProfileMenu />}
      />
    </div>
  );
};

export default Index;
