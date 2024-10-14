import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import InputField from "../../../../../components/ui/InputField";
import Link from "next/link";
import { notify } from "../../../../../utils/notifications";
import {
  useGetCarQuery,
  usePutCarMutation,
} from "../../../../slices/carsDetails";
import {
  useGetCarModelsQuery,
  useGetModelbyBrandQuery,
} from "../../../../slices/carModel";
import { useGetCarTypesQuery } from "../../../../slices/carType";
import { useGetEngineTypesQuery } from "../../../../slices/carEngineType";
import { useGetCompaniesQuery } from "../../../../slices/companies";
import { useGetLocationsQuery } from "../../../../slices/carLocations";
import ComboboxField from "../../../../../components/ui/ComboboxField";
import { useGetBrandsQuery } from "../../../../slices/carBrands";
import { useGetCarCaseTypesQuery } from "../../../../slices/carCaseType";

const EditCarDB = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(99);

  const { id } = router.query;

  const [placeholder, setPlaceholder] = useState("");
  const [selectedBrand, setSelectedBrand] = useState();
  const { data: byBrandDataHandle } = useGetModelbyBrandQuery(selectedBrand, {
    skip: !selectedBrand,
  });
  const { data: car, refetch } = useGetCarQuery(id, {
    skip: !id,
  });

  const { data: modelData } = useGetCarModelsQuery({ page, size });
  const { data: engineData } = useGetEngineTypesQuery({ page, size });
  const { data: typeData } = useGetCarTypesQuery({ page, size });
  const { data: companiesData } = useGetCompaniesQuery({ page, size });
  const { data: locationData } = useGetLocationsQuery({ page, size });
  const { data: brandData } = useGetBrandsQuery({ page, size });
  const { data: carCaseData } = useGetCarCaseTypesQuery({ page, size });

  const modeldataOptions = modelData?.carModels || [];
  const engineDataOptions = engineData?.carEngineTypes || [];
  const typeDataOptions = typeData?.carTypes || [];
  const carCaseDataOptions = carCaseData?.carCaseTypes || [];
  const companiesDataOptions = companiesData?.companies || [];
  const locationDataOptions = locationData?.locations || [];
  const brandDataOptions = brandData?.carBrands || [];

  const bydata = byBrandDataHandle?.carModels || [];

  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    carId: "",
    carName: "",
    carLicensePlate: "",
    carModelId: "",
    carBrandId: "",
    carKM: 0,
    carFuelStatus: 0,
    carCapacity: 0,
    carGearType: true,
    chassisNumber: "",
    carMaintenanceKM: 0,
    isCarMaintenanceArrived: true,
    carTypeId: "",
    carEngineTypeId: "",
    companyId: "",
    carIMEI: "",
    carStatus: true,
    isCarCommercial: true,
    isPassive: true,
    locationId: "",
    carCaseTypeId: "",
  });

  useEffect(() => {
    if (car) {
      setFormData({
        carId: id || "",
        carName: car.carName || "",
        carLicensePlate: car.carLicensePlate || "",
        carModelId:
          car.carModelId ||
          modeldataOptions.find(
            (modelData) => modelData.carModelName === car.carModelName
          )?.id,
        carBrandId:
          car.carBrandId ||
          brandDataOptions.find(
            (brandData) => brandData.carBrandName === car.carBrandName
          )?.id,
        carKM: car.carKM || 0,
        carFuelStatus: car.carFuelStatus || 0,
        carCapacity: car.carCapacity || 0,
        carGearType: car.carGearType || true,
        chassisNumber: car.chassisNumber || "",
        carMaintenanceKM: car.carMaintenanceKM || 0,
        isCarMaintenanceArrived: car.isCarMaintenanceArrived || true,
        carTypeId:
          car.carTypeId ||
          typeDataOptions.find(
            (typeData) => typeData.carTypeName === car.carTypeName
          )?.id,
        carEngineTypeId:
          car.carEngineTypeId ||
          engineDataOptions.find(
            (engineType) =>
              engineType.carEngineTypeName === car.carEngineTypeName
          )?.id,
        companyId:
          car.companyId ||
          companiesDataOptions.find(
            (company) => company.companyName === car.companyName
          )?.id,
        carIMEI: car.carIMEI || "",
        carStatus: car.carStatus || true,
        isCarCommercial: car.isCarCommercial || true,
        isPassive: car.isPassive || true,
        locationId:
          car.locationId ||
          locationDataOptions.find(
            (location) => location.locationName === car.locationName
          )?.id,
        carCaseTypeId:
          car.carCaseTypeId ||
          carCaseDataOptions.find(
            (carCase) => carCase.carCaseTypeName === car.carCaseTypeName
          )?.id,
      });
      setPlaceholder(
        modeldataOptions.find(
          (modelData) => modelData.carModelName === car.carModelName
        )?.carModelName
      ); //İlk açıldığında gelen veri için placeholder ı doldur.
    }
  }, [car, id]);

  useEffect(() => {
    if (selectedBrand) {
      handleBrandChange();
    }
  }, [byBrandDataHandle]);

  const [putCar] = usePutCarMutation();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,

      [name]: type === "checkbox" ? checked : value,
    });
  };
  //Araba markasına göre model filtreleme işlem fonksiyonu
  const handleBrandChange = (event) => {
    setSelectedBrand(event);
    if (bydata.length != 0) {
      setPlaceholder(bydata[0].carModelName);
    }
  };

  const handleSaveCar = async () => {
    try {
      await putCar(formData).unwrap();
      router.push("/admin?tab=3");
      notify.success();
      refetch();
    } catch (err) {
      console.error("Error:", err);
      setError(err);
      notify.error();
    }
  };
  if (!car)
    return (
      <div className="sm:text-xl text-sm font-bold font-titleTextType uppercase">
        Aradığınız özelliklere sahip data bulunamadı
      </div>
    );

  return (
    <div className="grid w-full p-8 py-4">
      <button
        onClick={() => router.push("/admin?tab=3")}
        className="button items-center justify-center mb-7 text-center mx-32"
      >
        Anasayfaya dön
      </button>
      <div>
        <InputField
          name="carLicensePlate"
          value={car.carLicensePlate}
          type="text"
          label="Plaka"
          onChange={handleChange}
        />
      </div>
      <div>
        <InputField
          name="carKM"
          value={car.carKM}
          type="number"
          label="KM"
          onChange={handleChange}
        />
      </div>
      <div>
        <InputField
          name="carFuelStatus"
          value={car.carFuelStatus}
          type="number"
          label="Yakıt Durumu"
          onChange={handleChange}
        />
      </div>
      <div>
        <InputField
          name="carCapacity"
          value={car.carCapacity}
          type="number"
          label="Kapasite"
          onChange={handleChange}
        />
      </div>
      <div>
        <InputField
          name="carGearType"
          value={car.carGearType ? "true" : "false"}
          type="text"
          label="Vites Türü"
          onChange={handleChange}
        />
      </div>
      <div>
        <InputField
          name="chassisNumber"
          value={car.chassisNumber}
          type="text"
          label="Şasi Numarası"
          onChange={handleChange}
        />
      </div>
      <>
        <div className="gap-2 flex flex-col">
          <>
            <ComboboxField
              options={engineDataOptions}
              placeholder={
                engineDataOptions.find(
                  (engineType) =>
                    engineType.carEngineTypeName === car.carEngineTypeName
                )?.carEngineTypeName
              }
              selectedValue={
                engineDataOptions.find(
                  (typeData) => typeData.id === formData.carEngineTypeId
                ) || null
              }
              value={
                engineDataOptions.find(
                  (engineType) =>
                    engineType.carEngineTypeName === car.carEngineTypeName
                )?.id
              }
              onChange={(value) =>
                setFormData({ ...formData, carEngineTypeId: value.id })
              }
              labelKey="carEngineTypeName"
              valueKey="id"
              buttonClassName="w-60 InputFields md:h-12 h-10 border w-full border-grayColor shadow-sm outline-none px-4 "
              placeholderCombobox="yakıt tipi"
              labelClassName="labelFields"
            />
          </>
          <>
            <ComboboxField
              options={brandDataOptions}
              placeholder={
                brandDataOptions.find(
                  (modelData) => modelData.carBrandName === car.carBrandName
                )?.carBrandName
              }
              selectedValue={
                brandDataOptions.find(
                  (modelData) => modelData.id === formData.carBrandId
                ) || null
              }
              value={
                brandDataOptions.find(
                  (modelData) => modelData.carBrandName === car.carBrandName
                )?.id
              }
              onChange={(value) => {
                setFormData({ ...formData, carBrandId: value.id });
                handleBrandChange(value.id);
              }}
              labelKey="carBrandName"
              valueKey="id"
              buttonClassName="w-60 InputFields md:h-12 h-10 border w-full border-grayColor shadow-sm outline-none px-4 "
              placeholderCombobox="Araç Markası"
              labelClassName="labelFields"
            />
          </>
          <>
            <ComboboxField
              options={bydata}
              placeholder={placeholder}
              selectedValue={
                bydata.find(
                  (modelData) => modelData.id === formData.carModelId
                ) || null
              }
              value={
                bydata.find(
                  (modelData) => modelData.carModelName === car.carModelName
                )?.id
              }
              onChange={(value) =>
                setFormData({ ...formData, carModelId: value.id })
              }
              labelKey="carModelName"
              valueKey="id"
              buttonClassName="w-60 InputFields md:h-12 h-10 border w-full border-grayColor shadow-sm outline-none px-4 "
              placeholderCombobox="Araç Modeli"
              labelClassName="labelFields"
            />
          </>
          <>
            <ComboboxField
              options={typeDataOptions}
              placeholder={
                typeDataOptions.find(
                  (typeData) => typeData.carTypeName === car.carTypeName
                )?.carTypeName
              }
              selectedValue={
                typeDataOptions.find(
                  (typeData) => typeData.id === formData.carTypeId
                ) || null
              }
              value={
                typeDataOptions.find(
                  (typeData) => typeData.carTypeName === car.carTypeName
                )?.id
              }
              onChange={(value) =>
                setFormData({ ...formData, carTypeId: value.id })
              }
              labelKey="carTypeName"
              valueKey="id"
              buttonClassName="w-60 InputFields md:h-12 h-10 border w-full border-grayColor shadow-sm outline-none px-4 "
              placeholderCombobox="Araç Tipi (havuz/vıp)"
              labelClassName="labelFields"
            />
          </>
          <>
            <ComboboxField
              options={carCaseDataOptions}
              placeholder={
                carCaseDataOptions.find(
                  (carCase) => carCase.carCaseTypeName == car.carCaseTypeName
                )?.carCaseTypeName
              }
              selectedValue={
                carCaseDataOptions.find(
                  (carCase) => carCase.id === formData.carCaseTypeId
                ) || null
              }
              value={
                carCaseDataOptions.find(
                  (carCase) => carCase.carCaseTypeName == car.carCaseTypeName
                )?.id
              }
              onChange={(value) =>
                setFormData({ ...formData, carCaseTypeId: value.id })
              }
              labelKey="carCaseTypeName"
              valueKey="id"
              buttonClassName="w-60 InputFields md:h-12 h-10 border w-full border-grayColor shadow-sm outline-none px-4 "
              placeholderCombobox="Araba Kasa Tipi"
              labelClassName="labelFields"
            />
          </>
          <>
            <ComboboxField
              options={companiesDataOptions}
              placeholder={
                companiesDataOptions.find(
                  (company) => company.companyName === car.companyName
                )?.companyName
              }
              selectedValue={
                companiesDataOptions.find(
                  (company) => company.id === formData.companyId
                ) || null
              }
              value={
                companiesDataOptions.find(
                  (company) => company.companyName === car.companyName
                )?.id
              }
              onChange={(value) =>
                setFormData({ ...formData, companyId: value.id })
              }
              labelKey="companyName"
              valueKey="id"
              buttonClassName="w-60 InputFields md:h-12 h-10 border w-full border-grayColor shadow-sm outline-none px-4 "
              placeholderCombobox="şirket"
              labelClassName="labelFields"
            />
          </>
          <>
            <ComboboxField
              options={locationDataOptions}
              placeholder={
                locationDataOptions.find(
                  (location) => location.locationName === car.locationName
                )?.locationName
              }
              selectedValue={
                locationDataOptions.find(
                  (location) => location.id === formData.locationId
                ) || null
              }
              value={
                locationDataOptions.find(
                  (location) => location.locationName === car.locationName
                )?.id
              }
              onChange={(value) =>
                setFormData({ ...formData, locationId: value.id })
              }
              labelKey="locationName"
              valueKey="id"
              buttonClassName="w-60 InputFields md:h-12 h-10 border w-full border-grayColor shadow-sm outline-none px-4 "
              placeholderCombobox="Lokasyon"
              labelClassName="labelFields"
            />
          </>
        </div>
      </>
      <div>
        <InputField
          name="isCarMaintenanceArrived"
          value={car.isCarMaintenanceArrived ? "true" : "false"}
          type="text"
          label="Bakım Geldi Mi?"
          onChange={handleChange}
        />
      </div>
      <div>
        <InputField
          name="carMaintenanceKM"
          value={car.carMaintenanceKM}
          type="number"
          label="Bakım KM"
          onChange={handleChange}
        />
      </div>
      <div>
        <InputField
          name="carIMEI"
          value={car.carIMEI}
          type="text"
          label="IMEI"
          onChange={handleChange}
        />
      </div>
      <div>
        <InputField
          name="carStatus"
          value={car.carStatus ? "true" : "false"}
          type="text"
          label="Araç Durumu"
          onChange={handleChange}
        />
      </div>
      <div>
        <InputField
          name="isCarCommercial"
          value={car.isCarCommercial ? "true" : "false"}
          type="text"
          label="Ticari Araç Mı?"
          onChange={handleChange}
        />
      </div>

      <button className="button mt-4 text-center mx-16" onClick={handleSaveCar}>
        Kaydet
      </button>
    </div>
  );
};

export default EditCarDB;
