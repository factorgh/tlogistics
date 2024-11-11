import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  useDeleteMechanicMutation,
  useGetMechanicsQuery,
} from "../../app/services/workshop/mechanic";

// Professional dummy data for the table

const MechanicTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { data: mechData, isFetching } = useGetMechanicsQuery();
  const [deleteMechanic] = useDeleteMechanicMutation();

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
      text: "Do you want to delete this mechanic activity?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteMechanic(id).unwrap();
        toast.success("Mechanic Activity deleted successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete mechanic activity");
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
      title: "Vehicle  Maintenance .",
      dataIndex: "vehicle_maintenance",
      key: "vehicle_maintenance.",
      width: 100,
      ...getColumnSearchProps("vehicle_maintenance"),
    },
    {
      title: "Diagonistic Service",
      dataIndex: "diagnostic_services",

      key: "diagonistic_services",
      width: 100,
      ...getColumnSearchProps("diagnostic_services"),
    },
    {
      title: "Repair/Overhaul",
      dataIndex: "repair_and_overhaul",
      key: "repair_and_overhaul",
      width: 100,
      ...getColumnSearchProps("repair_and_overhaul"),
    },
    {
      title: "Break Down Response",
      dataIndex: "break_down_response",
      key: "break_down_response",
      width: 300,
      ...getColumnSearchProps("break_down_response"),
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
      loading={isFetching}
      columns={columns}
      dataSource={mechData?.mechanics}
      scroll={{ x: 1000 }}
      className="border border-slate-200 rounded-md"
    />
  );
};

export default MechanicTable;
