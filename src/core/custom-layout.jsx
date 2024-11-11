// eslint-disable-next-line react/prop-types
const CustomLayout = ({ children }) => {
  return (
    <div className="bg-white w-full h-full p-5 border border-gray-200 rounded-md overflow-auto ">
      {children}
    </div>
  );
};

export default CustomLayout;
