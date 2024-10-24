import { Table } from "antd";
const CustomerDetailTable = () => {
  const dataSource = [];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <div>
      <Table className="" dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default CustomerDetailTable;
