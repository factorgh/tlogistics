/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import { useState } from "react";

const CustomModal = ({
  buttonTitle,
  children,
  header,
  handleOkClick,
  isButton,
  okText = "Save",
  cancelText = "Close",
  buttonStyle = {},
  modalWidth = 600,
  okButtonProps = {},
  cancelButtonProps = {},
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleOkClick(); // Trigger the parent handler
    setIsModalOpen(false); // Close modal on successful submission
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close modal on cancel
  };

  return (
    <>
      <Button
        type={isButton ? "text" : "primary"}
        onClick={showModal}
        className="mb-3"
        style={buttonStyle}
      >
        {buttonTitle}
      </Button>
      <Modal
        title={
          <span style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
            {header}
          </span>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={okText}
        cancelText={cancelText}
        width={modalWidth}
        okButtonProps={{
          ...okButtonProps,
          style: {
            backgroundColor: "#4CAF50",
            color: "white",
            ...okButtonProps.style,
          },
        }}
        cancelButtonProps={{
          ...cancelButtonProps,
          style: {
            backgroundColor: "#858796",
            color: "white",
            ...cancelButtonProps.style,
          },
        }}
      >
        <div style={{ padding: "20px", textAlign: "center" }}>{children}</div>
      </Modal>
    </>
  );
};

export default CustomModal;
