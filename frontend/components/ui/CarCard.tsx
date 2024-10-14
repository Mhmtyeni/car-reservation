import { Car, CarProps } from "../../types";
import Image from "next/image";
import { useState } from "react";
// import CarDetails from "./CarDetails";
import { motion } from "framer-motion";
import CarDetails from "./CarDetails";

interface CarCardProps {
  car: Car;
  startDate: string;
  endDate: string;
  startLocationId: string;
}

const CarCard = ({
  car,
  startDate,
  endDate,
  startLocationId,
}: CarCardProps) => {
  const { carLicensePlate, carCapacity, carEngineTypeName, carGearType } = car;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" sm:flex h-full w-full group items-center p-10 justify-center text-txt bg-white hover:bg-[#434343]/10 hover:shadow-md rounded-2xl">
      <div className="w-full flex justify-between items-start gap-2">
        <h2 className="text-[18px] leading-[26px] font-bold capitalize">
          {carLicensePlate}
        </h2>
      </div>
      <div className="relative w-full h-40 my-3 z-40">
        <div className="relative md:-translate-x-12 sm:-translate-x-14  min-[600px]:translate-x-40 translate-x-10 md:-translate-y-6 sm:-translate-y-5 md:h-56 h-52  md:w-56 w-52 ">
          <Image
            src="/auto/carReddYan.png"
            alt=" "
            priority
            fill
            fetchpriority="high"
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 700px"
          />
        </div>
        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(84deg) translateZ(0)",
          }}
          className="absolute md:left-16 sm:left-10 min-[600px]:left-64 left-36 sm:top-[100px] top-[116px] mt-4 -z-10 -translate-x-1/2 -translate-y-1/2"
        >
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 1,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 0,
              }}
              className="absolute left-1 md:h-[17rem] sm:h-[17rem] h-[17rem] md:w-[17rem] sm:w-[17rem] w-[17rem] rounded-[50%] bg-[#ffffff]/40 shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: -10,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 2,
              }}
              className="absolute left-1 top-1 md:h-[17rem] sm:h-[17rem] h-[17rem] md:w-[17rem] sm:w-[17rem] w-[17rem] rounded-[50%] bg-[#ffffff]/60 shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: -10,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 4,
              }}
              className="absolute left-1 top-5 md:h-[17rem] sm:h-[17rem] h-[17rem] md:w-[17rem] sm:w-[17rem] w-[17rem] rounded-[50%] bg-[#ffffff]/80 shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
          </>
        </div>
      </div>
      <div className="relative w-full flex mt-2">
        <div className="flex w-full text-gray justify-between group-hover:invisible">
          <div className="flex flex-col flex-shrink-0 justify-center items-center gap-2 ">
            <span className="carcardAnimate2 absolute -top-3 opacity-10" />
            <Image
              src="/auto/vehicle-driver.png"
              width={34}
              height={34}
              alt=""
              priority
              fetchpriority="high"
            />
            <p className="text-[14px] font-semibold capitalize">
              {carCapacity} kişi
            </p>
          </div>
          {/* kişi sayısı */}

          <div className=" flex flex-col flex-shrink-0 justify-center items-center gap-2 mt-1 ">
            <span className="carcardAnimate2 absolute -top-3 opacity-10 " />
            <Image
              src="/element/drivee.png"
              width={27}
              height={27}
              alt=""
              className=" z-10"
              priority
              fetchpriority="high"
            />
            <p className="text-[14px] font-semibold capitalize mt-[6px] z-10">
              {carGearType ? <p>Auto</p> : <p>Manuel</p>}
            </p>
          </div>
          {/*true === auto/ false === manuel */}

          <div className="flex flex-col flex-shrink-0 justify-center items-center gap-2">
            <span
              className={`carcardAnimate absolute bottom-2 ${
                carEngineTypeName === "Benzin"
                  ? "before:bg-[#a90000]"
                  : carEngineTypeName === "Dizel"
                  ? "before:bg-[#17f7ff] "
                  : "before:bg-[#db9122] "
              }`}
            />
            <Image
              src="/element/gass.png"
              width={40}
              height={40}
              alt=""
              className="-mt-1"
              priority
              fetchpriority="high"
            />
            <p className="text-[14px] font-semibold capitalize ">
              {carEngineTypeName}
            </p>
          </div>
          {/* yakıt türü */}
        </div>
        <div className="hidden group-hover:flex absolute bottom-0 w-full z-10">
          <button
            className="button w-full text-center "
            onClick={() => setIsOpen(true)}
          >
            Rezerve Et
          </button>
        </div>
      </div>
      <CarDetails
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        car={car}
        startDate={startDate}
        endDate={endDate}
        startLocationId={startLocationId}
      />
    </div>
  );
};
export default CarCard;
