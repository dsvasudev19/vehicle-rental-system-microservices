import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { axiosInstance } from "../../axiosInstance";
import toast from "react-hot-toast";

const formValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email().required("Email is required"),
  phone: Yup.string()
    .min(8, "Password must be atleast 8 Characters")
    .required("Phone is required"),
});
const EditVendor = ({ openModal, close, vendorId }: any) => {
  const [showModal, setShowModal] = useState(openModal);

  const [initialVendorValues, setInitialVendorValues] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      const res = await axiosInstance.put("/vendor/" + vendorId, values);
      if (res.status === 200) {
        toast.success("Vendor Details Updated Successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      close(false);
      resetForm();
    }
  };

  const getVendorDetails = async () => {
    try {
      const res = await axiosInstance.get("/vendor/" + vendorId);
      if (res.status === 200) {
        setInitialVendorValues(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (vendorId) {
      getVendorDetails();
    }
  }, [vendorId]);

  return (
    <>
      {showModal ? (
        <div className="flex justify-center">
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full">
            <div className="relative my-6 mx-auto w-[80%]">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit Vendor</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setShowModal(false);
                      close(false);
                    }}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                <div className="relative p-6 flex-auto">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Provide Original Phone and Email. KYC is done through
                      Phone and Email.
                    </p>

                    <Formik
                      initialValues={initialVendorValues}
                      onSubmit={handleSubmit}
                      validationSchema={formValidation}
                      enableReinitialize={true}
                    >
                      {() => (
                        <Form>
                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                              </label>
                              <div className="mt-2">
                                <Field
                                  type="text"
                                  name="name"
                                  id="name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                />
                                <ErrorMessage
                                  component={"div"}
                                  name="name"
                                  className="text-red-500"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                              </label>
                              <div className="mt-2">
                                <Field
                                  type="email"
                                  name="email"
                                  id="email"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                />
                                <ErrorMessage
                                  component={"div"}
                                  name="email"
                                  className="text-red-500"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Phone
                              </label>
                              <div className="mt-2">
                                <Field
                                  id="text"
                                  name="phone"
                                  type="phone"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                />
                                <ErrorMessage
                                  component={"div"}
                                  name="phone"
                                  className="text-red-500"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-end p-6 border-solid border-blueGray-200 rounded-b">
                            <button
                              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => {
                                setShowModal(false);
                                close(false);
                              }}
                            >
                              Close
                            </button>
                            <button
                              className="bg-gray-900 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="submit"
                            >
                              Save Changes
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </>
  );
};

export default EditVendor;
