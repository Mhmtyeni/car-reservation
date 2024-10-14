import React from "react";
import Image from "next/image";
import TextHeader from "../textcustom/TextHeader";

const ReservationCustomR = ({ car, endDate, startDate }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-0 z-[999]">
        <TextHeader>Alış Tarihi :{startDate}</TextHeader>
        <TextHeader>Bırakış Tarihi :{endDate}</TextHeader>
      </div>
      <div className=" relative h-[800px] w-full items-center flex justify-center ">
        <div className="absolute h-[520px] w-[300px] mb-24 ">
          <Image src="/images/homeScreenCar.png" alt="" fill />
          <div className="reservationCarCard reservationCarCard1">
            <h3 className=" text-zinc-100/50 text-sm">KAPASİTE</h3>
            <p>{car.carCapacity} KİŞİ</p>
          </div>
          <div className="reservationCarCard reservationCarCard2">
            <h3 className=" text-zinc-100/50 text-sm">SÜRÜŞ</h3>
            {car.carGearType ? <p>Auto</p> : <p>Manuel</p>}
          </div>
          <div className="reservationCarCard reservationCarCard3">
            <h3 className=" text-zinc-100/50 text-sm">YAKIT TÜRÜ</h3>
            <p>{car.carEngineTypeName} </p>
          </div>
        </div>
        <div className="absolute w-[600px] h-[600px] reservationCarMap ">
          <Image src="/element/map.svg" alt="" fill />
        </div>
      </div>
    </div>
  );
};

export default ReservationCustomR;
