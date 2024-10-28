import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { IoMdTrash } from "react-icons/io";
import { useEffect } from "react";
import { toast } from "react-toastify";

import {
    useGetVendorsExpenseQuery,
    useDeleteVendorExpenseMutation,
} from "../../app/services/vendor-expense/vendor-expense";

const data = [];

const VendorExpensesTable = () => {
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

    const { data: vendorData, isLoading } = useGetVendorsExpenseQuery();
    const [deleteVendorExpense, { isLoading: deleteLoading, isSuccess, isError, error, reset }] =
        useDeleteVendorExpenseMutation();

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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

    useEffect(() => {
        if (isSuccess) {
            toast.success("Vendor Expenses Deleted Successfully");
        }
        if (isError) {
            toast.error(error?.data?.message || "Failed to create vendor expenses");
        }

        reset();
    }, [isError, isSuccess]);

    const columns = [
        {
            title: "Vendor Name",
            dataIndex: "vendor",
            key: "vendor",
            width: 150,
            ...getColumnSearchProps("vendorname"),
            render: (value) => value?.name,
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: 150,
            ...getColumnSearchProps("name"),
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            width: 100,
            ...getColumnSearchProps("amount"),
        },

        {
            title: "Note",
            dataIndex: "notes",
            key: "notes",
            width: 200,
            ...getColumnSearchProps("note"),
            sorter: (a, b) => a.note.length - b.note.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 200,
            ...getColumnSearchProps("date"),
            sorter: (a, b) => a.date.length - b.date.length,
            sortDirections: ["descend", "ascend"],
        },

        {
            title: "Action",
            dataIndex: "name",
            key: "name",
            width: 100,
            render: (_, record) => {
                // console.log(record.id);
                return (
                    <a>
                        <IoMdTrash
                            color="red"
                            onClick={async () => {
                                await deleteVendorExpense(record?.id);
                            }}
                        />
                    </a>
                );
            },
        },
        // Add more columns as needed
    ];

    return (
        <Table
            columns={columns}
            dataSource={vendorData?.venderExpense || []}
            scroll={{ x: 1000 }} // Enable horizontal scrolling
            className="border border-slate-200 rounded-md"
        />
    );
};

export default VendorExpensesTable;
