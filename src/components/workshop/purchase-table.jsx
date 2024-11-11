import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useDeletePurchaseMutation } from "../../app/services/workshop/purchase";

// Sample data for demonstration
const data = [
  {
    key: "1",
    purchaseId: "PUR-001",
    itemName: "Engine Oil",
    supplier: "Auto Supplies Ltd.",
    purchaseDate: "2024-10-12",
    amount: "GHC 200",
  },
  {
    key: "2",
    purchaseId: "PUR-002",
    itemName: "Brake Pads",
    supplier: "Brake Solutions Co.",
    purchaseDate: "2024-09-25",
    amount: "GHC 150",
  },
];

const PurchaseTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [deletePurchase] = useDeletePurchaseMutation();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this purchase activity?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deletePurchase(id).unwrap();
        toast.success("Transport Forklift deleted successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete  transport");
      }
    }
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
      title: "Purchase ID",
      dataIndex: "purchaseId",
      key: "purchaseId",
      width: 120,
      ...getColumnSearchProps("purchaseId"),
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
      width: 150,
      ...getColumnSearchProps("itemName"),
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
      width: 200,
      ...getColumnSearchProps("supplier"),
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
      width: 130,
      sorter: (a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 100,
      sorter: (a, b) =>
        parseFloat(a.amount.slice(1)) - parseFloat(b.amount.slice(1)),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      width: 100,
      render: (_, record) => (
        <a>
          <DeleteOutlined
            className="text-red-500 hover:text-red-700"
            color="red"
            onClick={() => handleDelete(record?.id)}
          />
        </a>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{ x: 1000 }}
      className="border border-slate-200 rounded-md"
    />
  );
};

export default PurchaseTable;
