import { EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag } from "antd";
import moment from "moment";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
import { useGetShipmentsQuery } from "../../app/services/shipment/shipment";

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
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "Pick Up Address",
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
      ...getColumnSearchProps("load_type"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 200,
      ...getColumnSearchProps("status"),
      render: (status) => {
        let color;
        switch (status) {
          case "IN_PROGRESS":
            color = "blue";
            break;
          case "DELIVERED":
            color = "green";
            break;
          case "":
            color = "orange";
            break;
          case "Cancelled":
            color = "red";
            break;
          default:
            color = "gray";
            break;
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
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
          <EyeOutlined
            className="text-gray-500 hover:text-gray-700"
            onClick={() => goToShipmentDetail(record)}
          />
          <EditOutlined
            className="text-blue-500 hover:text-blue-700"
            onClick={() => goToShipmentUpdate(record)}
          />
        </a>
      ),
    },
  ];

  return (
    <Table
      loading={isFetching}
      pagination={{ pageSize: 10 }}
      columns={columns}
      dataSource={data?.shipments}
      scroll={{ x: 1000 }}
      className="border border-slate-200 rounded-md"
    />
  );
};

export default ShipmentListTable;
