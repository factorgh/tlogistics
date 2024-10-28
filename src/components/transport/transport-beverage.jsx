import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { IoMdTrash } from "react-icons/io";

const data = [
  {
    key: "1",
    "Vehicle No.": "MH12AB1234",
    "Vehicle Type": "LCV",
    driver: "John Doe",
    truck: "Beverage Truck 1",
  },
  {
    key: "2",
    "Vehicle No.": "MH12XY5678",
    "Vehicle Type": "28Ft Open Truck",
    driver: "Jane Smith",
    truck: "Beverage Truck 2",
  },
  {
    key: "3",
    "Vehicle No.": "MH12CD9101",
    "Vehicle Type": "LCV",
    driver: "Mike Johnson",
    truck: "Beverage Truck 3",
  },
  {
    key: "4",
    "Vehicle No.": "MH12EF2345",
    "Vehicle Type": "28Ft Open Truck",
    driver: "Emily Davis",
    truck: "Beverage Truck 4",
  },
  {
    key: "5",
    "Vehicle No.": "MH12GH6789",
    "Vehicle Type": "LCV",
    driver: "Chris Brown",
    truck: "Beverage Truck 5",
  },
];

const TransportBeverageTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

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
      dataIndex: "Vehicle No.",
      key: "Vehcle No.",
      width: 100,
      ...getColumnSearchProps("Vehcle No."),
    },
    {
      title: "Vehicle Type",
      dataIndex: "Vehicle Type",
      key: "Vehicle Type",
      width: 100,
      ...getColumnSearchProps("Vehicle Type"),
    },
    {
      title: "Driver",
      dataIndex: "driver",
      key: "driver",
      width: 100,
      ...getColumnSearchProps("driver"),
    },

    {
      title: "Truck Ass.",
      dataIndex: "truck",
      key: "truck",
      width: 200,
      ...getColumnSearchProps("truck"),
      sorter: (a, b) => a.location.length - b.location.length,
      sortDirections: ["descend", "ascend"],
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
    // Add more columns as needed
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{ x: 1000 }} // Enable horizontal scrolling
      className="border border-slate-200 rounded-md"
    />
  );
};

export default TransportBeverageTable;
