import { Table } from "antd";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import { useGetDieselStationsQuery } from "../../app/services/fuel-station/fuel-station";

const DieselTable = () => {
  const { data, isFetching } = useGetDieselStationsQuery();
  const columns = [
    {
      title: "Vehicle No.",
      dataIndex: "vehicle_number",
      key: "vehicle_number",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => {
        return moment(text).format("YYYY-MM-DD");
      },
    },
    {
      title: "Consumption (Lts)",
      dataIndex: "consumption",
      key: "consumption",
    },
    {
      title: "Unit Price",
      dataIndex: "unit_price",
      key: "unit_price",
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
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <MdEdit onClick={() => console.log(record)} />,
    },
  ];

  return (
    <div>
      <Table
        loading={isFetching}
        dataSource={data?.stations}
        columns={columns}
      />
    </div>
  );
};

export default DieselTable;
