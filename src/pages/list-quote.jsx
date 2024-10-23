import QuoteListTable from "../components/quotes/quote-list-table";
import CustomHeader from "../core/custom-header";

const ListQoutes = () => {
  return (
    <div className="bg-white w-full h-full p-5 border border-gray-200 rounded-md">
      <CustomHeader headerTitle={"Quote List"} />
      {/* Quotation form */}
      <QuoteListTable />
    </div>
  );
};

export default ListQoutes;
