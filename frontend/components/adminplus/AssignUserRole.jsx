import React, { useState, useEffect } from "react";
import { useGetRolesQuery } from "../../pages/slices/userRoles";
import {
  useAddAssignUserRolesMutation,
  useGetUserUserRolesQuery,
  useGetUsersQuery,
} from "../../pages/slices/userApi";

const AssignUserRole = () => {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const { data: rolesData } = useGetRolesQuery({ page: 0, size: 10 });
  const { data: usersData } = useGetUsersQuery({ page: 0, size: 10 });
  const { data: userRolesData, refetch: refetchUserRoles } =
    useGetUserUserRolesQuery(selectedUser, { skip: !selectedUser });

  const [assignRole, { isLoading, isSuccess, isError, error }] =
    useAddAssignUserRolesMutation();

  useEffect(() => {
    if (userRolesData && userRolesData.userRoles) {
      setSelectedRoles(userRolesData.userRoles);
    } else {
      setSelectedRoles([]);
    }
  }, [userRolesData]);

  const handleRoleChange = (roleName) => {
    if (selectedRoles.includes(roleName)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== roleName));
    } else {
      setSelectedRoles([...selectedRoles, roleName]);
    }
  };
  const handleAssignUserRole = async () => {
    try {
      if (!selectedUser) {
        alert("Lütfen bir kullanıcı seçin.");
        return;
      }

      await assignRole({ roles: selectedRoles, userId: selectedUser });
      if (isSuccess) {
        alert("Roller başarıyla güncellendi!");
        refetchUserRoles();
      }
    } catch (error) {
      console.error("Rol atama hatası:", error);
    }
  };

  const userOptions = usersData?.users || [];
  const roleOptions = rolesData?.datas || [];

  return (
    <div className=" grid justify-center">
      <h4>Kullanıcı Seçin</h4>
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        className="mt-2 ml-6 border-2 w-44"
      >
        <option className="" value="">
          Kişi seçin
        </option>
        {userOptions.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} {user.surname}
          </option>
        ))}
      </select>

      <div className="mt-4 ">
        <p>Rol Seçin</p>
        {roleOptions.map((role) => (
          <label
            key={role.id}
            className=" items-center flex justify-start gap-3"
          >
            <input
              type="checkbox"
              value={role.name}
              checked={selectedRoles.includes(role.name)}
              onChange={() => handleRoleChange(role.name)}
              className="sm:w-4 sm:h-4 h-3 w-3 cursor-pointer appearance-none rounded-full border-[1px] border-darkGrayColor/30 checked:bg-redColor"
            />
            {role.name}
          </label>
        ))}
      </div>

      <button
        onClick={handleAssignUserRole}
        disabled={isLoading}
        className="mt-4 bg-greenColor w-44 text-white p-2 rounded"
      >
        Roller Ata
      </button>

      {isError && <p className="text-red-500">Hata: {error.message}</p>}
    </div>
  );
};

export default AssignUserRole;
