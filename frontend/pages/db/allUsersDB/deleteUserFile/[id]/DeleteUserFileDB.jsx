import React, { useEffect } from "react";
import {
  useGetUserQuery,
  useDeleteUserFileMutation,
} from "../../../../slices/userApi";
import { notify } from "../../../../../utils/notifications";

const DeleteUserFileDB = ({ id }) => {
  const {
    data: userApi,
    isLoading,
    error,
    refetch,
  } = useGetUserQuery(id, {
    skip: !id,
  });

  const [deleteUserImage] = useDeleteUserFileMutation();

  useEffect(() => {
    if (error) {
      notify.error("Error loading user data: " + error.message);
    }
  }, [error]);

  const handleDeleteImage = async (imageId) => {
    try {
      await deleteUserImage(imageId).unwrap();
      refetch();
      notify.success("Image deleted successfully.");
    } catch (err) {
      console.error("Error while deleting image", err);
      notify.error("Error while deleting image: " + err.message);
    }
  };

  if (isLoading) return <p>Loading user images...</p>;

  return (
    <div className="h-40 overflow-y-auto scroll">
      <h2 className="text-lg font-bold mb-4">User Images</h2>
      {userApi?.userImages?.length > 0 ? (
        <ul>
          {userApi.userImages.map((image) => (
            <li key={image.id} className="mb-4 flex items-center">
              <img
                src={`/resource/user-images/${image.path}`}
                alt={image.fileDescription}
                className="w-32 h-32 object-cover"
              />
              <div className="ml-4">
                <p className="text-sm font-medium">{image.fileDescription}</p>
                <button
                  onClick={() => handleDeleteImage(image.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No images found.</p>
      )}
    </div>
  );
};

export default DeleteUserFileDB;
