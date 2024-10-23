import { Button, Divider } from "antd";
import Wrapper from "../core/wrapper";

const CustomerDetail = () => {
  return (
    <Wrapper>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-1 flex items-center justify-center flex-col border border-gray-300 rounded-md">
          <img
            src="/images/profile.png"
            className="h-32 w-32 rounded-md"
            alt=""
          />
          <h5 className="mt-3 text-2xl font-bold mb-3">Jevon Richell II</h5>
          <Button className="rounded-full bg-[#1CC88A] text-white">
            Active
          </Button>
          <Divider />

          <div>
            <h3 className="mt-5">Email</h3>
            <p></p>
          </div>
        </div>
        <div className=" col-span-2 bordre border-red-900 rounded-md bg-black h-56">
          {" "}
          home
        </div>
      </div>
    </Wrapper>
  );
};

export default CustomerDetail;
