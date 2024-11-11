/* eslint-disable react/prop-types */
const Wrapper = ({ children }) => {
  return (
    <div className="h-full w-full max-w-7xl  bg-gray-100 flex-1 overflow-auto p-4">
      {children}
    </div>
  );
};

export default Wrapper;
