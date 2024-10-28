import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const data = [
  {
    key: "1",
    "tracking number": "MB123456789",
    date: "2024-10-01",
    name: "John Doe",
    from: "New York, NY",
    to: "Los Angeles, CA",
    "current location": "Kansas City, MO",
    status: "In Transit",
    payment: "Paid",
  },
  {
    key: "2",
    "tracking number": "MB987654321",
    date: "2024-10-02",
    name: "Jane Smith",
    from: "Chicago, IL",
    to: "Houston, TX",
    "current location": "St. Louis, MO",
    status: "In Transit",
    payment: "Unpaid",
  },
  {
    key: "3",
    "tracking number": "MB555888333",
    date: "2024-10-03",
    name: "Michael Johnson",
    from: "Miami, FL",
    to: "Seattle, WA",
    "current location": "Denver, CO",
    status: "Delayed",
    payment: "Paid",
  },
  {
    key: "4",
    "tracking number": "MB666777999",
    date: "2024-10-04",
    name: "Emily Davis",
    from: "Atlanta, GA",
    to: "San Francisco, CA",
    "current location": "Phoenix, AZ",
    status: "Delivered",
    payment: "Paid",
  },
  {
    key: "5",
    "tracking number": "MB444555666",
    date: "2024-10-05",
    name: "Chris Brown",
    from: "Dallas, TX",
    to: "Portland, OR",
    "current location": "Salt Lake City, UT",
    status: "Out for Delivery",
    payment: "Paid",
  },
];

const ShipmentListTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const navigate = useNavigate();

  const goToShipmentDetail = () => {
    navigate("/main/shipment-detail", { state: { shipment } });
  };

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
      title: "Tracking Number",
      dataIndex: "tracking number",
      key: "tracking number",
      width: 300,
      ...getColumnSearchProps("tracking number"),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 150,
      ...getColumnSearchProps("date"),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      ...getColumnSearchProps("name"),
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      width: 150,
      ...getColumnSearchProps("from"),
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
      width: 150,
      ...getColumnSearchProps("to"),
    },
    {
      title: "Current Location",
      dataIndex: "current location",
      key: "to",
      width: 200,
      ...getColumnSearchProps("current location"),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 200,
      ...getColumnSearchProps("status"),
      sorter: (a, b) => a.location.length - b.location.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
      width: 200,
      ...getColumnSearchProps("payment"),
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
          <IoMdEyeOff onClick={goToShipmentDetail} />
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

export default ShipmentListTable;
const shipment = {
  trackingNumber: "MB123456789",
  date: "2024-10-01",
  senderName: "John Doe",
  receiverName: "Jane Smith",
  from: "New York, NY",
  to: "Los Angeles, CA",
  currentLocation: "Kansas City, MO",
  status: "In Transit",
  paymentStatus: "Paid",
  timelineEvents: [
    {
      location: "New York, NY",
      time: "2024-10-01 10:00 AM",
      description: "Shipment picked up",
      status: "completed",
    },
    {
      location: "Philadelphia, PA",
      time: "2024-10-01 5:00 PM",
      description: "In transit",
      status: "completed",
    },
    {
      location: "Kansas City, MO",
      time: "2024-10-02 9:00 AM",
      description: "In transit",
      status: "in-progress",
    },
    {
      location: "Los Angeles, CA",
      time: "Expected: 2024-10-03",
      description: "Out for delivery",
      status: "pending",
    },
  ],
};
