import React, { useEffect, useState } from "react";
import { AllProporties } from "../../components/adminplus/AllProporties";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
const Index = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const rol = Cookies.get("roles");
    setIsAdmin(rol && rol.includes("admin"));
  }, []);
  return (
    <div className=" bg-white h-full w-full py-10">
      {isAdmin && <AllProporties />}
      <ToastContainer draggable={true} />
    </div>
  );
};

export default Index;
