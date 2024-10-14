import React, { useEffect, useState } from "react";
import {
  useGetRoleQuery,
  usePutRolesMutation,
} from "../../../../slices/userRoles";

import InputField from "../../../../../components/ui/InputField";
import { notify } from "../../../../../utils/notifications";

const EditRoleDB = ({ id, closeModal }) => {
  const [roleName, setRoleName] = useState("");
  const { data: roles, refetch } = useGetRoleQuery(id);
  const [updateRole] = usePutRolesMutation();

  useEffect(() => {
    if (roles) {
      setRoleName(roles.roleName);
    }
  }, [roles]);

  const handleUpdate = async () => {
    if (!roleName) {
      alert("Company role name cannot be empty.");
      return;
    }

    const updatedRole = {
      roleId: id,
      roleName,
    };

    try {
      await updateRole(updatedRole).unwrap();
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
        <h2 className="text-md font-bold">Add Role</h2>
        <InputField
          label={"Role Name"}
          type="text"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          placeholder="Enter new role name"
        />
      </div>
      <div>
        <button className="buttonEdit" onClick={handleUpdate}>
          Update Role
        </button>
        <button className="buttonDelete" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditRoleDB;
