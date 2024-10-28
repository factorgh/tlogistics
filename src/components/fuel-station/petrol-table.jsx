/* eslint-disable react/prop-types */
import { Table } from "antd";
import { MdEdit } from "react-icons/md";

const PetrolTable = ({ dataSource, handleEdit }) => {
  const columns = [
    {
      title: "Vehicle No.",
      dataIndex: "vehicleNo",
      key: "vehicleNo",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Consumption (Lts)",
      dataIndex: "consumption",
      key: "consumption",
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Pump",
      dataIndex: "pump",
      key: "pump",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <MdEdit
          onClick={() => () => {
            console.log(record);
          }}
        >
          Edit
        </MdEdit>
      ),
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};

export default PetrolTable;
