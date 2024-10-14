import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { notify } from "../../../../utils/notifications";
import InputField from "../../../../components/ui/InputField";
import { MdAdd } from "react-icons/md";
import { useAddReservationStatusMutation } from "../../../slices/reservationStatuses";

const AddRezStatusDB = ({ closeModal }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      rezStatuses: [{ statusName: "" }], // Başlangıçta bir marka giriş alanı
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rezStatuses",
  });
  const [addStatus] = useAddReservationStatusMutation();

  const onSubmit = async (data) => {
    try {
      for (const rezStatus of data.rezStatuses) {
        if (rezStatus.statusName.trim()) {
          await addStatus(rezStatus).unwrap();
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
        <h2 className="text-md font-bold">Add Rez. Status</h2>
        <button
          type="button"
          title="add rezStatus"
          className=" text-darkGrayColor flex items-center "
          onClick={() => append({ statusName: "" })}
        >
          Status ekle
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
                name={`rezStatuses[${index}].statusName`}
                control={control}
                defaultValue={item.statusName}
                render={({ field }) => (
                  <InputField
                    {...field}
                    name={`rezStatuses[${index}].statusName`}
                    type="text"
                    label={"rezStatus Name"}
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
          Add Rez. Status
        </button>
        <button className="buttonDelete" onClick={closeModal}>
          EXİT
        </button>
      </form>
    </div>
  );
};

export default AddRezStatusDB;
