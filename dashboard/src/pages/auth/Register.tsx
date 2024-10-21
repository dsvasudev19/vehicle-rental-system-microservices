import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast"; // Assuming you're using react-hot-toast for notifications
import { axiosInstance } from "../../../axiosInstance";

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: any, { resetForm }: any) => {
    setIsSubmitting(true)
    try {
      const response = await axiosInstance.post("/auth/user/register", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Registration Successfull");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.message);
    }finally{
      setIsSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    termsAccepted: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-center">
        <section className="bg-gray-50 dark:bg-gray-900 w-full h-full">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 border-2 border-slate-200">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>

                <Formik
                  initialValues={{
                    username: "",
                    password: "",
                    confirmPassword: "",
                    termsAccepted: false,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-4 md:space-y-6">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Your email
                        </label>
                        <Field
                          type="email"
                          name="username"
                          id="username"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="name@provider.com"
                        />
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Password
                        </label>
                        <Field
                          type="password"
                          name="password"
                          id="password"
                          placeholder="••••••••"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Confirm password
                        </label>
                        <Field
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          placeholder="••••••••"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <Field
                            id="termsAccepted"
                            name="termsAccepted"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label className="font-light text-gray-500 dark:text-gray-300">
                            I accept the{" "}
                            <a
                              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                              href="#"
                            >
                              Terms and Conditions
                            </a>
                          </label>
                        </div>
                        <ErrorMessage
                          name="termsAccepted"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full text-white bg-gray-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? "Creating account..."
                          : "Create an account"}
                      </button>

                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account?{" "}
                        <a
                          href="/auth/login"
                          className="font-medium text-primary-800 hover:underline dark:text-primary-500"
                        >
                          Login here
                        </a>
                      </p>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
