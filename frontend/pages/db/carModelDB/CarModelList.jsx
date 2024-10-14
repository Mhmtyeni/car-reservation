import React, { useState } from "react";

import TextHeader from "../../../components/textcustom/TextHeader";
import { MdAdd, MdEditNote, MdOutlineDeleteSweep } from "react-icons/md";
import {
  useDeleteCarModelMutation,
  useGetCarModelQuery,
  useGetCarModelsQuery,
} from "../../slices/carModel";
import EditCarModelDB from "./editCarModel/[id]/EditCarModelDB";
import AddCarModelDB from "./addCarModel/AddCarModelDB";

const EngineTypeList = () => {
  const [selectedCarModel, setSelectedCarModel] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(99);

  const {
    data: modelData,
    isLoading,
    error,
  } = useGetCarModelsQuery({ page, size });

  const [deleteCarModel] = useDeleteCarModelMutation();

  const { data, refetch } = useGetCarModelQuery(selectedCarModel, {
    skip: !selectedCarModel,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading carModelDatas: {error.message}</p>;

  const carModelDatas = modelData?.carModels || [];

  const handleDelete = async (id) => {
    try {
      await deleteCarModel(id).unwrap();
      notify.success();
    } catch (err) {
      console.error("Error deleting brand", err);
    }
  };

  const handleViewCarClick = (id) => {
    setSelectedCarModel(id);
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
          <TextHeader>Araba Model listesi</TextHeader>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className=" text-white hover:text-greenColor flex items-center "
            title="Add Car Model"
          >
            Listeye ekle
            <MdAdd className="h-4 w-4" />
          </button>
        </div>
        <div className="h-44 overflow-y-auto scroll my-10 flex flex-col gap-4 ml-4 border-collapse border-t-4 pt-2 ">
          {modelData?.totalCarModelCount >= 1 &&
            carModelDatas.map((carModel) => (
              <div key={carModel.id} className="flex justify-between ">
                <div className="flex gap-2">
                  <TextHeader addClass={`opacity-50`}>
                    {carModel.carBrandName}
                  </TextHeader>
                  <TextHeader>{carModel.carModelName}</TextHeader>
                </div>

                <div className="flex gap-4 mr-4">
                  <button
                    onClick={() => handleViewCarClick(carModel.id)}
                    className="text-greenColor hover:text-darkGrayColor transition-all transform duration-500 text-2xl"
                    title="edit"
                  >
                    <MdEditNote />
                  </button>
                  <button
                    className="text-redColor text-2xl hover:text-darkGrayColor transition-all transform duration-500"
                    title="delete"
                    onClick={() => handleDelete(carModel.id)}
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
              <AddCarModelDB closeModal={closeAddModal} />
            </div>
          </div>
        )}

        {isEditModalOpen && (
          <div className="modal-background">
            <div className="modal-content">
              <EditCarModelDB
                id={selectedCarModel}
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
