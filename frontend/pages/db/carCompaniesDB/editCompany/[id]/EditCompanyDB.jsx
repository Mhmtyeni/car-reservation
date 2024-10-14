import React, { useState, useEffect } from "react";

import { notify } from "../../../../../utils/notifications";
import InputField from "../../../../../components/ui/InputField";
import {
  useGetCompanyQuery,
  useUpdateCompanyMutation,
} from "../../../../slices/companies";

const EditCompanyDB = ({ id, closeModal }) => {
  const [companyName, setCompanyName] = useState("");

  const {
    data: companyData,
    isLoading,
    error,
    refetch,
  } = useGetCompanyQuery(id, {
    skip: !id,
  });

  const [updateCompany] = useUpdateCompanyMutation();

  useEffect(() => {
    if (companyData) {
      setCompanyName(companyData.companyName);
    }
  }, [companyData]);

  const handleUpdate = async () => {
    if (!companyName) {
      alert("Company name cannot be empty.");
      return;
    }

    const updatedCompany = {
      companyId: id,
      companyName,
    };

    try {
      await updateCompany(updatedCompany).unwrap();
      notify.success();
      refetch();
      closeModal();
    } catch (err) {
      console.error("Error updating company", err);
    }
  };

  if (isLoading) return <p>Loading company details...</p>;
  if (error) return <p>Error loading company details: {error.message}</p>;

  return (
    <div className="flex flex-col ">
      <div className="flex- flex-col items-center justify-between mt-10 border-collapse border-t-4 border-dashed p-4 my-2 ">
        <h2 className="text-md font-bold">Add Company</h2>
        <InputField
          label={"Company Name"}
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter new company name"
        />
      </div>
      <div>
        <button className="buttonEdit" onClick={handleUpdate}>
          Update Company
        </button>
        <button className="buttonDelete" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditCompanyDB;
