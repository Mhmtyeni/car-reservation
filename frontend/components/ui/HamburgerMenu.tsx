//Hamburger Menu içinde kullanılan propslar ve açılan modal componentidir.

"use client";
import { Fragment, ReactNode } from "react";
import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { GrFormClose } from "react-icons/gr";

interface HamburgerProps {
  isOpen: boolean;
  closeModal: () => void;
  menuComponent: ReactNode;
}
//Kullanılacak sayfa içindeki menüler farklı olduğu için props olarak yollandı.

const HamburgerMenu = ({
  isOpen,
  closeModal,
  menuComponent,
}: HamburgerProps) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[9999]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-darkGrayColor bg-opacity-50" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                  <div>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="absolute top-2 right-10 z-10 w-fit p-2"
                    >
                      <GrFormClose className="ico-navbar" />
                    </button>
                  </div>

                  {menuComponent}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default HamburgerMenu;
