import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { notify } from "../../../../utils/notifications";
import InputField from "../../../../components/ui/InputField";
import { MdAdd } from "react-icons/md";
import { useAddEngineTypeMutation } from "../../../slices/carEngineType";

const AddEngineTypeDB = ({ closeModal }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      engineType: [{ carEngineTypeName: "" }], // Başlangıçta bir Motor Type giriş alanı
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "engineType",
  });
  const [addEngineType] = useAddEngineTypeMutation();

  const onSubmit = async (data) => {
    try {
      // Verileri API'ye göndermek
      for (const engineType of data.engineType) {
        if (engineType.carEngineTypeName.trim()) {
          await addEngineType(engineType).unwrap();
        }
      }
      notify.success();
      reset(); // Formu sıfırla
      closeModal(); // Modal'ı kapat
    } catch (err) {
      console.error("Yeni Motor Type eklenirken bir hata oluştu.", err);
      notify.error("Yeni Motor Type eklenirken bir hata oluştu.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-10 border-collapse border-t-4 border-dashed p-4 my-2 ">
        <h2 className="text-md font-bold">Add Motor Type</h2>
        <button
          type="button"
          title="Add Engine Type"
          className=" text-darkGrayColor flex items-center "
          onClick={() => append({ carEngineTypeName: "" })}
        >
          Motor Type ekle
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
                name={`engineType[${index}].carEngineTypeName`}
                control={control}
                defaultValue={item.carEngineTypeName}
                render={({ field }) => (
                  <InputField
                    {...field}
                    name={`engineType[${index}].carEngineTypeName`}
                    type="text"
                    label={"Engine Type Name"}
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
          Add engineType
        </button>
        <button className="buttonDelete" onClick={closeModal}>
          EXİT
        </button>
      </form>
    </div>
  );
};

export default AddEngineTypeDB;
