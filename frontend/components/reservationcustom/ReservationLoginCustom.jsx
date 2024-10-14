import React, { useEffect, useRef, useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { useGetCarQuery } from "../../pages/slices/carsDetails";
import { useAddCarReservationMutation } from "../../pages/slices/carReservationDetails";

import ControllerFiled from "../ui/ControllerFiled";
import { notify } from "../../utils/notifications";
import TextHeader from "../textcustom/TextHeader";
import InputField from "../ui/InputField";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Loading from "../layout/Loading";
import ComboboxField from "../ui/ComboboxField";
import Cookies from "js-cookie";
import {
  useAddUserUploadFileMutation,
  useGetUserQuery,
} from "../../pages/slices/userApi";
import UserImage from "../ui/UserImage";
import Image from "next/image";

const reasons = [
  { value: "Havuz Arac Talebi", label: "Havuz Araç Talebi" },
  { value: "Misafir Karsilama", label: "Misafir Karşılama" },
];

const ReservationLoginCustom = ({ startDate, endDate, carId }) => {
  const id = Cookies.get("userId");
  const fileInputRefs = useRef({});
  const [addUserFile] = useAddUserUploadFileMutation();
  const router = useRouter();
  const { data: car, error, isLoading } = useGetCarQuery(carId);
  const { data: userData, refetch } = useGetUserQuery(id);
  /////////

  //////
  const [addCarReservation] = useAddCarReservationMutation();
  const { control, handleSubmit, setValue, watch } = useForm();
  const selectedReason = watch("reasonForRequest");
  const peopleCount = watch("peopleCount") || [];
  const driverCount = watch("driverCount") || [];
  const [isCheck, setIsCheck] = useState(false);

  //useForm ile kullanılan kontrol özellikleri
  const [personCount, setPersonCount] = useState(0);

  const [subReason, setSubReason] = useState([]);
  const [filesList, setFilesList] = useState([]);
  const [fileDescriptions, setFileDescriptions] = useState({});
  //Files içinde tutulan desc. obje olarak tutulmaktadır.
  const listFiles = useRef([]);
  //Normal bir dizi, yeni veri eklendiğinde eskisini içinde tutamadığından dolayı içine kalıcı olarak ekleme amacıyla kullanılan React bileşini --> useRef

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    listFiles.current = [...listFiles.current, ...newFiles];
    //current ile new files içindekileri listFiles içinde tutulmak üzere eklendi.
    setFilesList((prevFiles) => [...prevFiles, ...newFiles]);

    const descriptions = {};
    newFiles.forEach((file) => {
      descriptions[file.name] = "";
    });
    //File içindeki desc. eklendi.
    setFileDescriptions((prev) => ({
      ...prev,
      ...descriptions,
    }));
    e.target.value = "";
    //Dosya seçildikten sonra value boşaltmak için eklendi.
  };

  const handleDescriptionChange = (fileName, description) => {
    setFileDescriptions((prev) => ({
      ...prev,
      [fileName]: description,
    }));
    //FileName olarak tutulan değerler desc. ile değiştirilerek tutuldu.
  };

  const handleRemoveFile = (fileName) => {
    //File içinde silme amacıyla kullanılan fonksiyon.
    setFilesList((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
    setFileDescriptions((prev) => {
      const newDescriptions = { ...prev };
      delete newDescriptions[fileName];
      return newDescriptions;
    });
    listFiles.current = listFiles.current.filter((x) => x.name !== fileName);
    //Aynı isime sahip dosya eklenmemesi adına filtreleme yapıldı.
  };

  //Rez. Talep alt nedeni için seçenekler.
  useEffect(() => {
    let newOptions = [];
    if (selectedReason === "Havuz Arac Talebi") {
      newOptions = [
        { value: "Fabrika İçi Taşıma", label: "Fabrika İçi Taşıma" },
        {
          value: "Firma ve Müşteri Ziyareti",
          label: "Firma ve Müşteri Ziyareti",
        },
        {
          value: "Hoşgeldin Paket Dağıtımı",
          label: "Hoşgeldin Paket Dağıtımı",
        },
        { value: "Malzeme ve Ürün Alımı", label: "Malzeme ve Ürün Alımı" },
        { value: "Resmi Kurumlar Ziyareti", label: "Resmi Kurumlar Ziyareti" },
        {
          value: "Saha Ziyareti ve Kurulum",
          label: "Saha Ziyareti ve Kurulum",
        },
        { value: "Servis ve Bayi Ziyareti", label: "Servis ve Bayi Ziyareti" },
        { value: "Test Amaçlı Ürün Taşıma", label: "Test Amaçlı Ürün Taşıma" },
        { value: "Diğer", label: "Diğer" },
      ];
    } else if (selectedReason === "Misafir Karsilama") {
      newOptions = [
        { value: "Denetim Faaliyetleri", label: "Denetim Faaliyetleri" },
        {
          value: "Firma ve Müşteri Ziyareti",
          label: "Firma ve Müşteri Ziyareti",
        },
        { value: "Okul Ziyaretleri", label: "Okul Ziyaretleri" },
        { value: "VIP Ziyareti", label: "VIP Ziyareti" },
        { value: "Diğer", label: "Diğer" },
      ];
    }
    setSubReason(newOptions);
    setValue("subReasonForRequest", newOptions[0]?.value || "");
  }, [selectedReason, setValue]);

  const selectedSubReason = subReason.find(
    (sreason) => sreason.value === watch("subReasonForRequest") // form değerini kullanarak kontrol ediyoruz
  );
  const handleCheckBoxChange = (e) => {
    setIsCheck(e.target.checked);
  };
  useEffect(() => {}, [isCheck]);

  const handlePersonCountInput = (e) => {
    const inputValue = Number(e.target.value);
    const newPersonCount = isCheck ? inputValue - 1 : inputValue;
    setPersonCount(newPersonCount);
  };
  useEffect(() => {}, [personCount]);
  const personArray = Array.from(
    { length: personCount },
    (_, index) => index + 1
  );

  const [isCheckDriver, setIsCheckDriver] = useState(
    Array(personArray.length).fill(false)
  );

  const handleCheckDriverBoxChange = (e, index) => {
    const updatedDrivers = [...isCheckDriver]; // mevcut durumu kopyala
    updatedDrivers[index] = e.target.checked; // sadece seçilen checkbox'ın durumunu güncelle
    setIsCheckDriver(updatedDrivers); // durumu güncelle
  };
  const onSubmit = async (data) => {
    //Error yazdıran inputlar yakalandı, içinde error yoksa formData'yı kaydet.
    //Files içine eklenen listFiles.current (uzunluğu).length (0>) formData'yı kaydet.
    //Files içine eklenen listFiles.current ve fileDescriptions uzunluğu eşit ise formData'yı kaydet.

    const inputElement = document.getElementById("errorInfo");
    if (inputElement == null) {
      const formData = new FormData();
      formData.append("carId", carId);
      formData.append("startDateTime", startDate);
      formData.append("endDateTime", endDate);
      formData.append("reasonForRequest", data.reasonForRequest);
      formData.append("subReasonForRequest", data.subReasonForRequest);
      formData.append("reasonForRequestDetails", data.reasonForRequestDetails);
      formData.append("routeStart", data.routeStart);
      formData.append("routeEnd", data.routeEnd);
      formData.append("peopleCount", personCount);
      formData.append("driverCount", data.driverCount);
      formData.append("appUserId", id);

      // Reservation Users
      if (
        !isCheck &&
        listFiles.current.length !== 0 &&
        listFiles.current.length ===
          Object.values(fileDescriptions).filter(
            (value) => value !== null && value !== "" && value !== undefined
          ).length
      ) {
        formData.append("reservationUsers[0].isDriver", true);
        formData.append("reservationUsers[0].nameSurname", data.nameSurname);
        formData.append("reservationUsers[0].tc", data.tc);
        formData.append("reservationUsers[0].sicil", data.sicil);

        if (listFiles.current.length > 0) {
          listFiles.current = listFiles.current.filter(
            (file, index, self) =>
              index === self.findIndex((f) => f.name === file.name)
          );
          for (let index = 0; index < listFiles.current.length; index++) {
            formData.append(
              `reservationUsers[0].files`,
              listFiles.current[index]
            );
            formData.append(
              `reservationUsers[0].fileDescription`,
              Object.values(fileDescriptions)[index]
            );
          }
        } else {
          notify.error();
        }
      } else {
        formData.append("reservationUsers[0].isDriver", true);
        formData.append("reservationUsers[0].nameSurname", userData.name);
        formData.append("reservationUsers[0].tc", "1111111111");
        formData.append("reservationUsers[0].sicil", userData.sicil);
        for (let index = 0; index < userData.userImages.length; index++) {
          if (
            userData.userImages[index].fileDescription === "Ehliyet Ön" ||
            userData.userImages[index].fileDescription === "Ehliyet Arka"
          ) {
            const blob = new Blob([userData?.userImages[index].path], {
              type: "image/png",
            });

            const file = new File([blob], userData?.userImages[index].path, {
              type: blob.type,
            });
            //image içinde bulunna path---> file olaeak gönderme.
            formData.append(`reservationUsers[0].files`, file);
            formData.append(
              `reservationUsers[0].fileDescription`,
              userData.userImages[index].fileDescription
            );
          }
        }
      }

      try {
        const response = await addCarReservation(formData).unwrap();
        console.log("Rezervasyon başarılı:", response);
        notify.success();

        router.push("/home");
      } catch (error) {
        console.error("Rezervasyon sırasında hata oluştu:", error);

        for (let [key, value] of formData.entries()) {
          console.log(key, value);
        }
        notify.error();
      }
    }
  };
  //Araba içindeki kişilerin kontrolü.
  useEffect(() => {
    if (peopleCount || driverCount) {
      const totalCount = Number(peopleCount);
      if (totalCount > 5) {
        notify.warn({ placeholder: "Arabanın kapasitesini aştınız." });
      } else if (driverCount > peopleCount) {
        notify.warn({ placeholder: "Kişi ve Sürücü sayılarında hata var." });
      }
    }
  }, [peopleCount]);

  //Belgeler için kontrol noktası.
  const filtersEhliyetOn = userData?.userImages.filter(
    (x) => x.isActive == true && x.fileDescription === "Ehliyet Ön"
  );
  const filtersEhliyetArka = userData?.userImages.filter(
    (x) => x.isActive == true && x.fileDescription === "Ehliyet Arka"
  );
  const handleFileUpload = async (event, fileDescriptionStr) => {
    const file = event.target.files[0];
    if (file) {
      const fileDescription = fileDescriptionStr;
      const files = [file];
      try {
        await addUserFile({
          userId: id,
          fileDescription,
          files,
        });
        refetch();
        notify.success();
        console.log("tebrikler dosya yüklednin aferinn");
      } catch (error) {
        console.error("Dosya yükleme hatası:", error);
      }
    }
  };
  const handleChange = () => {
    fileInputRefs.current.click();
  };

  if (isLoading) return <Loading />;
  if (error) return <p>Error loading car data</p>;

  return (
    <div className="w-full lg:flex-1 pr-8 sm:p-8 p-4 py-4 ">
      <TextHeader addClass={`mb-10`}>Rezervasyon Formu</TextHeader>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full"
        encType="multipart/form-data"
        noValidate
      >
        <div className="mb-1">
          <ComboboxField
            options={reasons}
            placeholder="Talep Nedeni Seçin"
            selectedValue={reasons.find(
              (reason) => reason.value === selectedReason
            )}
            onChange={(value) => {
              setValue("reasonForRequest", value.value);
            }}
            labelKey="label"
            valueKey="value"
            buttonClassName="w-60 InputFields items-center md:h-12 h-10 border w-full border-grayColor shadow-sm outline-none px-4 "
            placeholderCombobox="Araç Talep Nedeni"
            labelClassName="labelFields"
          />
        </div>
        <ComboboxField
          options={subReason}
          placeholder={
            selectedSubReason
              ? selectedSubReason.label
              : "Talep Alt Nedeni Seçin"
          }
          selectedValue={selectedSubReason}
          onChange={(subReason) => {
            setValue("subReasonForRequest", subReason.value);
          }}
          labelKey="label"
          valueKey="value"
          buttonClassName="w-60 InputFields md:h-12 h-10 border w-full border-grayColor shadow-sm outline-none px-4 "
          placeholderCombobox="Talep Alt Nedeni"
          labelClassName="labelFields"
        />
        <ControllerFiled
          id="reasonForRequestDetails"
          name="reasonForRequestDetails"
          control={control}
          type="text"
          label="Kullanım Amacı"
          placeholder="Amacınızı detaylandırınız."
        />
        <ControllerFiled
          id="routeStart"
          name="routeStart"
          control={control}
          label="Başlangıç Noktası"
          placeholder="Rotasyon başlangıcı."
        />
        <ControllerFiled
          id="routeEnd"
          name="routeEnd"
          control={control}
          label="Bitiş Noktası"
          placeholder="Rotasyon başlangıcı."
        />
        <InputField
          id="peopleCount"
          name="peopleCount"
          control={control}
          onChange={handlePersonCountInput}
          type="number"
          label="Kişi Sayısı"
          placeholder="Araç işi şoför dahil kişi sayısı."
        />
        <ControllerFiled
          id="driverCount"
          name="driverCount"
          control={control}
          type="number"
          label="Şoför Sayısı"
          placeholder="Şoför sayısı (min. 1)"
          max={2}
          min={1}
        />
        <InputField
          className="sm:w-4 sm:h-4 h-3 w-3  cursor-pointer appearance-none rounded-full border-[1px] border-darkGrayColor/30 checked:bg-redColor"
          type="checkbox"
          label="Şoför Benim"
          checked={isCheck}
          onChange={handleCheckBoxChange}
        />
        <div>
          {isCheck === true ? (
            <>
              <ControllerFiled
                id="nameSurname"
                name="nameSurname"
                control={control}
                label="İsim Soyisim"
                value={userData?.name}
                placeholder={userData?.name}
              />
              <div className="flex flex-col ml-[9em]">
                <label className="flex-shrink-0 w-full sm:text-md text-xs font-medium text-darkColor underline">
                  Lütfen Ehliyetinizin Ön ve Arka yüzünü yükleyiniz.
                </label>
                <div className="flex gap-14">
                  {filtersEhliyetOn && filtersEhliyetOn.length !== 0 ? (
                    filtersEhliyetOn.map((image) => (
                      <div key={image.id}>
                        <UserImage imagePath={image.path} />
                        <p>{image.fileDescription}</p>
                      </div>
                    ))
                  ) : (
                    <div>
                      <Image
                        width={100}
                        height={100}
                        src="/element/uploadFile.png"
                        onClick={handleChange}
                        alt="User Image"
                        fetchpriority="high"
                        className="object-cover rounded-full sm:w-20 sm:h-20 w-14 h-14"
                      />
                      <p>Ehliyet Ön</p>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        ref={(el) => (fileInputRefs.current = el)}
                        onChange={(event) =>
                          handleFileUpload(event, "Ehliyet Ön")
                        }
                      />
                    </div>
                  )}
                  {filtersEhliyetArka && filtersEhliyetArka.length !== 0 ? (
                    filtersEhliyetArka.map((image) => (
                      <div key={image.id}>
                        <UserImage imagePath={image.path} />
                        <p>{image.fileDescription}</p>
                      </div>
                    ))
                  ) : (
                    <div>
                      <Image
                        width={100}
                        height={100}
                        src="/element/uploadFile.png"
                        onClick={handleChange}
                        alt="User Image"
                        fetchpriority="high"
                        className="object-cover rounded-full sm:w-20 sm:h-20 w-14 h-14"
                      />
                      <p>Ehliyet Arka</p>
                      <input
                        type="file"
                        style={{ display: "none" }}
                        ref={(el) => (fileInputRefs.current = el)}
                        onChange={(event) =>
                          handleFileUpload(event, "Ehliyet Arka")
                        }
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <ControllerFiled
                  id="sicil"
                  name="sicil"
                  control={control}
                  label="Sicil No"
                  value={userData?.sicil}
                  placeholder={userData?.sicil}
                />
              </div>
              {personArray.map((_, index) => (
                <div key={index}>
                  <ControllerFiled
                    id={`nameSurname-${index}`} // Benzersiz id
                    name={`nameSurname-${index}`} // Benzersiz name
                    control={control}
                    label={`İsim Soyisim (Kişi ${index + 1})`}
                    placeholder="Aracı kiralayacak kişinin isim/soyisim."
                  />
                  <ControllerFiled
                    id={`tc-${index}`} // Benzersiz id
                    name={`tc-${index}`} // Benzersiz name
                    type="text"
                    control={control}
                    label={`TC (Kişi ${index + 1})`}
                    placeholder="Aracı kiralayacak kişinin TC."
                  />
                  <ControllerFiled
                    id={`sicil-${index}`} // Benzersiz id
                    name={`sicil-${index}`} // Benzersiz name
                    control={control}
                    label={`Sicil No (Kişi ${index + 1})`}
                    placeholder="Aracı kiralayacak kişinin Sicil No."
                  />
                  <InputField
                    className="sm:w-4 sm:h-4 h-3 w-3 cursor-pointer appearance-none rounded-full border-[1px] border-darkGrayColor/30 checked:bg-redColor"
                    type="checkbox"
                    label="Şoför mü?"
                    checked={isCheckDriver[index]}
                    onChange={(e) => handleCheckDriverBoxChange(e, index)}
                  />
                  {isCheckDriver[index] && (
                    <div>
                      <Controller
                        name={`files-${index}`} // Benzersiz name
                        control={control}
                        render={({ field: { onChange } }) => (
                          <div className="w-full">
                            <label className="flex-shrink-0 w-36 md:text-sm text-xs font-medium capitalize text-darkColor">
                              Ehliyet/SRC Belgesi (Kişi {index + 1})
                            </label>
                            <input
                              id={`files-${index}`} // Benzersiz id
                              className="sm:ml-[0.4em] -ml-[0.8em]"
                              type="file"
                              onChange={(e) => {
                                onChange(e.target.files);
                                handleFileChange(e);
                              }}
                              multiple
                            />
                            {Object.keys(fileDescriptions).map((fileName) => (
                              <div
                                key={`${fileName}-${index}`} // Benzersiz key
                                className="mt-4 w-full flex justify-between items-center"
                              >
                                <InputField
                                  required
                                  label={`${fileName} (Kişi ${index + 1})`}
                                  id={`description-${fileName}-${index}`} // Benzersiz id
                                  type="text"
                                  placeholder="Açıklama"
                                  value={fileDescriptions[fileName]}
                                  onChange={(e) =>
                                    handleDescriptionChange(
                                      fileName,
                                      e.target.value
                                    )
                                  }
                                />
                                <button
                                  type="button"
                                  className="buttonDelete h-10"
                                  onClick={() => handleRemoveFile(fileName)}
                                >
                                  Kaldır
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      />
                      <label className="flex-shrink-0 w-36 sm:text-md text-xs font-medium text-darkColor underline">
                        Lütfen Ehliyetinizin Ön ve Arka yüzünü yükleyiniz (Kişi{" "}
                        {index + 1}).{" "}
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            personArray.map((item, index) => (
              <div key={index}>
                <ControllerFiled
                  id={`nameSurname-${index}`} // Benzersiz id
                  name={`nameSurname-${index}`} // Benzersiz name
                  control={control}
                  label="İsim Soyisim"
                  placeholder={`Aracı kiralayacak kişinin isim/ soyisim (Kişi ${
                    index + 1
                  }).`}
                />
                <ControllerFiled
                  id={`tc-${index}`} // Benzersiz id
                  name={`tc-${index}`} // Benzersiz name
                  type="text"
                  control={control}
                  label="TC"
                  placeholder={`Aracı kiralayacak kişinin TC (Kişi ${
                    index + 1
                  }).`}
                />
                <ControllerFiled
                  id={`sicil-${index}`} // Benzersiz id
                  name={`sicil-${index}`} // Benzersiz name
                  control={control}
                  label="Sicil No"
                  placeholder={`Aracı kiralayacak kişinin Sicil No (Kişi ${
                    index + 1
                  }).`}
                />
                <InputField
                  className="sm:w-4 sm:h-4 h-3 w-3 cursor-pointer appearance-none rounded-full border-[1px] border-darkGrayColor/30 checked:bg-redColor"
                  type="checkbox"
                  label="Şoför mü?"
                  checked={isCheckDriver[index]} // Her bir checkbox için durumu al
                  onChange={(e) => handleCheckDriverBoxChange(e, index)}
                />
                {isCheckDriver[index] && (
                  <div>
                    <Controller
                      name={`files-${index}`} // Benzersiz name
                      control={control}
                      render={({ field: { onChange } }) => (
                        <div className="w-full">
                          <label className="flex-shrink-0 w-36 md:text-sm text-xs font-medium capitalize text-darkColor">
                            Ehliyet/SRC Belgesi (Kişi {index + 1})
                          </label>
                          <input
                            id={`files-${index}`} // Benzersiz id
                            className="sm:ml-[0.4em] -ml-[0.8em]"
                            type="file"
                            onChange={(e) => {
                              onChange(e.target.files);
                              handleFileChange(e);
                            }}
                            multiple
                          />
                          {Object.keys(fileDescriptions).map((fileName) => (
                            <div
                              key={`${fileName}-${index}`} // Benzersiz key
                              className="mt-4 w-full flex justify-between items-center"
                            >
                              <InputField
                                required
                                label={`${fileName} (Kişi ${index + 1})`}
                                id={`description-${fileName}-${index}`} // Benzersiz id
                                type="text"
                                placeholder="Açıklama"
                                value={fileDescriptions[fileName]}
                                onChange={(e) =>
                                  handleDescriptionChange(
                                    fileName,
                                    e.target.value
                                  )
                                }
                              />
                              <button
                                type="button"
                                className="buttonDelete h-10"
                                onClick={() => handleRemoveFile(fileName)}
                              >
                                Kaldır
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                    <label className="flex-shrink-0 w-36 sm:text-md text-xs font-medium text-darkColor underline">
                      Lütfen Ehliyetinizin Ön ve Arka yüzünü yükleyiniz (Kişi{" "}
                      {index + 1}).{" "}
                    </label>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <button className="button my-6 relative left-36 " type="submit">
          Rezervasyonu Tamamla
        </button>
      </form>
      <ToastContainer draggable={true} autoClose={1000} />
    </div>
  );
};

export default ReservationLoginCustom;
//<label htmlFor={`description-${fileName}`}>{fileName}</label>
