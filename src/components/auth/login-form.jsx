import { Form as AntForm, Button, Input } from "antd";
import { Field, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useLoginUserMutation } from "../../app/services/auth/auth"; // Import the useLoginMutation hook
import { Spinner } from "../../core/spinner";

const { Item } = AntForm;

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginUser, { isLoading, error }] = useLoginUserMutation(); // Use the login mutation

  // Validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters long")
      .required("Username is required"),
    password: Yup.string()
      .min(3, "Password must be at least 3 characters long")
      .required("Password is required"),
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-500">
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const result = await loginUser(values);

            if (result?.data?.status === "success") {
              localStorage.setItem("token", result.data.user.token);
              toast.success("Logged in successfully");
              navigate("/main/dashboard");
            } else {
              toast.error(result.error.data.message || "Login failed");
            }
          } catch (err) {
            console.error("Login error:", err);
            toast.error(error.data.message || "Login failed");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting, handleSubmit }) => (
          <AntForm
            onFinish={handleSubmit}
            layout="vertical"
            className="w-full max-w-md p-8 bg-white shadow-md rounded-lg relative"
          >
            <div className="flex justify-center mb-3">
              <img
                src="/images/logo.png"
                alt="random"
                className="w-32 h-32 object-contain"
              />
            </div>

            {/* {error && (
              <p className="text-red-500 text-center mb-4">
                {error?.data?.message || "Login failed"}
              </p>
            )} */}

            <Item
              label="Username"
              validateStatus={
                touched.username && errors.username ? "error" : "success"
              }
              help={
                touched.username && errors.username ? errors.username : null
              }
            >
              <Field
                name="username"
                as={Input}
                placeholder="Enter your username"
                className="custom-field"
              />
            </Item>

            <Item
              label="Password"
              validateStatus={
                touched.password && errors.password ? "error" : "success"
              }
              help={
                touched.password && errors.password ? errors.password : null
              }
            >
              <Field
                name="password"
                as={Input.Password}
                placeholder="Enter your password"
              />
            </Item>

            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full flex justify-center items-center"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? <Spinner /> : "Login"}
              </Button>
            </Item>
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <Link
                  to={"/signup"}
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </AntForm>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
