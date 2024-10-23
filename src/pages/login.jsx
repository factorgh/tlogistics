import LoginForm from "../components/login-form";

const LoginPage = () => {
  return (
    <div className="flex w-full h-full">
      <div className="flex-0.5  w-full h-full ">
        {" "}
        <LoginForm />
      </div>
      <div className="flex-0.5 bg-red-500 w-full h-full">
        <img
          src="/images/banner.jpg"
          alt="random"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
