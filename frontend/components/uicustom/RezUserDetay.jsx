import React from "react";
import userTranslations from "../uicustom/userTranslations.json";

const userPropsKeys = ["email", "name", "surname", "sicil", "userName"];
const RezUserDetay = ({ user }) => {
  if (!user) {
    return (
      <p className="sm:text-xl text-sm font-bold font-titleTextType uppercase">
        User not found
      </p>
    );
  }

  return (
    <div>
      <div className="flex flex-col w-full">
        {userPropsKeys.map((key) => (
          <div
            key={key}
            className="flex justify-between items-start mb-5 px-8 border-collapse border-b-2 border-darkGrayColor/50"
          >
            <h2>{userTranslations[key] || key}:</h2>
            <h2 className="font-textTextType font-bold text-darkColor">
              {user[key] ? user[key].toString() : ""}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RezUserDetay;
