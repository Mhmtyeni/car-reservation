import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { AddProporties, BentoGridItem } from "../ui/AddProporties";
import { motion } from "framer-motion";

import AddCarModel from "./AddCarModel";
import AddCarBrand from "./AddCarBrand";
import AssignRole from "./AssignRole";
import AssignUserRole from "./AssignUserRole";
import AddCarLocation from "./AddCarLocation";
import AddCarCompanies from "./AddCarCompanies";
import AddCarEngineType from "./AddCarEngineType";
import AddCarType from "./AddCarType";
import AllUsers from "./AllUsers";
import AllReservationStatuses from "./AllReservationStatuses";
import AddCarCaseType from "../admin/AddCarCaseType";
import AllRolesList from "../../pages/db/allRolesDB/AllRolesList";
import Cookies from "js-cookie";

export function AllProporties() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const rol = Cookies.get("roles");
    setIsAdmin(rol && rol.includes("admin"));
  }, []);

  return (
    <AddProporties className="max-w-4xl mx-auto">
      {items
        // .filter((item) =>
        //   item.roles ? item.roles.some((role) => rol.includes(role)) : true
        // )
        //EN AZ BİR ÖGE VARSA ---> SOME
        //ROLE ÖGESİ İÇİNDE VARSA TRUE DÖNER ---> INCLUDES

        .map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            component={item.component}
            className={i === 0 || i === 8 ? "md:col-span-2 " : ""}
          />
        ))}
    </AddProporties>
  );
}
const Skeleton = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.8,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 20,
      },
    },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      {arr.map((_, i) => (
        <motion.div
          key={"skelenton" + i}
          variants={variants}
          style={{
            maxWidth: Math.random() * (100 - 40) + 40 + "%",
          }}
          className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-redColor/20 dark:bg-black w-full h-4"
        ></motion.div>
      ))}
    </motion.div>
  );
};

const items = [
  {
    title: "Add Role to Endpoint",
    description: "Araba ekleyiniz.",
    header: <Skeleton />,
    component: AssignRole,
    roles: ["Admin"],
  },
  {
    title: "Add User to Role",
    description: "Tüm araba markalarını görüntüleyiniz.",
    header: <Skeleton />,
    component: AssignUserRole,
    roles: ["Admin"],
  },
  {
    title: "Add Car Brand",
    description: "Tüm araba modellerini görüntüleyiniz.",
    header: <Skeleton />,
    component: AddCarBrand,
    roles: ["Admin"],
  },
  {
    title: "Add Car Model",
    description: "Tüm araba modellerini görüntüleyiniz.",
    header: <Skeleton />,
    component: AddCarModel,
    roles: ["Admin"],
  },
  {
    title: "Add Car Engine Type",
    description: "Tüm araba motor tiplerini görüntüleyiniz.",
    header: <Skeleton />,
    component: AddCarEngineType,
    roles: ["Admin"],
  },
  {
    title: "Add Car Type (VIP/ HAVUZ)",
    description: "Tüm araba tiplerini görüntüleyiniz.",
    header: <Skeleton />,
    component: AddCarType,
    roles: ["Admin"],
  },
  {
    title: "Add Car Case Type",
    description: "Tüm araba kasa tiplerini görüntüleyiniz.",
    header: <Skeleton />,
    component: AddCarCaseType,
    roles: ["Admin"],
  },
  {
    title: "Add Car Location",
    description: "Arabalara sahip lokasyonları görüntüleyiniz.",
    header: <Skeleton />,
    component: AddCarLocation,
    roles: ["Admin"],
  },
  {
    title: "Add Car Companies",
    description: "Arabalara sahip şirketleri görüntüleyiniz.",
    header: <Skeleton />,
    component: AddCarCompanies,
    roles: ["Admin"],
  },
  {
    title: "Car Reservation Status",
    description: "Rezervasyon durumları için seçenekleri görüntüleyiniz.",
    header: <Skeleton />,
    component: AllReservationStatuses,
    roles: ["Admin"],
  },
  {
    title: "USERS",
    description: "Tüm kullanıcıları görüntüleyiniz.",
    header: <Skeleton />,
    component: AllUsers,
    roles: ["Admin"],
  },
  {
    title: "Users Roles",
    description: "Tüm kullanıcılara verdiğiniz rolleri görüntüleyiniz.",
    header: <Skeleton />,
    component: AllRolesList,
    roles: ["Admin"],
  },
];
