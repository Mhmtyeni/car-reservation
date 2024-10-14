import React, { useState, useEffect } from "react";

import { notify } from "../../../../../utils/notifications";
import InputField from "../../../../../components/ui/InputField";
import {
  useGetLocationQuery,
  useUpdateLocationMutation,
} from "../../../../slices/carLocations";

const EditCarLocationDB = ({ id, closeModal }) => {
  const {
    data: carLocationData,
    isLoading,
    error,
    refetch,
  } = useGetLocationQuery(id, {
    skip: !id,
  });
  const [locationName, setLocationName] = useState("");

  const [updateCarLocation] = useUpdateLocationMutation();

  useEffect(() => {
    if (carLocationData) {
      setLocationName(carLocationData.locationName);
    }
  }, [carLocationData]);

  const handleUpdate = async () => {
    if (!locationName) {
      alert("Location name cannot be empty.");
      return;
    }

    const updatedCarLocation = {
      locationId: id,
      locationName,
    };

    try {
      await updateCarLocation(updatedCarLocation).unwrap();
      notify.success();
      refetch();
      closeModal();
    } catch (err) {
      console.error("Error updating location", err);
    }
  };

  if (isLoading) return <p>Loading location details...</p>;
  if (error) return <p>Error loading location details: {error.message}</p>;

  return (
    <div className="flex flex-col ">
      <div className="flex- flex-col items-center justify-between mt-10 border-collapse border-t-4 border-dashed p-4 my-2 ">
        <h2 className="text-md font-bold">Add Locations</h2>
        <p>Location ID: {id}</p>
        <InputField
          label={"Location Name"}
          type="text"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          placeholder="Enter new ocation name"
        />
      </div>
      <div>
        <button className="buttonEdit" onClick={handleUpdate}>
          Update Location
        </button>
        <button className="buttonDelete" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditCarLocationDB;
