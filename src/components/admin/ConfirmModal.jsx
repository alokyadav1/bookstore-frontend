/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function ConfirmModal({handleConfirm}) {
  const [openModal, setOpenModal] = useState(true);

  return (
    <>
      <Modal show={openModal} size="md" onClose={() => handleConfirm(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => {
                handleConfirm(true)
              }}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => {
                handleConfirm(false)
              }}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
