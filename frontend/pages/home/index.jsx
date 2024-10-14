import React, { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { DatePicker } from "../../components/ui/DatePicker";
import { TimeFlatpickr } from "../../components/ui/TimeFlatpicker";
import { InfiniteMovingCardsDemo } from "../../components/carousel/SliderCardMovie";
import LocationPicker from "../../components/ui/LocationPicker";
import CarTypePicker from "../../components/ui/CarTypePicker";
import Cookies from "js-cookie";
import { notify } from "../../utils/notifications";

const Index = () => {
  const [startLocationId, setStartLocationId] = useState("");
  const [endLocationId, setEndLocationId] = useState("");
  const [carTypeId, setCarTypeId] = useState("");
  const router = useRouter();
  const timeNow = new Date().getHours() + 1;
  const timeNowEnd = new Date().getHours() + 2;
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const rol = Cookies.get("roles");
    setIsAdmin(rol && rol.includes("admin"));
  }, []);

  const [selectedDate, setSelectedDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [selectedTime, setSelectedTime] = useState({
    startTime: timeNow + ":00",
    endTime: timeNowEnd + ":00",
  });

  const handleStartLocationChange = (id) => {
    setStartLocationId(id);
    setEndLocationId(id);
  };
  const handleCarTypeSelect = (id) => {
    setCarTypeId(id);
  };
  const handleReserve = () => {
    const startD = selectedDate.startDate.toISOString().split("T")[0];
    const endD = selectedDate.endDate.toISOString().split("T")[0];
    const startTime = selectedTime.startTime;
    const endTime = selectedTime.endTime;

    const startLocation = startLocationId;
    const endLocation = endLocationId;
    const finalCarTypeId = carTypeId || "a980981a-0d18-4f06-93e8-08dcd30e6e05";
    const startDate = startD + " " + startTime;
    const endDate = endD + " " + endTime;
    if (startTime > endTime) {
      notify.error();
    } else {
      router.push(
        `/reservation?startDate=${startDate}&endDate=${endDate}&startLocationId=${startLocation}&endLocationId=${endLocation}&CarTypeId=${finalCarTypeId}`
      );
    }
  };

  return (
    <main className="relative h-full w-full flex flex-col items-center justify-between pt-24 pr-24 pl-24 overflow-hidden">
      <div className="sticky container h-full w-full mx-auto flex">
        <div className="calendarBox-home lg:flex flex-wrap gap-x-8 ">
          {isAdmin && (
            <CarTypePicker
              onSelectCarType={handleCarTypeSelect}
              value={carTypeId}
            />
          )}
          <div className="lg:flex flex-wrap lg:-mt-20 gap-2">
            <div className="flex lg:flex-col lg:mt-10 gap-2 ">
              <LocationPicker
                description={"alış yeri"}
                onSelect={handleStartLocationChange}
                value={startLocationId}
                setStartLocationId={setStartLocationId}
              />
              <LocationPicker
                description={"bırakış yeri"}
                value={endLocationId}
                isDisabled={true}
                setEndLocationId={setEndLocationId}
              />
            </div>

            <div className="flex lg:flex-col mt-10 gap-2 "></div>
            <div className="lg:mt-10 ">
              <DatePicker setSelectedDate={setSelectedDate} />
            </div>
            <div className="flex lg:flex-col mt-10 gap-2 ">
              <TimeFlatpickr
                selectedTimeKey="startTime"
                setSelectedTime={setSelectedTime}
                placeholder={selectedTime.startTime}
                description={"alış saati"}
              />
              <TimeFlatpickr
                selectedTimeKey="endTime"
                setSelectedTime={setSelectedTime}
                placeholder={selectedTime.endTime}
                description={"bırakış saati"}
              />
            </div>
          </div>
          <button onClick={handleReserve} className="button lg:-mt-20">
            rezerve et
          </button>
        </div>
        <div>
          <div className="shape-home">
            <Image
              src="/images/Shape.svg"
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              alt=""
            />
          </div>
          <div className="araba-home ">
            <div className="araba-home-motion">
              <Link
                rel="preload"
                href="/images/homeScreenCarRed.png"
                as="image"
                media="(max-width: 768px) 100vw, 700px"
              />
              <Image
                src="/images/homeScreenCarRed.png"
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="relative lg:mt-32 sm:mt-60 mt-8">
        <InfiniteMovingCardsDemo />
      </div>
    </main>
  );
};

export default Index;
