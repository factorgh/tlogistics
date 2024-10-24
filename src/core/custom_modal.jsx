/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import { useState } from "react";

const CustomModal = ({
  buttonTitle,
  children,
  header,
  handleClick,
  formInstance,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    formInstance
      .validateFields()
      .then(() => {
        handleClick();
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
        console.log("Validation failed");
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close modal on cancel
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
          style: { backgroundColor: "#858796", color: "white" },
        }}
      >
        {children}
      </Modal>
    </>
  );
};

export default CustomModal;
