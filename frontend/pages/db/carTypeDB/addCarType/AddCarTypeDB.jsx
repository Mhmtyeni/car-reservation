import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { notify } from "../../../../utils/notifications";
import InputField from "../../../../components/ui/InputField";
import { MdAdd } from "react-icons/md";
import { useAddCarTypeMutation } from "../../../slices/carType";

const AddCarTypeDB = ({ closeModal }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      carTypes: [{ carTypeName: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "carTypes",
  });
  const [addCarType] = useAddCarTypeMutation();

  const onSubmit = async (data) => {
    try {
      for (const carType of data.carTypes) {
        if (carType.carTypeName.trim()) {
          await addCarType(carType).unwrap();
        }
      }
      notify.success();
      reset();
      closeModal();
    } catch (err) {
      notify.error("Yeni car type eklenirken bir hata oluştu.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-10 border-collapse border-t-4 border-dashed p-4 my-2 ">
        <h2 className="text-md font-bold">Add carTypes</h2>
        <button
          type="button"
          title="add brand"
          className=" text-darkGrayColor flex items-center "
          onClick={() => append({ carTypeName: "" })}
        >
          Araç Tipi ekle
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
                name={`carTypes[${index}].carTypeName`}
                control={control}
                defaultValue={item.carTypeName}
                render={({ field }) => (
                  <InputField
                    {...field}
                    name={`carTypes[${index}].carTypeName`}
                    type="text"
                    label={"Car Type Name"}
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
          Add Car Types
        </button>
        <button className="buttonDelete" onClick={closeModal}>
          Exit
        </button>
      </form>
    </div>
  );
};

export default AddCarTypeDB;
