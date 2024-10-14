import React, { useState } from "react";
import {
  useDeleteRolesMutation,
  useGetRoleQuery,
  useGetRolesQuery,
} from "../../slices/userRoles";
import TextHeader from "../../../components/textcustom/TextHeader";
import { MdAdd, MdEditNote, MdOutlineDeleteSweep } from "react-icons/md";
import { notify } from "../../../utils/notifications";
import EditRoleDB from "./editRole/[id]/EditRoleDB";
import AddRolesDB from "./addRole/AddRolesDB";

const AllRolesList = () => {
  const [selectedRole, setSelectedRole] = useState();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: rolesData } = useGetRolesQuery(0, 10);
  const [deleteRole] = useDeleteRolesMutation();

  const { refetch } = useGetRoleQuery(selectedRole, {
    skip: !selectedRole,
  });
  const roles = rolesData?.datas || [];

  const handleDelete = async (id) => {
    try {
      await deleteRole(id).unwrap();
      notify.success();
    } catch (err) {
      console.error("Error deleting role", err);
    }
  };

  const handleViewCarClick = (id) => {
    setSelectedRole(id);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };
  return (
    <div>
      <div className="flex items-center rounded-md justify-between mt-10 bg-darkGrayColor/15 p-4 my-2 ">
        <TextHeader>User Role listesi</TextHeader>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className=" text-white hover:text-greenColor flex items-center "
          title="add car case"
        >
          Listeye ekle
          <MdAdd className="h-4 w-4" />
        </button>
      </div>
      <div className="h-44 overflow-y-auto scroll my-10 flex flex-col gap-4 ml-4 border-collapse border-t-4 pt-2 ">
        {rolesData?.totalCount >= 1 &&
          roles.map((role) => (
            <div key={role.id} className="flex justify-between">
              <TextHeader>{role.name}</TextHeader>
              <div className="flex gap-4 mr-4">
                <button
                  onClick={() => handleViewCarClick(role.id)}
                  className="text-greenColor hover:text-darkGrayColor transition-all transform duration-500 text-2xl"
                  title="edit"
                >
                  <MdEditNote />
                </button>
                <button
                  className="text-redColor text-2xl hover:text-darkGrayColor transition-all transform duration-500"
                  title="delete"
                  onClick={() => handleDelete(role.id)}
                >
                  <MdOutlineDeleteSweep />
                </button>
              </div>
            </div>
          ))}
      </div>
      {isAddModalOpen && <AddRolesDB closeModal={closeAddModal} />}

      {isEditModalOpen && (
        <EditRoleDB id={selectedRole} closeModal={closeEditModal} />
      )}
    </div>
  );
};

export default AllRolesList;
