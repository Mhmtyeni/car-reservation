import React, { useRef } from "react";
import InputField from "../ui/InputField";
import {
  useAddUserUploadFileMutation,
  useDeleteUserFileMutation,
  useGetUserQuery,
} from "../../pages/slices/userApi";
import Cookies from "js-cookie";
import { notify } from "../../utils/notifications";
import UserImage from "../ui/UserImage";
import Image from "next/image";

const Account = () => {
  const id = Cookies.get("userId");
  const fileInputRefs = useRef({});
  const { data: userForm, refetch } = useGetUserQuery(id);
  const [addUserFile] = useAddUserUploadFileMutation();
  const [deleteUserFile] = useDeleteUserFileMutation();

  // Profil fotoğrafı yükleme
  const handleFileBeforeUpload = async (event, fileDesc) => {
    const file = event.target.files[0];
    if (file) {
      try {
        await addUserFile({
          userId: id,
          fileDescription: fileDesc,
          files: [file],
        });
        refetch();
        notify.success();
        console.log("Dosya başarıyla yüklendi!");
      } catch (error) {
        console.error("Dosya yükleme hatası:", error);
      }
    }
  };

  // Mevcut resmi değiştirme ve güncelleme
  const handleFileUpload = async (event, imagesss) => {
    const file = event.target.files[0];
    if (file) {
      try {
        await addUserFile({
          userId: id,
          fileDescription: imagesss.fileDescription,
          files: [file],
        });
        await deleteUserFile(imagesss.id);
        refetch();
        notify.success();
        console.log("Dosya başarıyla güncellendi!");
      } catch (error) {
        console.error("Dosya güncelleme hatası:", error);
      }
    }
  };

  // Dosya inputuna tıklama işlemi
  const handleChange = (imagesss) => {
    if (fileInputRefs.current[imagesss?.id]) {
      fileInputRefs.current[imagesss.id].click();
    }
  };

  // Boş inputa tıklama işlemi
  const handleBEforeChange = () => {
    if (fileInputRefs.current) {
      fileInputRefs.current.click();
    }
  };

  // Filtrelenmiş görüntüler
  const filteredImages = userForm?.userImages?.filter(
    (x) => x.isActive === true && x.fileDescription === "Profil Fotoğrafı"
  );
  const filtersEhliyetOn = userForm?.userImages?.filter(
    (x) => x.isActive === true && x.fileDescription === "Ehliyet Ön"
  );
  const filtersEhliyetArka = userForm?.userImages?.filter(
    (x) => x.isActive === true && x.fileDescription === "Ehliyet Arka"
  );

  return (
    <form className="w-auto p-8 grid">
      <div className="flex gap-8">
        {/* Profil Fotoğrafı */}
        {filteredImages?.length > 0 ? (
          filteredImages.map((imagesss) => (
            <div key={imagesss.id} onClick={() => handleChange(imagesss)}>
              <UserImage imagePath={imagesss.path} />
              <p>{imagesss.fileDescription}</p>
              <input
                type="file"
                style={{ display: "none" }}
                ref={(el) => {
                  if (el && imagesss?.id) {
                    fileInputRefs.current[imagesss.id] = el;
                  }
                }}
                onChange={(event) => handleFileUpload(event, imagesss)}
              />
            </div>
          ))
        ) : (
          <div className="">
            <Image
              width={100}
              height={100}
              src="/element/uploadFile.png"
              onClick={handleBEforeChange}
              alt="Profil Fotoğrafı"
              className="object-cover rounded-full"
            />
            <p>Profil Fotoğrafı</p>
            <input
              type="file"
              style={{ display: "none" }}
              ref={(el) => (fileInputRefs.current = el)}
              onChange={(event) =>
                handleFileBeforeUpload(event, "Profil Fotoğrafı")
              }
            />
          </div>
        )}

        {/* Ehliyet Ön Fotoğrafı */}
        {filtersEhliyetOn?.length > 0 ? (
          filtersEhliyetOn.map((imagesss) => (
            <div key={imagesss.id} onClick={() => handleChange(imagesss)}>
              <UserImage imagePath={imagesss.path} />
              <p>{imagesss.fileDescription}</p>
              <input
                type="file"
                style={{ display: "none" }}
                ref={(el) => {
                  if (el) fileInputRefs.current[imagesss.id] = el;
                }}
                onChange={(event) => handleFileUpload(event, imagesss)}
              />
            </div>
          ))
        ) : (
          <div className="">
            <Image
              width={100}
              height={100}
              src="/element/uploadFile.png"
              onClick={handleBEforeChange}
              alt="Ehliyet Ön"
              className="object-cover rounded-full"
            />
            <p>Ehliyet Ön</p>
            <input
              type="file"
              style={{ display: "none" }}
              ref={(el) => (fileInputRefs.current = el)}
              onChange={(event) => handleFileBeforeUpload(event, "Ehliyet Ön")}
            />
          </div>
        )}
        {/* Ehliyet Arka Fotoğrafı */}
        {filtersEhliyetOn?.length > 0 ? (
          filtersEhliyetArka?.length > 0 ? (
            filtersEhliyetArka.map((imagesss) => (
              <div key={imagesss.id} onClick={() => handleChange(imagesss)}>
                <UserImage imagePath={imagesss.path} />
                <p>{imagesss.fileDescription}</p>
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={(el) => {
                    if (el) fileInputRefs.current[imagesss.id] = el;
                  }}
                  onChange={(event) => handleFileUpload(event, imagesss)}
                />
              </div>
            ))
          ) : (
            <div className="">
              <Image
                width={100}
                height={100}
                src="/element/uploadFile.png"
                onClick={handleBEforeChange}
                alt="Ehliyet Arka"
                className="object-cover rounded-full"
              />
              <p>Ehliyet Arka</p>
              <input
                type="file"
                style={{ display: "none" }}
                ref={(el) => (fileInputRefs.current = el)}
                onChange={(event) =>
                  handleFileBeforeUpload(event, "Ehliyet Arka")
                }
              />
            </div>
          )
        ) : (
          <p></p>
        )}
      </div>

      {/* Form Alanları */}
      <div>
        <InputField
          name="sicil"
          value={userForm?.sicil}
          type="text"
          label="Sicil Numarası"
        />
      </div>
      <div>
        <InputField
          name="email"
          value={userForm?.email}
          type="text"
          label="E mail"
        />
      </div>
      <div>
        <InputField
          name="name"
          value={userForm?.name}
          type="text"
          label="İsim"
        />
      </div>
      <div>
        <InputField
          name="surname"
          value={userForm?.surname}
          type="text"
          label="Soyisim"
        />
      </div>
      <div>
        <InputField
          name="userName"
          value={userForm?.userName}
          type="text"
          label="Kullanıcı Adı"
        />
      </div>
      <button className="button mb-7" type="submit">
        Profili Tamamla
      </button>
    </form>
  );
};

export default Account;
