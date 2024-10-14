// "path": "resource/user-images\\3c1e5a91-dbce-4f54-86dd-7e6ec13fca0b271499457_112856347936815_7245888044304766996_n.jpg"
//İmage db' de (üstte gösterildiği gibi) path ile tutulduğu için aşağıdaki gibi formatlamak gerekiyor.

import Image from "next/image";
import React from "react";

const UserImage = ({ imagePath }) => {
  const baseURL = "http://10.108.206.9:83/";
  const imageUrl = baseURL + imagePath;

  return (
    <Image
      width={100}
      height={100}
      src={imageUrl}
      alt="User Image"
      fetchpriority="high"
      className="object-cover rounded-full sm:w-20 sm:h-20  w-14 h-14"
    />
  );
};
export default UserImage;
