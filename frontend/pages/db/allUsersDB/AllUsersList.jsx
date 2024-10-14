import React, { useState } from "react";
import TextHeader from "../../../components/textcustom/TextHeader";
import {
  MdEditNote,
  MdOutlineDeleteSweep,
  MdAdd,
  MdDriveFolderUpload,
} from "react-icons/md";
import { useGetUserQuery, useGetUsersQuery } from "../../slices/userApi";
import AddUsersDB from "./addUsers/AddUsersDB";
import AddUserFileDB from "./addUserFile/[id]/AddUserFileDB";
import DeleteUserFileDB from "./deleteUserFile/[id]/DeleteUserFileDB";

const AllUsersList = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null); // "add", "edit", or "delete"

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(99);

  const {
    data: allUsersData,
    isLoading,
    error,
  } = useGetUsersQuery({ page, size });
  const { data: userData, error: userError } = useGetUserQuery(selectedUser, {
    skip: !selectedUser,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading Users Data: {error.message}</p>;

  const usersDataApi = allUsersData?.users || [];

  const handleOpenModal = (type, userId) => {
    setSelectedUser(userId);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalType(null);
  };

  return (
    <div>
      <div className="flex items-center rounded-md justify-between mt-10 bg-darkGrayColor/15 p-4 my-2">
        <TextHeader>Kullanıcı Listesi</TextHeader>
        <button
          onClick={() => handleOpenModal("add")}
          className="text-white hover:text-greenColor flex items-center"
          title="Add User"
        >
          Listeye Ekle
          <MdAdd className="h-4 w-4" />
        </button>
      </div>
      <div className="h-44 overflow-y-auto scroll my-10 flex flex-col gap-4 ml-4 border-collapse border-t-4 pt-2">
        {allUsersData?.totalUsersCount >= 1 &&
          usersDataApi.map((user) => (
            <div key={user.id} className="flex justify-between">
              <div className="flex gap-4">
                <TextHeader>{user.userName}</TextHeader>
                <TextHeader>{user.sicil}</TextHeader>
              </div>
              <div className="flex gap-4 mr-4">
                <button
                  onClick={() => handleOpenModal("edit", user.id)}
                  className="text-greenColor hover:text-darkGrayColor transition-all transform duration-500 text-2xl"
                  title="Edit"
                >
                  <MdDriveFolderUpload />
                </button>
                <button
                  onClick={() => handleOpenModal("delete", user.id)}
                  className="text-redColor text-2xl hover:text-darkGrayColor transition-all transform duration-500"
                  title="Delete"
                >
                  <MdOutlineDeleteSweep />
                </button>
              </div>
            </div>
          ))}
      </div>

      {modalType === "add" && (
        <div className="modal-background">
          <div className="modal-content">
            <AddUsersDB closeModal={handleCloseModal} />
          </div>
        </div>
      )}
      {modalType === "edit" && selectedUser && (
        <div className="modal-background">
          <div className="modal-content">
            <AddUserFileDB id={selectedUser} closeModal={handleCloseModal} />
          </div>
        </div>
      )}
      {modalType === "delete" && selectedUser && (
        <div className="modal-background">
          <div className="modal-content">
            <DeleteUserFileDB id={selectedUser} closeModal={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsersList;
