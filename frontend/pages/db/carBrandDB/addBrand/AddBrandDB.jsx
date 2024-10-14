import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useAddBrandMutation } from "../../../slices/carBrands";
import { notify } from "../../../../utils/notifications";
import InputField from "../../../../components/ui/InputField";
import { MdAdd } from "react-icons/md";

const AddBrandsDB = ({ closeModal }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      brands: [{ carBrandName: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "brands",
  });
  const [addBrand] = useAddBrandMutation();

  const onSubmit = async (data) => {
    try {
      for (const brand of data.brands) {
        if (brand.carBrandName.trim()) {
          await addBrand(brand).unwrap();
        }
      }
      notify.success();
      reset();
      closeModal();
    } catch (err) {
      console.error("Yeni markalar eklenirken bir hata oluştu.", err);
      notify.error("Yeni markalar eklenirken bir hata oluştu.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-10 border-collapse border-t-4 border-dashed p-4 my-2 ">
        <h2 className="text-md font-bold">Add Brands</h2>
        <button
          type="button"
          title="add brand"
          className=" text-darkGrayColor flex items-center "
          onClick={() => append({ carBrandName: "" })}
        >
          Marka ekle
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
                name={`brands[${index}].carBrandName`}
                control={control}
                defaultValue={item.carBrandName}
                render={({ field }) => (
                  <InputField
                    {...field}
                    name={`brands[${index}].carBrandName`}
                    type="text"
                    label={"Brand Name"}
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
          Add Brands
        </button>
        <button className="buttonDelete" onClick={closeModal}>
          EXİT
        </button>
      </form>
    </div>
  );
};

export default AddBrandsDB;
