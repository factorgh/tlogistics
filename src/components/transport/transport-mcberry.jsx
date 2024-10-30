import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { IoMdTrash } from "react-icons/io";
import { useGetMcBerryTransportsQuery } from "../../app/services/transport/transport";

const data = [
  {
    key: "1",
    "Vehicle No.": "DL01HB1234",
    "Vehicle Type": "Refrigerated Truck",
    driver: "Sam Green",
    truck: "McBerry Truck A",
  },
  {
    key: "2",
    "Vehicle No.": "DL01XC5678",
    "Vehicle Type": "LCV",
    driver: "Lisa White",
    truck: "McBerry Truck B",
  },
  {
    key: "3",
    "Vehicle No.": "DL02EF9101",
    "Vehicle Type": "28Ft Open Truck",
    driver: "Daniel Black",
    truck: "McBerry Truck C",
  },
  {
    key: "4",
    "Vehicle No.": "DL02GH2345",
    "Vehicle Type": "Refrigerated Truck",
    driver: "Sophia Blue",
    truck: "McBerry Truck D",
  },
  {
    key: "5",
    "Vehicle No.": "DL02JK6789",
    "Vehicle Type": "LCV",
    driver: "Max Grey",
    truck: "McBerry Truck E",
  },
];

const TransportMcBerryTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { data: mcberryTransports, isFetching } =
    useGetMcBerryTransportsQuery();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Vehicle No.",
      dataIndex: "vehicle_number",
      key: "vehicle_number",
      width: 100,
      ...getColumnSearchProps("vehicle_number"),
    },
    {
      title: "Vehicle Type",
      dataIndex: "vehicle_type",
      key: "vehicle_type",
      width: 100,
      ...getColumnSearchProps("vehicle_type"),
    },
    {
      title: "Route optimization",
      dataIndex: "route_optimization",
      key: "route_optimization",
      width: 100,
      ...getColumnSearchProps("route_optimization"),
    },
    {
      title: "Insurance Exp.",
      dataIndex: "insurance_expiring_date",
      key: "insurance_expiring_date",
      width: 100,
      ...getColumnSearchProps("insurance_expiring_date"),
    },
    {
      title: "Registration Exp",
      dataIndex: "registration_expiring_date",
      key: "registration_expiring_date",
      width: 100,
      ...getColumnSearchProps("registration_expiring_date"),
    },
    {
      title: "Driver",
      dataIndex: "driver_management",
      key: "driver_management",
      width: 100,
      ...getColumnSearchProps("driver_management"),
    },

    {
      title: "truck_assistant Ass.",
      dataIndex: "truck_assistant",
      key: "truck_assistant",
      width: 200,
      ...getColumnSearchProps("truck_assistant"),
    },

    {
      title: "Action",
      dataIndex: "",
      key: "action",
      width: 100,
      render: () => (
        <a>
          <IoMdTrash color="red" />
        </a>
      ),
    },
  ];
  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={mcberryTransports?.transports}
      scroll={{ x: 1000 }}
      className="border border-slate-200 rounded-md"
    />
  );
};

export default TransportMcBerryTable;
