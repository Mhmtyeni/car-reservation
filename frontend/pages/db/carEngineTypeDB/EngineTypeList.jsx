import React, { useState } from "react";
import {
  useDeleteEngineTypeMutation,
  useGetEngineTypeQuery,
  useGetEngineTypesQuery,
} from "../../slices/carEngineType";
import TextHeader from "../../../components/textcustom/TextHeader";
import { MdAdd, MdEditNote, MdOutlineDeleteSweep } from "react-icons/md";
import AddEngineTypeDB from "./addEngineType/AddEngineTypeDB";
import EditEngineTypeDB from "../carEngineTypeDB/editEngineType/[id]/EditEngineTypeDB";

const EngineTypeList = () => {
  const [selectedEngine, setSelectedEngine] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(99);

  const {
    data: enginedata,
    isLoading,
    error,
  } = useGetEngineTypesQuery({ page, size });

  const [deleteEngineType] = useDeleteEngineTypeMutation();

  const { data, refetch } = useGetEngineTypeQuery(selectedEngine, {
    skip: !selectedEngine,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading engineTypes: {error.message}</p>;

  const engineTypes = enginedata?.carEngineTypes || [];

  const handleDelete = async (id) => {
    try {
      await deleteEngineType(id).unwrap();
      notify.success();
    } catch (err) {
      console.error("Error deleting brand", err);
    }
  };

  const handleViewCarClick = (id) => {
    setSelectedEngine(id);
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
      <div>
        <div className="flex items-center rounded-md justify-between mt-10 bg-darkGrayColor/15 p-4 my-2 ">
          <TextHeader>Araba Engine Type listesi</TextHeader>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className=" text-white hover:text-greenColor flex items-center "
            title="Add Engine Type"
          >
            Listeye ekle
            <MdAdd className="h-4 w-4" />
          </button>
        </div>
        <div className="h-44 overflow-y-auto scroll my-10 flex flex-col gap-4 ml-4 border-collapse border-t-4 pt-2 ">
          {enginedata?.totalCarEngineTypeCount >= 1 &&
            engineTypes.map((engineType) => (
              <div key={engineType.id} className="flex justify-between">
                <TextHeader>{engineType.carEngineTypeName}</TextHeader>
                <div className="flex gap-4 mr-4">
                  <button
                    onClick={() => handleViewCarClick(engineType.id)}
                    className="text-greenColor hover:text-darkGrayColor transition-all transform duration-500 text-2xl"
                    title="edit"
                  >
                    <MdEditNote />
                  </button>
                  <button
                    className="text-redColor text-2xl hover:text-darkGrayColor transition-all transform duration-500"
                    title="delete"
                    onClick={() => handleDelete(engineType.id)}
                  >
                    <MdOutlineDeleteSweep />
                  </button>
                </div>
              </div>
            ))}
        </div>

        {isAddModalOpen && (
          <div className="modal-background">
            <div className="modal-content">
              <AddEngineTypeDB closeModal={closeAddModal} />
            </div>
          </div>
        )}

        {isEditModalOpen && (
          <div className="modal-background">
            <div className="modal-content">
              <EditEngineTypeDB
                id={selectedEngine}
                closeModal={closeEditModal}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EngineTypeList;
