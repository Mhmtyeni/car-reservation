import { useGetCarQuery } from "../slices/carsDetails";

import ReservationLoginCustom from "../../components/reservationcustom/ReservationLoginCustom";
import { useRouter } from "next/router";
import ReservationCustomR from "../../components/reservationcustom/ReservationCustomR";
import Link from "next/link";
import Loading from "../../components/layout/Loading";

const Index = () => {
  const router = useRouter();
  //Seçilen araba ıd, reservation startDate, endDate

  const { carId, startDate, endDate } = router.query;
  const { data: car, error, isLoading } = useGetCarQuery(carId);
  if (isLoading) return <Loading />;

  if (!car)
    return (
      <div className="text-darkColor/50 items-center justify-center flex flex-col sm:mt-14 mt-2 bg-white w-[100wh] h-[30em] backdrop-blur-[1px]">
        <h2 className="sm:text-xl text-sm font-bold font-titleTextType uppercase">
          Sonuç Bulunamadı
        </h2>

        <p className="sm:text-md text-xs font-titleTextType">
          Araç Bilgisine Ulaşılamadı.
        </p>
        <Link href="/reservation" className="button mt-14">
          ana sayfaya dön
        </Link>
      </div>
    );
  return (
    <div className="bg-white w-auto h-auto backdrop-blur-[1px] ">
      <div className=" container mx-auto flex py-12 justify-center items-center flex-wrap gap-10 mb-10">
        <ReservationLoginCustom
          startDate={startDate}
          endDate={endDate}
          carId={carId}
        />
        <div className="lg:flex-1 w-full grid gap-2">
          <ReservationCustomR
            car={car}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;

//     for (let pair of formData.entries()) {
//       console.log(pair[0] + ": " + pair[1]);
//     }
