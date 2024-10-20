import { ErrorMessage, Field, Form, Formik } from "formik";
import {  useState } from "react";
import * as Yup from "yup";
import { axiosInstance } from "../../axiosInstance";
import toast from "react-hot-toast";

const formValidation = Yup.object().shape({
  code: Yup.string().required("Code is required"),
  type: Yup.string().required("Type is required"),
  discount: Yup.number().required("Discount is required").positive().min(1, "Discount must be greater than 0"),
  minPurchaseValue: Yup.number().required("Minimum Purchase Value is required").positive(),
  maxDiscountValue: Yup.number().required("Max Discount Value is required").positive(),
  expiryDate: Yup.date().required("Expiry Date is required").min(new Date(), "Expiry date must be in the future"),
});

const AddCoupon = ({ openModal, close }: any) => {
  const [showModal, setShowModal] = useState(openModal);

  const initialCouponValues = {
    code: "",
    type: "",
    discount: "",
    minPurchaseValue: "",
    maxDiscountValue: "",
    expiryDate: "",
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    console.log(values)
    try {
      const res = await axiosInstance.post("/coupon", values);
      console.log(res);
      if (res.status === 200) {
        toast.success("Coupon Added Successfully");
        resetForm();
      }
    } catch (error) {
      console.log(error);
    } finally {
      close(false);
    }
  };

  return (
    <>
      {showModal ? (
        <div className="flex justify-center">
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full">
            <div className="relative my-6 mx-auto w-[80%]">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Coupon</h3>
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
                    initialValues={initialCouponValues}
                    onSubmit={handleSubmit}
                    validationSchema={formValidation}
                  >
                    {() => (
                      <Form>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Coupon Code
                            </label>
                            <Field
                              type="text"
                              name="code"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                            />
                            <ErrorMessage
                              component="div"
                              name="code"
                              className="text-red-500"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                              Type
                            </label>
                            <Field
                              as="select"
                              name="type"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                            >
                              <option value="">Select Type</option>
                              <option value="percentage">Percentage</option>
                              <option value="flat">Flat</option>
                            </Field>
                            <ErrorMessage
                              component="div"
                              name="type"
                              className="text-red-500"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                              Discount
                            </label>
                            <Field
                              type="number"
                              name="discount"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                            />
                            <ErrorMessage
                              component="div"
                              name="discount"
                              className="text-red-500"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                              Minimum Purchase Value
                            </label>
                            <Field
                              type="number"
                              name="minPurchaseValue"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                            />
                            <ErrorMessage
                              component="div"
                              name="minPurchaseValue"
                              className="text-red-500"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                              Max Discount Value
                            </label>
                            <Field
                              type="number"
                              name="maxDiscountValue"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                            />
                            <ErrorMessage
                              component="div"
                              name="maxDiscountValue"
                              className="text-red-500"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-900">
                              Expiry Date
                            </label>
                            <Field
                              type="datetime-local"
                              name="expiryDate"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                            />
                            <ErrorMessage
                              component="div"
                              name="expiryDate"
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

export default AddCoupon;
