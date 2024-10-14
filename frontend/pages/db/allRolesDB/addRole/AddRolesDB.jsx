import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { notify } from "../../../../utils/notifications";
import InputField from "../../../../components/ui/InputField";
import { MdAdd } from "react-icons/md";
import { useAddRolesMutation } from "../../../slices/userRoles";

const AddRolesDB = ({ closeModal }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      roleData: [{ name: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "roleData",
  });
  const [addRole] = useAddRolesMutation();

  const onSubmit = async (data) => {
    try {
      for (const role of data.roleData) {
        if (role.name.trim()) {
          await addRole(role).unwrap();
        }
      }
      notify.success();
      reset();
      closeModal();
    } catch (err) {
      console.error("Yeni rol eklenirken bir hata oluştu.", err);
      notify.error("Yeni rol eklenirken bir hata oluştu.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-10 border-collapse border-t-4 border-dashed p-4 my-2 ">
        <h2 className="text-md font-bold">Add Role</h2>
        <button
          type="button"
          title="add car case"
          className=" text-darkGrayColor flex items-center "
          onClick={() => append({ name: "" })}
        >
          Rol ekle
          <MdAdd className="h-4 w-4" />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="h-44 overflow-y-auto  scroll ">
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="mb-4 flex items-center px-4 hover:bg-darkGrayColor/15  justify-between "
            >
              <Controller
                name={`roleData[${index}].name`}
                control={control}
                defaultValue={item.name}
                render={({ field }) => (
                  <InputField
                    {...field}
                    name={`roleData[${index}].name`}
                    type="text"
                    label={"Car Case Name"}
                  />
                )}
              />

              {fields.length > 1 && (
                <button
                  type="button"
                  className="text-2xl"
                  onClick={() => remove(index)}
                >
                  &times;
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="buttonEdit items-center justify-center my-7"
        >
          Add Role
        </button>
        <button className="buttonDelete" onClick={closeModal}>
          EXİT
        </button>
      </form>
    </div>
  );
};

export default AddRolesDB;
