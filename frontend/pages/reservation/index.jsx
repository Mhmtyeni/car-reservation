import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchReservationDataByDate } from "../slices/reservationSlice";
import { motion } from "framer-motion";
import { fadeIn } from "../../components/uicustom/Variants";
import CarCard from "../../components/ui/CarCard";
import Link from "next/link";
import Loading from "../../components/layout/Loading";
import FilterInput from "../../components/uibasic/FilterInput";
import TextHeader from "../../components/textcustom/TextHeader";
import { FaCar, FaTruck } from "react-icons/fa";

const Reservation = () => {
  const [modelNo, setModelNo] = useState("");
  const [isCommercialChecked, setIsCommercialChecked] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { startDate, endDate, startLocationId, CarTypeId } = router.query;

  const { filteredData, data, isloading, error } = useSelector(
    (state) => state.reservation
  );

  useEffect(() => {
    if (startDate && endDate) {
      dispatch(
        fetchReservationDataByDate({
          startDate,
          endDate,
          startLocationId,
          CarTypeId,
        })
      );
    }
  }, [startDate, endDate, startLocationId, CarTypeId, dispatch]);

  useEffect(() => {
    if (data) {
      const filteredCars = data.cars?.filter((car) => {
        const matchesCommercial = isCommercialChecked
          ? car.isCarCommercial
          : true;

        const matchesBrand = modelNo
          ? car.carModelName.toLowerCase().includes(modelNo.toLowerCase())
          : true;
        const matchesPlaka = modelNo
          ? car.carLicensePlate.toLowerCase().includes(modelNo.toLowerCase())
          : true;
        const matchesModelNo = modelNo
          ? car.carBrandName.toLowerCase().includes(modelNo.toLowerCase())
          : true;
        return (
          matchesCommercial && (matchesBrand || matchesModelNo || matchesPlaka)
        );
      });
      dispatch({ type: "reservation/setFilteredData", payload: filteredCars });
    }
  }, [isCommercialChecked, modelNo, data, dispatch]);

  const handleModelNoChange = (e) => {
    setModelNo(e.target.value);
  };

  const handleCommercialCheckboxChange = (e) => {
    setIsCommercialChecked(e.target.checked);
  };

  if (isloading) return <Loading />;
  if (error) {
    const errorMessage = error?.status
      ? `Error: ${error.status} - ${JSON.stringify(error.data || {})}`
      : error.message || "Bilinmeyen bir hata oluştu.";
    return (
      <div className="h-screen pb-14 w-screen relative lg:bg-white/70 bg-white rounded-[10px] flex justify-center items-center">
        <TextHeader>{errorMessage}</TextHeader>
        <Link href="/home" className="button underline absolute mt-[20%]">
          Anasayfa
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full min-h-[100vh] relative" id="cars">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <FilterInput
              value={modelNo}
              type={"text"}
              onChange={handleModelNoChange}
              placeholder="Araç Arama"
              ico={<FaCar />}
            />
            <FilterInput
              type={"checkbox"}
              checked={isCommercialChecked}
              onChange={handleCommercialCheckboxChange}
              ico={<FaTruck title="Ticari araç" />}
              placeholder="Ticari"
            />
          </div>
          <section>
            <motion.div
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView={"show"}
              className="grid container mx-auto grid-row-1 py-10 w-full gap-8 pt-14"
            >
              {filteredData.length > 0 ? (
                filteredData.map((car) => (
                  <CarCard
                    car={car}
                    key={car.id}
                    startDate={startDate}
                    endDate={endDate}
                    startLocationId={startLocationId}
                  />
                ))
              ) : (
                <div className="text-darkColor/50 items-center justify-center flex flex-col sm:mt-14 mt-2">
                  <h2 className="sm:text-xl text-sm font-bold font-titleTextType uppercase">
                    Sonuç Bulunamadı
                  </h2>
                  <p className="sm:text-md text-xs font-titleTextType">
                    Arama kriterlerinize uygun sonuç bulunamadı.
                  </p>
                  <Link href="/home" className="button mt-14">
                    Ana sayfaya dön
                  </Link>
                </div>
              )}
            </motion.div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
