"use client";
import React from "react";
import CarList from "../../pages/db/allCarDB/CarList";

const AddCar = () => {
  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5 bg-white h-full ">
      <div className=" grid gap-4 mt-6">
        <CarList />
      </div>
    </div>
  );
};

export default AddCar;
