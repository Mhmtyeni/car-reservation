import React, { useState } from "react";
import { cn } from "../../utils/cn";
import BaseModal from "./BaseModal";

export const AddProporties = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  component: Component,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  component?: React.ElementType;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 cursor-pointer dark:bg-black dark:border-white/[0.2] bg-grayColor/10 border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200 ">
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mt-8">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
      </div>
      <button onClick={handleOpenModal} className="w-full button">
        Open Modal
      </button>

      <BaseModal isOpen={isModalOpen} onClose={handleCloseModal} title={``}>
        <div>{Component && <Component />}</div>
      </BaseModal>
    </div>
  );
};
