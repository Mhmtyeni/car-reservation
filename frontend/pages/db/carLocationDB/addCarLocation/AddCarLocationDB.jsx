import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { notify } from "../../../../utils/notifications";
import InputField from "../../../../components/ui/InputField";
import { MdAdd } from "react-icons/md";
import { useAddLocationMutation } from "../../../slices/carLocations";

const AddCarLocationDB = ({ closeModal }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      carLocations: [{ locationName: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "carLocations",
  });
  const [addCarLocation] = useAddLocationMutation();

  const onSubmit = async (data) => {
    try {
      for (const location of data.carLocations) {
        if (location.locationName.trim()) {
          await addCarLocation(location).unwrap();
        }
      }
      notify.success();
      reset();
      closeModal();
    } catch (err) {
      console.error("Yeni locations eklenirken bir hata oluştu.", err);
      notify.error("Yeni locations eklenirken bir hata oluştu.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-10 border-collapse border-t-4 border-dashed p-4 my-2 ">
        <h2 className="text-md font-bold">Add Car Locations</h2>
        <button
          type="button"
          title="add location"
          className=" text-darkGrayColor flex items-center "
          onClick={() => append({ locationName: "" })}
        >
          Location ekle
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
                name={`carLocations[${index}].locationName`}
                control={control}
                defaultValue={item.locationName}
                render={({ field }) => (
                  <InputField
                    {...field}
                    name={`carLocations[${index}].locationName`}
                    type="text"
                    label={"location Name"}
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
          Add Location
        </button>
        <button className="buttonDelete" onClick={closeModal}>
          Exit
        </button>
      </form>
    </div>
  );
};

export default AddCarLocationDB;
