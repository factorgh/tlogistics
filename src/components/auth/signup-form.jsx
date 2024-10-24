import { Form as AntForm, Button, Input } from "antd";
import { Field, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useRegisterUserMutation } from "../../app/services/auth/auth";
import { Spinner } from "../../core/spinner";

const { Item } = AntForm;

const SignUpForm = () => {
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();
  const navigate = useNavigate(); // To navigate after successful registration

  // Validation schema using Yup
  const validationSchema = Yup.object({
    license: Yup.string()
      .min(3, "License must be at least 3 characters long")
      .required("License is required"),
    username: Yup.string()
      .min(6, "Username must be at least 6 characters long")
      .required("Username is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[\W_]/, "Password must contain at least one special character")
      .required("Password is required"),
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-500">
      <Formik
        initialValues={{ license: "", username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // Call the API to register the user
            const response = await registerUser(values).unwrap();

            console.log("Registration successful:", response);
            localStorage.setItem("token", response.data.user.token); // Store the token

            navigate("/main/dashboard");
          } catch (err) {
            console.error("Registration failed:", err);
            toast.error(error?.data.message || "Registration failed");
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
            {/* Logo with centered position */}
            <div className="flex justify-center mb-3">
              <img
                src="/images/logo.svg"
                alt="random"
                className="w-32 h-32 object-contain"
              />
            </div>

            <Item
              label="License / Code"
              validateStatus={
                touched.license && errors.license ? "error" : "success"
              }
              help={touched.license && errors.license ? errors.license : null}
            >
              <Field
                name="license"
                as={Input}
                placeholder="Enter your license or code"
                className="custom-field"
              />
            </Item>
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

            {/* Display API error message if any */}
            {error && (
              <div className="text-red-500 mb-2">
                {error?.data?.message ||
                  "Something went wrong. Please try again."}
              </div>
            )}

            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full flex justify-center items-center"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? <Spinner /> : "Sign Up"}
              </Button>
            </Item>
            <div className="mt-4 flex justify-center">
              <p className="text-sm text-gray-500">
                Already have an account?
                <Link
                  to={"/"}
                  className="text-blue-500 hover:text-blue-700 font-medium ml-2"
                >
                  Login
                </Link>
              </p>
            </div>
          </AntForm>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
