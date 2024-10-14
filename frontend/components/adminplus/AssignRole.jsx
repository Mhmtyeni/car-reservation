import React, { useEffect, useState } from "react";
import {
  useGetAssignRoleEndpointMutation,
  useGetEndpointQuery,
  useGetRolesToEndpointQuery,
} from "../../pages/slices/endpoints";
import { useGetRolesQuery } from "../../pages/slices/userRoles";

const AssignRole = () => {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [code, setCode] = useState("");
  const [menu, setMenu] = useState("");

  const { data: endpoints } = useGetEndpointQuery();
  const { data: rolesData } = useGetRolesQuery({ page: 0, size: 10 });

  const { data: endpointRolesData, refetch: refetchEndpointRoles } =
    useGetRolesToEndpointQuery({ code, menu });

  const [assignRole, { isLoading, isSuccess, isError, error }] =
    useGetAssignRoleEndpointMutation();

  useEffect(() => {
    if (endpointRolesData && endpointRolesData.roles) {
      setSelectedRoles(endpointRolesData.roles);
    } else {
      setSelectedRoles([]);
    }
  }, [endpointRolesData]);

  const handleRoleChange = (roleName) => {
    if (selectedRoles.includes(roleName)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== roleName));
    } else {
      setSelectedRoles([...selectedRoles, roleName]);
    }
  };

  const handleAssignRole = async () => {
    try {
      await assignRole({ roles: selectedRoles, code: code, menu: menu });
      if (isSuccess) {
        alert("Roller başarıyla atandı!");
        refetchEndpointRoles();
      }
    } catch (error) {
      console.error("Rol atama hatası:", error);
    }
  };

  const menuOptions = endpoints?.map((endpoint) => endpoint.name) || [];
  const selectedMenu = endpoints?.find((endpoint) => endpoint.name === menu);
  const codeOptions = selectedMenu
    ? selectedMenu.actions.map((action) => action.code)
    : [];

  const roleOptions = rolesData?.datas?.map((role) => role.name) || [];

  return (
    <div className="flex flex-col">
      <select
        value={menu}
        onChange={(e) => setMenu(e.target.value)}
        className="mt-4"
      >
        <option value="">Menü Seçin</option>
        {menuOptions.map((menuOption, index) => (
          <option key={index} value={menuOption}>
            {menuOption}
          </option>
        ))}
      </select>

      <select
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="mt-4"
        disabled={!selectedMenu}
      >
        <option value="">Kod Seçin</option>
        {codeOptions.map((codeOption, index) => (
          <option key={index} value={codeOption}>
            {codeOption}
          </option>
        ))}
      </select>

      <div className="mt-4">
        <p>Rol Seçin:</p>
        {roleOptions.map((roleOption, index) => (
          <label key={index} className=" items-center flex justify-start gap-3">
            <input
              type="checkbox"
              value={roleOption}
              checked={selectedRoles.includes(roleOption)}
              onChange={() => handleRoleChange(roleOption)}
              className="sm:w-4 sm:h-4 h-3 w-3 cursor-pointer appearance-none rounded-full border-[1px] border-darkGrayColor/30 checked:bg-redColor"
            />
            {roleOption}
          </label>
        ))}
      </div>

      <button
        onClick={handleAssignRole}
        className="mt-4 bg-greenColor text-white p-2 rounded"
      >
        Rolleri Ata
      </button>

      {isError && <p className="text-red-500">Hata: {error.message}</p>}
    </div>
  );
};

export default AssignRole;
