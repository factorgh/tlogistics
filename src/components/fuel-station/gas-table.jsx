import { Table } from "antd";
import { MdEdit } from "react-icons/md";

// eslint-disable-next-line react/prop-types
const GasTable = ({ dataSource, handleEdit }) => {
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
      title: "Entity",
      dataIndex: "entity",
      key: "entity",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <MdEdit onClick={() => console.log(record)} />,
    },
  ];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default GasTable;
