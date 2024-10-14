"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import InputField from "../../../../components/ui/InputField";
import { notify } from "../../../../utils/notifications";
import { useAddCarMutation } from "../../../slices/carsDetails";
import {
  useGetCarModelsQuery,
  useGetModelbyBrandQuery,
} from "../../../slices/carModel";
import { useGetCarTypesQuery } from "../../../slices/carType";
import { useGetEngineTypesQuery } from "../../../slices/carEngineType";
import { useGetCompaniesQuery } from "../../../slices/companies";
import { useGetLocationsQuery } from "../../../slices/carLocations";
import ComboboxField from "../../../../components/ui/ComboboxField";
import { useGetCarCaseTypesQuery } from "../../../slices/carCaseType";

const AddCarDB = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(99);
  const { data: byBrandDataHandle } = useGetModelbyBrandQuery(selectedBrand, {
    skip: !selectedBrand,
  });
  const { data: modelData } = useGetCarModelsQuery({ page, size });
  const { data: engineData } = useGetEngineTypesQuery({ page, size });
  const { data: typeData } = useGetCarTypesQuery({ page, size });
  const { data: companiesData } = useGetCompaniesQuery({ page, size });
  const { data: locationData } = useGetLocationsQuery({ page, size });
  const { data: carCaseData } = useGetCarCaseTypesQuery({ page, size });

  const modeldataOptions = modelData?.carModels || [];
  const engineDataOptions = engineData?.carEngineTypes || [];
  const typeDataOptions = typeData?.carTypes || [];
  const companiesDataOptions = companiesData?.companies || [];
  const locationDataOptions = locationData?.locations || [];
  const carCaseDataOptions = carCaseData?.carCaseTypes || [];
  const brandDataOptions = brandData?.carBrands || [];

  const bydata = byBrandDataHandle?.carModels || [];

  const [carName, setCarName] = useState("");
  const [carLicensePlate, setCarLicensePlate] = useState("");
  //   const [selectedBrand, setSelectedBrand] = useState("");

  const [carModelId, setCarModelId] = useState("");
  const [carKM, setCarKM] = useState("");
  const [carFuelStatus, setCarFuelStatus] = useState("");
  const [carCapacity, setCarCapacity] = useState("");
  const [carGearType, setCarGearType] = useState(true);
  const [chassisNumber, setChassisNumber] = useState("");
  const [carMaintenanceKM, setCarMaintenanceKM] = useState("");
  const [isCarMaintenanceArrived, setIsCarMaintenanceArrived] = useState(true);
  const [carCaseTypeId, setCarCaseTypeId] = useState("");
  const [carEngineTypeId, setCarEngineTypeId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [carIMEI, setCarIMEI] = useState("");
  const [carTypeId, setCarTypeId] = useState("");
  const [carStatus, setCarStatus] = useState(true);
  const [isCarCommercial, setIsCarCommercial] = useState(true);
  const [locationId, setLocationId] = useState("");

  const [error, setError] = useState();

  const [addCar] = useAddCarMutation();

  const handleAddCar = async () => {
    const newCar = {
      carName,
      carLicensePlate,
      carModelId,
      carKM: Number(carKM),
      carFuelStatus: Number(carFuelStatus),
      carCapacity: Number(carCapacity),
      carGearType,
      chassisNumber,
      carMaintenanceKM: Number(carMaintenanceKM),
      isCarMaintenanceArrived,
      carCaseTypeId,
      carEngineTypeId,
      companyId,
      carIMEI,
      carStatus,
      isCarCommercial,
      locationId,
      carTypeId,
    };

    try {
      await addCar(newCar).unwrap();
      router.push("/admin?tab=3");
      notify.success();
      setError(null);
    } catch (err) {
      console.error("Yeni araba eklenirken bir hata oluştu.", err);
      setError("Yeni araba eklenirken bir hata oluştu.");
    }
  };

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
          name="carName"
          value={carName}
          type="text"
          label="Araba Adı"
          onChange={(event) => setCarName(event.target.value)}
        />
      </div>
      <div>
        <InputField
          name="carLicensePlate"
          value={carLicensePlate}
          type="text"
          label="Plaka"
          onChange={(event) => setCarLicensePlate(event.target.value)}
        />
      </div>

      <div>
        <InputField
          name="carKM"
          value={carKM}
          type="number"
          label="KM"
          onChange={(event) => setCarKM(event.target.value)}
        />
      </div>
      <div>
        <InputField
          name="carFuelStatus"
          value={carFuelStatus}
          type="number"
          label="Yakıt Durumu"
          onChange={(event) => setCarFuelStatus(event.target.value)}
        />
      </div>
      <div>
        <InputField
          name="carCapacity"
          value={carCapacity}
          type="number"
          label="Kapasite"
          onChange={(event) => setCarCapacity(event.target.value)}
        />
      </div>
      <div>
        <InputField
          name="carGearType"
          value={carGearType ? "true" : "false"}
          type="text"
          label="Vites Türü"
          onChange={(event) => setCarGearType(event.target.value === "true")}
        />
      </div>
      <div>
        <InputField
          name="chassisNumber"
          value={chassisNumber}
          type="text"
          label="Şasi Numarası"
          onChange={(event) => setChassisNumber(event.target.value)}
        />
      </div>
      <div>
        <InputField
          name="carMaintenanceKM"
          value={carMaintenanceKM}
          type="number"
          label="Bakım KM"
          onChange={(event) => setCarMaintenanceKM(event.target.value)}
        />
      </div>
      <div>
        <InputField
          name="isCarMaintenanceArrived"
          value={isCarMaintenanceArrived ? "true" : "false"}
          type="text"
          label="Bakım Geldi Mi?"
          onChange={(event) =>
            setIsCarMaintenanceArrived(event.target.value === "true")
          }
        />
      </div>

      <div>
        <InputField
          name="carIMEI"
          value={carIMEI}
          type="text"
          label="IMEI"
          onChange={(event) => setCarIMEI(event.target.value)}
        />
      </div>
      <div>
        <InputField
          name="carStatus"
          value={carStatus ? "true" : "false"}
          type="text"
          label="Araç Durumu"
          onChange={(event) => setCarStatus(event.target.value === "true")}
        />
      </div>
      <div>
        <InputField
          name="isCarCommercial"
          value={isCarCommercial ? "true" : "false"}
          type="text"
          label="Ticari Araç Mı?"
          onChange={(event) =>
            setIsCarCommercial(event.target.value === "true")
          }
        />
      </div>
      <div className="gap-2 flex flex-col">
        <>
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
          <ComboboxField
            options={modeldataOptions}
            placeholder={
              modeldataOptions.find((modelData) => modelData.carModelName)
                ?.carModelName
            }
            selectedValue={
              modeldataOptions.find(
                (modelData) => modelData.id === carModelId
              ) || null
            }
            value={carModelId}
            labelKey="carModelName"
            valueKey="carModelId"
            buttonClassName="w-60 InputFields md:h-12 h-10 border w-full border-grayColor shadow-sm outline-none px-4 "
            placeholderCombobox="Araba Modeli"
            labelClassName="labelFields"
            onChange={(value) => setCarModelId(value.id)}
          />
        </>
        <>
          <ComboboxField
            options={typeDataOptions}
            placeholder={
              typeDataOptions.find((carType) => carType.carTypeName)
                ?.carTypeName
            }
            selectedValue={
              typeDataOptions.find((carType) => carType.id === carTypeId) ||
              null
            }
            value={carTypeId}
            labelKey="carTypeName"
            valueKey="carTypeId"
            buttonClassName="w-60 InputFields md:h-12 h-10 border w-full border-grayColor shadow-sm outline-none px-4 "
            placeholderCombobox="Araba Tip(Havuz/VIP)"
            labelClassName="labelFields"
            onChange={(value) => setCarTypeId(value.id)}
          />
        </>
        <>
          <ComboboxField
            options={companiesDataOptions}
            placeholder={
              companiesDataOptions.find((company) => company.companyName)
                ?.companyName
            }
            selectedValue={
              companiesDataOptions.find(
                (company) => company.id === companyId
              ) || null
            }
            value={companyId}
            labelKey="companyName"
            valueKey="companyId"
            buttonClassName="w-60 InputFields md:h-12 h-10 border w-full border-grayColor shadow-sm outline-none px-4 "
            placeholderCombobox="Şirket"
            labelClassName="labelFields"
            onChange={(value) => setCompanyId(value.id)}
          />
        </>
        <>
          <ComboboxField
            options={carCaseDataOptions}
            placeholder={
              carCaseDataOptions.find((carCase) => carCase.carCaseTypeName)
                ?.carCaseTypeName
            }
            selectedValue={
              carCaseDataOptions.find(
                (carCase) => carCase.id === carCaseTypeId
              ) || null
            }
            value={carCaseTypeId}
            labelKey="carCaseTypeName"
            valueKey="carCaseTypeId"
            buttonClassName="w-60 InputFields md:h-12 h-10 border w-full border-grayColor shadow-sm outline-none px-4 "
            placeholderCombobox="Araba Kasa Tipi"
            labelClassName="labelFields"
            onChange={(value) => setCarCaseTypeId(value.id)}
          />
        </>
        <>
          <ComboboxField
            options={locationDataOptions}
            placeholder={
              locationDataOptions.find((location) => location.locationName)
                ?.locationName
            }
            selectedValue={
              locationDataOptions.find(
                (location) => location.id === locationId
              ) || null
            }
            value={locationId}
            labelKey="locationName"
            valueKey="locationId"
            buttonClassName="w-60 InputFields md:h-12 h-10 border w-full border-grayColor shadow-sm outline-none px-4 "
            placeholderCombobox="Araba Lokasyon"
            labelClassName="labelFields"
            onChange={(value) => setLocationId(value.id)}
          />
        </>
        <ComboboxField
          options={engineDataOptions}
          placeholder={
            engineDataOptions.find((engine) => engine.carEngineTypeName)
              ?.carEngineTypeName
          }
          selectedValue={
            engineDataOptions.find((engine) => engine.id === carEngineTypeId) ||
            null
          }
          value={carEngineTypeId}
          labelKey="carEngineTypeName"
          valueKey="carEngineTypeId"
          buttonClassName="w-60 InputFields md:h-12 h-10 border w-full border-grayColor shadow-sm outline-none px-4 "
          placeholderCombobox="Araba Yakıt Tipi"
          labelClassName="labelFields"
          onChange={(value) => setCarEngineTypeId(value.id)}
        />
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <button
        className="button items-center justify-center my-7 text-center mx-32"
        onClick={handleAddCar}
      >
        Araba Ekle
      </button>
    </div>
  );
};

export default AddCarDB;
