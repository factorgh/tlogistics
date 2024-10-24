// ./../../common/ui/AppTable";
// import AppButtons from "../../../common/ui/AppButtons";
// import AppLoader from "../../../common/ui/AppLoader";
// import TableActions from "../../../common/TableActions";
// import TableContainer from "../../../common/TableContainer";

// import SubjectFromModal from "./components/SubjectFromModal";

// import { Space, message } from "antd";
// import SearchInput from "../../../common/SearchInput";

// import {
//     useGetAllSubjectsQuery,
//     useAddSubjectMutation,
//     useDeleteSubjectMutation,
//     useUpdateSubjectMutation,
// } from "../../../redux/api/subjectApi";

// import { useState, useEffect } from "react";
// const SubjectPage = () => {
//     const [isCreateSubjectModal, setIsCreateSubjectModal] = useState(false);
//     const [isEditSubjectModal, setIsEditSubjectModal] = useState(false);

//     const [currentSubject, setCurrentSubject] = useState([]);

//     const [searchValue, setSearchValue] = useState("");
//     const [initialValues, setInitialValues] = useState({});
//     const [messageApi, contextHolder] = message.useMessage();

//     const { data, error, refetch } = useGetAllSubjectsQuery();

//     const [
//         addSubject,
//         {
//             isLoading: isAddingSubject,
//             isSuccess: isAddSubjectSuccess,
//             error: addSubjectError,
//             isError: isAddSubjectError,
//             reset: resetAddSubject,
//         },
//     ] = useAddSubjectMutation();

//     const [
//         updateSubject,
//         {
//             isLoading: isUpdatingSubject,
//             isSuccess: isUpdateSubjectSuccess,
//             error: updateSubjectError,
//             isError: isUpdateSubjectError,
//             reset: resetUpdateSubject,
//         },
//     ] = useUpdateSubjectMutation();

//     const [
//         deleteSubject,
//         {
//             isLoading: isDeletingSubject,
//             isSuccess: isDeleteSubjectSuccess,
//             error: deleteSubjectError,
//             isError: isDeleteSubjectError,
//             reset: resetDeleteSubject,
//         },
//     ] = useDeleteSubjectMutation();

//     useEffect(() => {
//         refetch();
//         setSearchValue("");

//         if (isUpdateSubjectSuccess) {
//             toggleEditSubjectModal();
//             messageApi.success("Subject updated successfully");
//         }

//         if (isDeleteSubjectSuccess) {
//             messageApi.success("Subject deleted successfully");
//         }

//         if (isAddSubjectSuccess) {
//             toggleCreateSubjectModal();
//             messageApi.success("Subject added successfully");
//         }

//         isUpdateSubjectError && messageApi.error(updateSubjectError, 20);
//         isDeleteSubjectError && messageApi.error(deleteSubjectError, 20);
//         isAddSubjectError && messageApi.error(addSubjectError, 20);

//         resetUpdateSubject();
//         resetDeleteSubject();
//         resetAddSubject();
//     }, [
//         isUpdateSubjectSuccess,
//         isUpdateSubjectError,
//         isDeleteSubjectSuccess,
//         isDeleteSubjectError,
//         isAddSubjectError,
//         isAddSubjectSuccess,
//     ]);

//     useEffect(() => {
//         setCurrentSubject(data);
//     }, [data]);

//     const onSearch = (searchQuery) => {
//         setSearchValue(searchQuery);
//         if (!searchQuery) return setCurrentSubject(data); // If no search query, return all data

//         const result = data.filter((item) =>
//             item.name.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         setCurrentSubject(result);
//     };

//     const handleSave = async (values) => {
//         await addSubject(values);
//     };

//     const handleEdit = async (values) => {
//         await updateSubject({ ...values, id: initialValues.id });
//     };

//     const handleDelete = async (subjectId) => {
//         await deleteSubject(subjectId);
//     };

//     const toggleCreateSubjectModal = () => setIsCreateSubjectModal(!isCreateSubjectModal);
//     const toggleEditSubjectModal = () => setIsEditSubjectModal(!isEditSubjectModal);

//     const Columns = [
//         {
//             title: "Name",
//             dataIndex: "name",
//             key: "name",
//             width: "50%",
//         },

//         {
//             title: "Type",
//             dataIndex: "type",
//             key: "type",
//         },

//         {
//             key: "action",
//             width: "10%",

//             render: (_, record) => {
//                 if (record?.type == "CORE") return "";

//                 return (
//                     <TableActions
//                         onEdit={() => {
//                             setInitialValues(record);
//                             toggleEditSubjectModal();
//                         }}
//                         onDelete={() => handleDelete(record.id)}
//                     />
//                 );
//             },
//         },
//     ];

//     return (
//         <>
//             <div className="flex  justify-between items-center mb-8">
//                 <h1 className=" text-[1.5rem] font-medium">Subjects</h1>
//                 <div className=" flex gap-4">
//                     {/* <AppButtons label="Import Data" type="default" /> */}
//                     <AppButtons label="Add Subject" add onClick={toggleCreateSubjectModal} />
//                 </div>
//             </div>

//             <TableContainer
//                 data={data}
//                 search={
//                     <SearchInput
//                         value={searchValue}
//                         placeholder="Search: Name  "
//                         onSearch={({ target }) => onSearch(target?.value)}
//                     />
//                 }
//                 table={
//                     <AppTable
//                         columns={Columns}
//                         data={currentSubject}
//                         pagination={data?.length > 10}
//                     />
//                 }
//             />

//             {isCreateSubjectModal && (
//                 <SubjectFromModal
//                     title="Create Subject"
//                     isModalOpen={isCreateSubjectModal}
//                     onCancel={toggleCreateSubjectModal}
//                     onFinish={handleSave}
//                 />
//             )}

//             {isEditSubjectModal && (
//                 <SubjectFromModal
//                     title="Edit Subject"
//                     isModalOpen={isEditSubjectModal}
//                     onCancel={toggleEditSubjectModal}
//                     initialValues={initialValues}
//                     onFinish={handleEdit}
//                 />
//             )}

//             <AppLoader loading={isAddingSubject || isUpdatingSubject || isDeletingSubject} />

//             {contextHolder}
//         </>
//     );
// };

// export default SubjectPage;
