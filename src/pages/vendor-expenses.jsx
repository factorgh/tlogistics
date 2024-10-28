import { Button, Dropdown } from "antd";
import { MdDownload, MdFilterAlt, MdUploadFile } from "react-icons/md";
import VendorExpensesTable from "../components/vendor/vendor-expenses-table";
import CustomHeader from "../core/custom-header";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import VendorExpenseForm from "../components/vendor_expense/VendorExpenseForm.jsX";
import { useCreateVendorExpenseMutation } from "../app/services/vendor-expense/vendor-expense";

const VendorExpenses = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [createVendorExpense, { isLoading, isSuccess, isError, error, reset }] =
        useCreateVendorExpenseMutation();

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const items = [
        {
            key: "1",
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
        {
            key: "2",
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item
                </a>
            ),
        },
        {
            key: "3",
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item
                </a>
            ),
        },
    ];

    useEffect(() => {
        if (isSuccess) {
            toast.success("Vendor Expenses Created Successfully");
            toggleModal();
        }
        if (isError) {
            toast.error(error?.data?.message || "Failed to create vendor expenses");
        }

        reset();
    }, [isError, isSuccess]);

    const onFinish = async (value) => {
        await createVendorExpense(value);
    };

    return (
        <div className="bg-white w-full h-full p-5 border border-gray-200 rounded-md">
            <div className=" flex justify-between items-center">
                <CustomHeader headerTitle={"Vendor Expenses"} />
                <div className="flex gap-3 items-center">
                    <Button type="primary" onClick={toggleModal}>
                        Add Expenses
                    </Button>
                    <Button icon={<MdDownload />} style={{ backgroundColor: "red", color: "#fff" }}>
                        PDF
                    </Button>
                    <Button
                        icon={<MdUploadFile />}
                        style={{ backgroundColor: "#1CC88A", color: "#fff" }}
                    >
                        Excel
                    </Button>
                    <Dropdown menu={{ items }} placement="bottomRight">
                        <Button>
                            Last month <MdFilterAlt />
                        </Button>
                    </Dropdown>
                </div>
            </div>
            {/* Quotation form */}
            <VendorExpensesTable />

            {isModalOpen && (
                <VendorExpenseForm
                    onFinish={onFinish}
                    toggleOpen={toggleModal}
                    isOpen={isModalOpen}
                />
            )}
        </div>
    );
};

export default VendorExpenses;
