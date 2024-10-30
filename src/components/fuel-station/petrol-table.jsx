import { Table } from "antd";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import { useGetPetrolStationsQuery } from "../../app/services/fuel-station/fuel-station";

const PetrolTable = () => {
  const { data, isFetching } = useGetPetrolStationsQuery();
  console.log(data);
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

  return (
    <Table loading={isFetching} dataSource={data?.stations} columns={columns} />
  );
};

export default PetrolTable;
