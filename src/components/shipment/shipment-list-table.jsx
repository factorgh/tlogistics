import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import moment from "moment";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { IoMdEyeOff } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useGetShipmentsQuery } from "../../app/services/shipment/shipment";

// const data = [
//   {
//     key: "1",
//     "tracking number": "MB123456789",
//     date: "2024-10-01",
//     name: "John Doe",
//     from: "New York, NY",
//     to: "Los Angeles, CA",
//     "current location": "Kansas City, MO",
//     status: "In Transit",
//     payment: "Paid",
//   },
//   {
//     key: "2",
//     "tracking number": "MB987654321",
//     date: "2024-10-02",
//     name: "Jane Smith",
//     from: "Chicago, IL",
//     to: "Houston, TX",
//     "current location": "St. Louis, MO",
//     status: "In Transit",
//     payment: "Unpaid",
//   },
//   {
//     key: "3",
//     "tracking number": "MB555888333",
//     date: "2024-10-03",
//     name: "Michael Johnson",
//     from: "Miami, FL",
//     to: "Seattle, WA",
//     "current location": "Denver, CO",
//     status: "Delayed",
//     payment: "Paid",
//   },
//   {
//     key: "4",
//     "tracking number": "MB666777999",
//     date: "2024-10-04",
//     name: "Emily Davis",
//     from: "Atlanta, GA",
//     to: "San Francisco, CA",
//     "current location": "Phoenix, AZ",
//     status: "Delivered",
//     payment: "Paid",
//   },
//   {
//     key: "5",
//     "tracking number": "MB444555666",
//     date: "2024-10-05",
//     name: "Chris Brown",
//     from: "Dallas, TX",
//     to: "Portland, OR",
//     "current location": "Salt Lake City, UT",
//     status: "Out for Delivery",
//     payment: "Paid",
//   },
// ];

const ShipmentListTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const navigate = useNavigate();
  const { data, isFetching } = useGetShipmentsQuery();
  console.log(data?.shipments);

  const goToShipmentDetail = (shipment) => {
    navigate("/main/shipment-detail", { state: { shipment } });
  };
  const goToShipmentUpdate = (shipment) => {
    navigate("/main/update-shipment", { state: { shipment } });
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
      dataIndex: "vendor_memo_number",
      key: "vendor_memo_number",
      width: 300,
      ...getColumnSearchProps("vendor_memo_number"),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 150,
      ...getColumnSearchProps("date"),
      render: (text) => {
        return moment(text).format("YYYY-MM-DD");
      },
    },
    {
      title: "Name",
      dataIndex: "pickup_address",
      key: "pickup_address",
      width: 200,
      ...getColumnSearchProps("pickup_address"),
    },
    {
      title: "From",
      dataIndex: "driver_name",
      key: "driver_name",
      width: 200,
      ...getColumnSearchProps("driver_name"),
    },
    {
      title: "To",
      dataIndex: "pickup_person_name",
      key: "pickup_person_name",
      width: 150,
      ...getColumnSearchProps("pickup_person_name"),
    },
    {
      title: "Load Type",
      dataIndex: "load_type",
      key: "load_type",
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
      dataIndex: "vendor_total",
      key: "vendor_total",
      width: 200,
      ...getColumnSearchProps("vendor_total"),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      width: 100,
      render: (_, record) => (
        <a className="flex gap-3">
          <IoMdEyeOff onClick={() => goToShipmentDetail(record)} />
          <MdEdit onClick={() => goToShipmentUpdate(record)} />
        </a>
      ),
    },
    // Add more columns as needed
  ];

  return (
    <Table
      loading={isFetching}
      pagination={{ pageSize: 10 }}
      columns={columns}
      dataSource={data?.shipments}
      scroll={{ x: 1000 }} // Enable horizontal scrolling
      className="border border-slate-200 rounded-md"
    />
  );
};

export default ShipmentListTable;
// const shipment = {
//   trackingNumber: "MB123456789",
//   date: "2024-10-01",
//   senderName: "John Doe",
//   receiverName: "Jane Smith",
//   from: "New York, NY",
//   to: "Los Angeles, CA",
//   currentLocation: "Kansas City, MO",
//   status: "In Transit",
//   paymentStatus: "Paid",
//   timelineEvents: [
//     {
//       location: "New York, NY",
//       time: "2024-10-01 10:00 AM",
//       description: "Shipment picked up",
//       status: "completed",
//     },
//     {
//       location: "Philadelphia, PA",
//       time: "2024-10-01 5:00 PM",
//       description: "In transit",
//       status: "completed",
//     },
//     {
//       location: "Kansas City, MO",
//       time: "2024-10-02 9:00 AM",
//       description: "In transit",
//       status: "in-progress",
//     },
//     {
//       location: "Los Angeles, CA",
//       time: "Expected: 2024-10-03",
//       description: "Out for delivery",
//       status: "pending",
//     },
//   ],
// };
