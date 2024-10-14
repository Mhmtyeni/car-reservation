import React, { useEffect, useState } from "react";
import {
  useGetCarCaseTypeQuery,
  usePutCarCaseTypeMutation,
} from "../../../../slices/carCaseType";
import InputField from "../../../../../components/ui/InputField";
import { notify } from "../../../../../utils/notifications";

const EditCarCaseDB = ({ id, closeModal }) => {
  const [carCaseTypeName, setCarCaseTypeName] = useState("");
  const { data: carcase, refetch } = useGetCarCaseTypeQuery(id);
  const [updateCarCase] = usePutCarCaseTypeMutation();

  useEffect(() => {
    if (carcase) {
      setCarCaseTypeName(carcase.carCaseTypeName);
    }
  }, [carcase]);

  const handleUpdate = async () => {
    if (!carCaseTypeName) {
      alert("Company name cannot be empty.");
      return;
    }

    const updatedCarCase = {
      carCaseTypeId: id,
      carCaseTypeName,
    };

    try {
      await updateCarCase(updatedCarCase).unwrap();
      notify.success();
      refetch();
      closeModal();
    } catch (err) {
      console.error("Error updating car case", err);
    }
  };
  return (
    <div className="flex flex-col ">
      <div className="flex- flex-col items-center justify-between mt-10 border-collapse border-t-4 border-dashed p-4 my-2 ">
        <h2 className="text-md font-bold">Add Car Case</h2>
        <InputField
          label={"Car Case Name"}
          type="text"
          value={carCaseTypeName}
          onChange={(e) => setCarCaseTypeName(e.target.value)}
          placeholder="Enter new car case name"
        />
      </div>
      <div>
        <button className="buttonEdit" onClick={handleUpdate}>
          Update Car Case
        </button>
        <button className="buttonDelete" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditCarCaseDB;
