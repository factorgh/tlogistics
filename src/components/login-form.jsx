import { Form as AntForm, Button, Input } from "antd";
import { Field, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Spinner } from "../core/spinner";

const { Item } = AntForm;

// Spinner component

const LoginForm = () => {
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-500">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(values);

            setSubmitting(false);
          }, 2000);

          navigate("/main/dashboard");
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
              label="Email"
              validateStatus={
                touched.email && errors.email ? "error" : "success"
              }
              help={touched.email && errors.email ? errors.email : null}
            >
              <Field
                name="email"
                as={Input}
                placeholder="Enter your email"
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
                disabled={isSubmitting}
              >
                {isSubmitting ? <Spinner /> : "Login"}
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
