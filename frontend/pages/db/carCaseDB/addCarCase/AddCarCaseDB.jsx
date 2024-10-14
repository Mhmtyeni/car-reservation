import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { notify } from "../../../../utils/notifications";
import InputField from "../../../../components/ui/InputField";
import { MdAdd } from "react-icons/md";
import { useAddCarCaseTypeMutation } from "../../../slices/carCaseType";

const AddCarCaseDB = ({ closeModal }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      carCaseType: [{ carCaseTypeName: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "carCaseType",
  });
  const [addCarCase] = useAddCarCaseTypeMutation();

  const onSubmit = async (data) => {
    try {
      for (const carCase of data.carCaseType) {
        if (carCase.carCaseTypeName.trim()) {
          await addCarCase(carCase).unwrap();
        }
      }
      notify.success();
      reset();
      closeModal();
    } catch (err) {
      console.error("Yeni kasa tipi eklenirken bir hata oluştu.", err);
      notify.error("Yeni kasa tipi eklenirken bir hata oluştu.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-10 border-collapse border-t-4 border-dashed p-4 my-2 ">
        <h2 className="text-md font-bold">Add Kasa Tipi</h2>
        <button
          type="button"
          title="add car case"
          className=" text-darkGrayColor flex items-center "
          onClick={() => append({ carCaseTypeName: "" })}
        >
          Kasa Tipi ekle
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
                name={`carCaseType[${index}].carCaseTypeName`}
                control={control}
                defaultValue={item.carCaseTypeName}
                render={({ field }) => (
                  <InputField
                    {...field}
                    name={`carCaseType[${index}].carCaseTypeName`}
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
          Add Car Case
        </button>
        <button className="buttonDelete" onClick={closeModal}>
          EXİT
        </button>
      </form>
    </div>
  );
};

export default AddCarCaseDB;
