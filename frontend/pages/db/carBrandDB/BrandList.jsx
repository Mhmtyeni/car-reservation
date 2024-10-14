import React, { useState } from "react";

import TextHeader from "../../../components/textcustom/TextHeader";
import { MdEditNote, MdOutlineDeleteSweep, MdAdd } from "react-icons/md";
import { notify } from "../../../utils/notifications";
import EditBrandDB from "./editBrand/[id]/EditBrandDB";
import AddBrandDB from "./addBrand/AddBrandDB";
import {
  useDeleteBrandMutation,
  useGetBrandQuery,
  useGetBrandsQuery,
} from "../../slices/carBrands";

const BrandList = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Add modal state'i

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(99);

  const {
    data: brandsData,
    isLoading,
    error,
  } = useGetBrandsQuery({ page, size });
  const [deleteBrand] = useDeleteBrandMutation();

  const {
    data: branData,
    error: brandError,
    refetch,
  } = useGetBrandQuery(selectedBrand, {
    skip: !selectedBrand,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading brands: {error.message}</p>;

  const brands = brandsData?.carBrands || [];

  const handleDelete = async (id) => {
    try {
      await deleteBrand(id).unwrap();
      notify.success();
    } catch (err) {
      console.error("Error deleting brand", err);
    }
  };

  const handleViewCarClick = (id) => {
    setSelectedBrand(id);
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
        <TextHeader addClass={``}>Araba marka listesi</TextHeader>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className=" text-white hover:text-greenColor flex items-center "
          title="add brand"
        >
          Listeye ekle
          <MdAdd className="h-4 w-4" />
        </button>
      </div>
      <div className="h-44 overflow-y-auto scroll my-10 flex flex-col gap-4 ml-4 border-collapse border-t-4 pt-2 ">
        {brandsData?.totalCarBrandCount >= 1 &&
          brands.map((brand) => (
            <div key={brand.id} className="flex justify-between">
              <TextHeader>{brand.carBrandName}</TextHeader>
              <div className="flex gap-4 mr-4">
                <button
                  onClick={() => handleViewCarClick(brand.id)}
                  className="text-greenColor hover:text-darkGrayColor transition-all transform duration-500 text-2xl"
                  title="edit"
                >
                  <MdEditNote />
                </button>
                <button
                  className="text-redColor text-2xl hover:text-darkGrayColor transition-all transform duration-500"
                  title="delete"
                  onClick={() => handleDelete(brand.id)}
                >
                  <MdOutlineDeleteSweep />
                </button>
              </div>
            </div>
          ))}
      </div>

      {isAddModalOpen && <AddBrandDB closeModal={closeAddModal} />}

      {isEditModalOpen && (
        <EditBrandDB id={selectedBrand} closeModal={closeEditModal} />
      )}
    </div>
  );
};

export default BrandList;
