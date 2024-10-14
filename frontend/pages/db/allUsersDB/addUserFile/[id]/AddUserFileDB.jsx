import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { notify } from "../../../../../utils/notifications";
import InputField from "../../../../../components/ui/InputField";
import {
  useAddUserUploadFileMutation,
  useGetUserQuery,
} from "../../../../slices/userApi";

const AddUserFileDB = ({ id, closeModal }) => {
  const {
    data: userApi,
    isLoading,
    error,
    refetch,
  } = useGetUserQuery(id, {
    skip: !id,
  });

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      files: [{ fileDescription: "", images: [] }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "files",
  });

  const [addUserFile] = useAddUserUploadFileMutation();

  const handleFileChange = (event, index) => {
    const files = event.target.files;
    const validFiles = Array.from(files).filter((file) =>
      ["image/png", "image/jpeg"].includes(file.type)
    );
    if (validFiles.length !== files.length) {
      notify.error("Please upload only PNG or JPG images.");
      return;
    }
    setValue(`files[${index}].images`, validFiles);
  };

  const onSubmit = async (data) => {
    try {
      if (!id) {
        throw new Error("User ID is required.");
      }

      for (const file of data.files) {
        if (!file.fileDescription.trim()) {
          throw new Error("File description is required.");
        }

        const response = await addUserFile({
          userId: id,
          fileDescription: file.fileDescription,
          files: file.images,
        }).unwrap();
      }

      notify.success();
      reset();
      refetch();
      closeModal();
    } catch (err) {
      console.error("Error while adding user file", err);
      notify.error("Error while adding user file: " + err.message);
    }
  };

  if (isLoading) return <p>Loading user data...</p>;
  if (error) return <p>Error loading user data: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-4">
          <Controller
            name={`files[${index}].fileDescription`}
            control={control}
            render={({ field }) => (
              <InputField
                {...field}
                type="text"
                label="File Description"
                placeholder="Enter file description"
              />
            )}
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload Images
            </label>
            <input
              type="file"
              multiple
              accept="image/png, image/jpeg"
              onChange={(event) => handleFileChange(event, index)}
              className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="button"
            className="buttonDelete"
            onClick={() => remove(index)}
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ fileDescription: "", images: [] })}
        className="buttonAdd"
      >
        Add Another File
      </button>

      <button
        type="submit"
        className="buttonEdit items-center justify-center my-7"
      >
        Add User Files
      </button>
      <button type="button" className="buttonDelete" onClick={closeModal}>
        Exit
      </button>
    </form>
  );
};

export default AddUserFileDB;
