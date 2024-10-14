import React, { useState } from "react";

import TextHeader from "../../../components/textcustom/TextHeader";
import { MdEditNote, MdOutlineDeleteSweep, MdAdd } from "react-icons/md";
import { notify } from "../../../utils/notifications";
import {
  useDeleteCompanyMutation,
  useGetCompaniesQuery,
  useGetCompanyQuery,
} from "../../slices/companies";
import AddCompanyDB from "./addCompany/AddCompanyDB";
import EditCompanyDB from "./editCompany/[id]/EditCompanyDB";

const CarCompaniesList = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(99);

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const {
    data: companiesData,
    isLoading,
    error,
  } = useGetCompaniesQuery({ page, size });
  const [deleteCompany] = useDeleteCompanyMutation();

  const {
    data: branData,
    error: brandError,
    refetch,
  } = useGetCompanyQuery(selectedCompany, {
    skip: !selectedCompany,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading Company Data: {error.message}</p>;

  const companyData = companiesData?.companies || [];

  const handleDelete = async (id) => {
    try {
      await deleteCompany(id).unwrap();
      notify.success();
    } catch (err) {
      console.error("Error deleting company", err);
    }
  };

  const handleViewCarClick = (id) => {
    setSelectedCompany(id);
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
        <TextHeader>Şirket listesi</TextHeader>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className=" text-white hover:text-greenColor flex items-center "
          title="add company"
        >
          Listeye ekle
          <MdAdd className="h-4 w-4" />
        </button>
      </div>
      <div className="h-44 overflow-y-auto scroll my-10 flex flex-col gap-4 ml-4 border-collapse border-t-4 pt-2 ">
        {companiesData?.totalCompanyCount >= 1 &&
          companyData.map((company) => (
            <div key={company.id} className="flex justify-between">
              <TextHeader>{company.companyName}</TextHeader>
              <div className="flex gap-4 mr-4">
                <button
                  onClick={() => handleViewCarClick(company.id)}
                  className="text-greenColor hover:text-darkGrayColor transition-all transform duration-500 text-2xl"
                  title="edit"
                >
                  <MdEditNote />
                </button>
                <button
                  className="text-redColor text-2xl hover:text-darkGrayColor transition-all transform duration-500"
                  title="delete"
                  onClick={() => handleDelete(company.id)}
                >
                  <MdOutlineDeleteSweep />
                </button>
              </div>
            </div>
          ))}
      </div>

      {isAddModalOpen && (
        <div>
          <AddCompanyDB closeModal={closeAddModal} />
        </div>
      )}

      {isEditModalOpen && (
        <div>
          <EditCompanyDB id={selectedCompany} closeModal={closeEditModal} />
        </div>
      )}
    </div>
  );
};

export default CarCompaniesList;
