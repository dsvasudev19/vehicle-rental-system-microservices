import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { axiosInstance } from "../../axiosInstance";
import toast from "react-hot-toast";

const formValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  regNo: Yup.string().required("Registration number is required"),
  wheelCount: Yup.number().required("Wheel count is required"),
  type: Yup.string().required("Type is required"),
  location: Yup.string().required("Location is required"),
  pincode: Yup.string().required("Pincode is required"),
  description: Yup.string().required("Description is required"),
  pricePerHr: Yup.number().required("Price per hour is required"),
  vendorId: Yup.string().required("Vendor is required"),
});

const AddVehicle = ({ openModal, close,getVehicles }: any) => {
  const [showModal, setShowModal] = useState(openModal);
  const [vendors, setVendors] = useState<any[]>([]);

  const initialVehicleValues = {
    name: "",
    regNo: "",
    wheelCount: "",
    type: "",
    location: "",
    pincode: "",
    description: "",
    pricePerHr: "",
    vendorId: "",
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
      console.log(key,values[key]);
    }
    formData.append("file", values.file);
    try {
      const res = await axiosInstance.post("/vehicle/add-vehicle", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        toast.success("Vehicle Added Successfully");
        resetForm();
        getVehicles()
      }
    } catch (error) {
      console.log(error);
    } finally {
      close(false);
    }
  };

  const getVendorDetails = async () => {
    try {
      const res = await axiosInstance.get("/vendor/id-name/vendors");
      if (res?.status === 200) {
        setVendors(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVendorDetails();
  }, []);

  return (
    <>
      {showModal ? (
        <div className="flex justify-center">
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full">
            <div className="relative my-6 mx-auto w-[80%]">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Vehicle</h3>
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
                  <Formik
                    initialValues={initialVehicleValues}
                    onSubmit={handleSubmit}
                    validationSchema={formValidation}
                  >
                    {({ setFieldValue }) => (
                      <Form>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Name
                            </label>
                            <Field
                              type="text"
                              name="name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                            />
                            <ErrorMessage
                              component="div"
                              name="name"
                              className="text-red-500"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                              Registration Number
                            </label>
                            <Field
                              type="text"
                              name="regNo"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                            />
                            <ErrorMessage
                              component="div"
                              name="regNo"
                              className="text-red-500"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                              Wheel Count
                            </label>
                            <Field
                              type="number"
                              name="wheelCount"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                            />
                            <ErrorMessage
                              component="div"
                              name="wheelCount"
                              className="text-red-500"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                              Type
                            </label>
                            <Field
                              type="text"
                              name="type"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                            />
                            <ErrorMessage
                              component="div"
                              name="type"
                              className="text-red-500"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                              Location
                            </label>
                            <Field
                              type="text"
                              name="location"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                            />
                            <ErrorMessage
                              component="div"
                              name="location"
                              className="text-red-500"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                              Pincode
                            </label>
                            <Field
                              type="text"
                              name="pincode"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                            />
                            <ErrorMessage
                              component="div"
                              name="pincode"
                              className="text-red-500"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                              Description
                            </label>
                            <Field
                              type="text"
                              name="description"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                            />
                            <ErrorMessage
                              component="div"
                              name="description"
                              className="text-red-500"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                              Price Per Hour
                            </label>
                            <Field
                              type="number"
                              name="pricePerHr"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                            />
                            <ErrorMessage
                              component="div"
                              name="pricePerHr"
                              className="text-red-500"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                              Vendor
                            </label>
                            <Field
                              as="select"
                              name="vendorId"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 me-3"
                            >
                              <option value="">Select Vendor</option>
                              {vendors?.map((vendor: any) => (
                                <option key={vendor.vendorId} value={vendor.vendorId}>
                                  {vendor.name}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              component="div"
                              name="vendorId"
                              className="text-red-500"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                              Image
                            </label>

                            <input
                              className="block w-full text-sm text-gray-200 border border-gray-300 rounded-lg cursor-pointer  dark:text-gray-400 focus:outline-none bg-gray-50  dark:placeholder-gray-400 p-2"
                              id="file"
                              type="file"
                              name="file"
                              onChange={(event) => {
                                if (
                                  event.currentTarget.files &&
                                  event.currentTarget.files[0]
                                ) {
                                  setFieldValue(
                                    "file",
                                    event.currentTarget.files[0]
                                  );
                                }
                              }}
                            />
                            <ErrorMessage
                              component="div"
                              name="imagePath"
                              className="text-red-500"
                            />
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
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </>
  );
};

export default AddVehicle;
