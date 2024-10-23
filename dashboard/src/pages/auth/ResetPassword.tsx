import * as Yup from "yup";
import { Form, Field, ErrorMessage, Formik } from "formik";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../axiosInstance";
import toast from "react-hot-toast";
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm password is required"),
  terms: Yup.bool().oneOf([true], "You must accept the terms and conditions"),
});

const ResetPassword = () => {
  const [token, setToken] = useState<any>("");

  const [initialValues, setInitialValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const verifyToken = async () => {
    try {
      const res = await axiosInstance.get(
        "/auth/verify/forgot-password?token=" + token
      );
      if (res?.status === 200) {
        setInitialValues({ ...initialValues, username: res?.data?.username });
      }
    } catch (error:any) {
      console.log(error);
      if(error?.response?.status===400){
          toast.error("Your Account Recovery Session has Expired. Please try again.")
          setTimeout(()=>{
            window.location.href="/auth/forgot-password"
          },3000)
      }
    }
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      const res = await axiosInstance.post(
        "/auth/reset/password?token=" + token,
        values
      );
      if (res?.status === 200) {
        resetForm();
        toast.success("Password has been reset successfully");
        window.location.href = "/auth/login";
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.message || "Error resetting password");
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const resetToken = urlParams.get("token");
    if (resetToken) {
      setToken(resetToken);
    }
  }, []);

  useEffect(() => {
    if (token !== undefined && token !== null && token !== "") {
      verifyToken();
    }
  }, [token]);

  return (
    <div className="flex justify-center w-full h-full">
      <div className="w-full h-full">
        <section className="bg-gray-50 dark:bg-gray-900 w-full">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8 border-2 border-slate-300 dark:border-2 dark:border-gray-300">
              <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Change Password
              </h1>

              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                enableReinitialize={true}
              >
                {() => (
                  <Form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your email
                      </label>
                      <Field
                        type="email"
                        name="username"
                        id="username"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        disabled
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        New Password
                      </label>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {/* Error message for password */}
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Confirm Password
                      </label>
                      <Field
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {/* Error message for confirmPassword */}
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <Field
                          id="terms"
                          name="terms"
                          aria-describedby="terms"
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
                      {/* Error message for terms */}
                      <ErrorMessage
                        name="terms"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-gray-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Reset Password
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResetPassword;
