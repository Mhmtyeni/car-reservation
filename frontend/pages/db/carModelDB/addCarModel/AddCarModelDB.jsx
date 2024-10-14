import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { notify } from "../../../../utils/notifications";
import InputField from "../../../../components/ui/InputField";
import { MdAdd } from "react-icons/md";
import { useAddCarModelMutation } from "../../../slices/carModel";
import { useGetBrandsQuery } from "../../../slices/carBrands";

const AddCarModelDB = ({ closeModal }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      carModels: [{ carModelName: "", carBrandId: "" }],
    },
  });
  const { data: brandsData } = useGetBrandsQuery({ page: 0, size: 50 });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "carModels",
  });
  const [addCarModel] = useAddCarModelMutation();
  const brands = brandsData?.carBrands || [];

  const onSubmit = async (data) => {
    try {
      // Verileri API'ye göndermek
      for (const carmodel of data.carModels) {
        if (carmodel.carModelName.trim()) {
          await addCarModel(carmodel).unwrap();
        }
      }
      notify.success();
      reset();
      closeModal();
    } catch (err) {
      console.error("Yeni model eklenirken bir hata oluştu.", err);
      notify.error("Yeni model eklenirken bir hata oluştu.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-10 border-collapse border-t-4 border-dashed p-4 my-2 ">
        <h2 className="text-md font-bold">Add Car Model</h2>
        <button
          type="button"
          title="add car model"
          className=" text-darkGrayColor flex items-center "
          onClick={() => append({ carModelName: "", carBrandId: "" })}
        >
          Model ekle
          <MdAdd className="h-4 w-4" />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="h-44 overflow-y-auto  scroll ">
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="mb-4 flex items-center px-4 gap-2 hover:bg-darkGrayColor/15  "
            >
              <Controller
                name={`carModels[${index}].carModelName`}
                control={control}
                defaultValue={item.carModelName}
                render={({ field }) => (
                  <InputField
                    {...field}
                    name={`carModels[${index}].carModelName`}
                    type="text"
                    label={"Model "}
                  />
                )}
              />

              <Controller
                name={`carModels[${index}].carBrandId`}
                control={control}
                defaultValue={item.carBrandId || ""}
                render={({ field }) => (
                  <InputField
                    {...field}
                    name={`carModels[${index}].carBrandId`}
                    type="options"
                    label="Marka"
                    options={brands.map((brand) => ({
                      value: brand.id,
                      label: brand.carBrandName,
                    }))}
                  />
                )}
              />
              {fields.length > 1 && (
                <button
                  type="button"
                  className="text-2xl"
                  onClick={() => remove(index)}
                >
                  x{" "}
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="buttonEdit items-center justify-center my-7"
        >
          Add Car Models
        </button>
        <button className="buttonDelete" onClick={closeModal}>
          Exit
        </button>
      </form>
    </div>
  );
};

export default AddCarModelDB;
