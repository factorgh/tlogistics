import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { MdEdit } from "react-icons/md";
import { useGetRentalsQuery } from "../../../app/services/rental/rental";

const RentalTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { data: rentalData, isLoading: rentalIsLoading } = useGetRentalsQuery();
  console.log(rentalData?.vehicleRental);

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
      title: "Agent Name",
      dataIndex: "agent_name",
      key: "agent_name",
      width: 150,
      ...getColumnSearchProps("agent_name"),
    },
    {
      title: "Leasing Options",
      dataIndex: "leasing",
      key: "leasing",
      width: 150,
      ...getColumnSearchProps("leasingOptions"),
    },
    {
      title: "Vehicle Type",
      dataIndex: "vehicle_type",
      key: "vehicle_type",
      width: 150,
      ...getColumnSearchProps("vehicle_type"),
    },
    {
      title: "Driver Name",
      dataIndex: "driver_name",
      key: "driver_name",
      width: 150,
      ...getColumnSearchProps("driver_name"),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      width: 100,
      render: (text, record) => (
        <a onClick={() => console.log(record)}>
          <MdEdit />
        </a>
      ),
    },
  ];

  return (
    <Table
      loading={rentalIsLoading}
      pagination={true}
      columns={columns}
      dataSource={rentalData?.vehicleRental}
      scroll={{ x: 1000 }}
      className="border border-slate-200 rounded-md"
      rowKey="agentName"
    />
  );
};

export default RentalTable;
