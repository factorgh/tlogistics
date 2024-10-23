/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import { useState } from "react";

const CustomModal = ({ buttonTitle, children, header }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} className="mb-3">
        {buttonTitle}
      </Button>
      <Modal
        title={header}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add"
        cancelText="Close"
        cancelButtonProps={{
          style: { backgroundColor: "#858796", color: "white" }, // Change button color
        }}
      >
        {children}
      </Modal>
    </>
  );
};

export default CustomModal;
