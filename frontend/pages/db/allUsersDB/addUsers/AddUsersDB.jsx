import React from "react";
import { useForm, Controller } from "react-hook-form";
import { notify } from "../../../../utils/notifications";
import InputField from "../../../../components/ui/InputField";
import { useAddUserMutation } from "../../../slices/userApi";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AddUsersDB = ({ closeModal }) => {
  const router = useRouter();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      surname: "",
      sicil: "",
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const [addUser] = useAddUserMutation();

  // Dinamik olarak form alanlarını tanımlamak
  const formFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "surname", label: "Surname", type: "text" },
    { name: "sicil", label: "Sicil", type: "text" },
    { name: "username", label: "Username", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "passwordConfirm", label: "Confirm Password", type: "password" },
  ];

  const onSubmit = async (data) => {
    try {
      if (data.password !== data.passwordConfirm) {
        notify.error("Passwords do not match.");
        return;
      }
      const userPayload = {
        email: data.email,
        name: data.name,
        surname: data.surname,
        sicil: data.sicil,
        userName: data.username,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        twoFactorEnabled: false, // Varsayılan değer
        userRoles: [],
        userImages: [],
      };
      await addUser(userPayload).unwrap();
      notify.success();
      reset();
      closeModal();
      router.push("/login");
    } catch (err) {
      console.error("Error while adding user", err);
      notify.error("Error while adding user");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center "
    >
      {formFields.map((field) => (
        <Controller
          key={field.name}
          name={field.name}
          control={control}
          render={({ field: inputField }) => (
            <InputField
              {...inputField}
              type={field.type}
              label={field.label}
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
          )}
        />
      ))}
      <div className="flex items-center justify-center gap-6">
        <button
          type="submit"
          className="button items-center justify-center my-7"
        >
          Add User
        </button>
        <Link
          href="/"
          type="button"
          className="buttonDelete"
          onClick={closeModal}
        >
          Exit
        </Link>
      </div>
    </form>
  );
};

export default AddUsersDB;

// import React from "react";
// import { useForm, useFieldArray, Controller } from "react-hook-form";
// import { notify } from "../../../../utils/notifications";
// import InputField from "../../../../components/ui/InputField";
// import { MdAdd } from "react-icons/md";
// import { useAddUserMutation } from "../../../slices/userApi";

// const AddUsersDB = ({ closeModal }) => {
//   const { control, handleSubmit, reset } = useForm({
//     defaultValues: {
//       usersAdd: [{ name: "", surname: "", sicil: "", username: "", email: "", password: "", passwordConfirm: "" }],
//     },
//   });
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "usersAdd",
//   });
//   const [addCompany] = useAddUserMutation();

//   const onSubmit = async (data) => {
//     try {
//       for (const user of data.usersAdd) {
//         // Tüm alanların doldurulmuş olması kontrolü yapılabilir
//         if (user.name.trim() && user.surname.trim() && user.sicil.trim() && user.username.trim() && user.email.trim() && user.password.trim() && user.passwordConfirm.trim()) {
//           await addCompany(user).unwrap();
//         }
//       }
//       notify.success();
//       reset();
//       closeModal();
//     } catch (err) {
//       console.error("Yeni kullanıcı eklenirken bir hata oluştu.", err);
//       notify.error("Yeni kullanıcı eklenirken bir hata oluştu.");
//     }
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-between mt-10 border-collapse border-t-4 border-dashed p-4 my-2 ">
//         <h2 className="text-md font-bold">Add Users</h2>
//         <button
//           type="button"
//           title="add user"
//           className=" text-darkGrayColor flex items-center "
//           onClick={() => append({ name: "", surname: "", sicil: "", username: "", email: "", password: "", passwordConfirm: "" })}
//         >
//           user ekle
//           <MdAdd className="h-4 w-4" />
//         </button>
//       </div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="h-44 overflow-y-auto scroll ">
//           {fields.map((item, index) => (
//             <div
//               key={item.id}
//               className="mb-4 flex flex-col px-4 hover:bg-darkGrayColor/15  justify-between "
//             >
//               <Controller
//                 name={`usersAdd[${index}].name`}
//                 control={control}
//                 defaultValue={item.name}
//                 render={({ field }) => (
//                   <InputField
//                     {...field}
//                     name={`usersAdd[${index}].name`}
//                     type="text"
//                     label={"Name"}
//                   />
//                 )}
//               />
//               <Controller
//                 name={`usersAdd[${index}].surname`}
//                 control={control}
//                 defaultValue={item.surname}
//                 render={({ field }) => (
//                   <InputField
//                     {...field}
//                     name={`usersAdd[${index}].surname`}
//                     type="text"
//                     label={"Surname"}
//                   />
//                 )}
//               />
//               <Controller
//                 name={`usersAdd[${index}].sicil`}
//                 control={control}
//                 defaultValue={item.sicil}
//                 render={({ field }) => (
//                   <InputField
//                     {...field}
//                     name={`usersAdd[${index}].sicil`}
//                     type="text"
//                     label={"Sicil"}
//                   />
//                 )}
//               />
//               <Controller
//                 name={`usersAdd[${index}].username`}
//                 control={control}
//                 defaultValue={item.username}
//                 render={({ field }) => (
//                   <InputField
//                     {...field}
//                     name={`usersAdd[${index}].username`}
//                     type="text"
//                     label={"Username"}
//                   />
//                 )}
//               />
//               <Controller
//                 name={`usersAdd[${index}].email`}
//                 control={control}
//                 defaultValue={item.email}
//                 render={({ field }) => (
//                   <InputField
//                     {...field}
//                     name={`usersAdd[${index}].email`}
//                     type="email"
//                     label={"Email"}
//                   />
//                 )}
//               />
//               <Controller
//                 name={`usersAdd[${index}].password`}
//                 control={control}
//                 defaultValue={item.password}
//                 render={({ field }) => (
//                   <InputField
//                     {...field}
//                     name={`usersAdd[${index}].password`}
//                     type="password"
//                     label={"Password"}
//                   />
//                 )}
//               />
//               <Controller
//                 name={`usersAdd[${index}].passwordConfirm`}
//                 control={control}
//                 defaultValue={item.passwordConfirm}
//                 render={({ field }) => (
//                   <InputField
//                     {...field}
//                     name={`usersAdd[${index}].passwordConfirm`}
//                     type="password"
//                     label={"Confirm Password"}
//                   />
//                 )}
//               />

//               {fields.length > 1 && (
//                 <button
//                   type="button"
//                   className="text-2xl"
//                   onClick={() => remove(index)}
//                 >
//                   &times;
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>

//         <button
//           type="submit"
//           className="buttonEdit items-center justify-center my-7"
//         >
//           Add Users
//         </button>
//         <button className="buttonDelete" onClick={closeModal}>
//           Exit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddUsersDB;
