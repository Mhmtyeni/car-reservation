import React, { useState, useEffect } from "react";

import { notify } from "../../../../../utils/notifications";
import InputField from "../../../../../components/ui/InputField";
import {
  useGetReservationStatusQuery,
  useUpdateReservationStatusMutation,
} from "../../../../slices/reservationStatuses";

const EditRezStatusDB = ({ id, closeModal }) => {
  const {
    data: rezStatusData,
    isLoading,
    error,
    refetch,
  } = useGetReservationStatusQuery(id, {
    skip: !id,
  });
  const [statusName, setStatusName] = useState("");

  const [updateStatus] = useUpdateReservationStatusMutation();

  useEffect(() => {
    if (rezStatusData) {
      setStatusName(rezStatusData.statusName);
    }
  }, [rezStatusData]);

  const handleUpdate = async () => {
    if (!statusName) {
      alert("Rez. Status name cannot be empty.");
      return;
    }

    const updatedStatus = {
      statusId: id,
      statusName,
    };

    try {
      await updateStatus(updatedStatus).unwrap();
      notify.success();
      refetch();
      closeModal();
    } catch (err) {
      console.error("Error updating Rez. Status", err);
    }
  };

  if (isLoading) return <p>Loading Rez. Status details...</p>;
  if (error) return <p>Error loading Rez. Status details: {error.message}</p>;

  return (
    <div className="flex flex-col ">
      <div className="flex- flex-col items-center justify-between mt-10 border-collapse border-t-4 border-dashed p-4 my-2 ">
        <h2 className="text-md font-bold">Add Rez. Status</h2>
        <InputField
          label={"Rez. Status Name"}
          type="text"
          value={statusName}
          onChange={(e) => setStatusName(e.target.value)}
          placeholder="Enter new Rez. Status name"
        />
      </div>
      <div>
        <button className="buttonEdit" onClick={handleUpdate}>
          Update Rez. Status
        </button>
        <button className="buttonDelete" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditRezStatusDB;
