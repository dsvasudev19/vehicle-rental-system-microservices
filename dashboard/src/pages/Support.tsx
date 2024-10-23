import  { useEffect, useState } from "react";
import { axiosInstance } from "../../axiosInstance";
import toast from "../../node_modules/react-hot-toast/dist/index";
import { CircleCheckBig,Trash2 } from "lucide-react";
import ClockLoader from "react-spinners/ClockLoader";

const Support = () => {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading,setLoading]=useState<any>(false)

  const getAllEnquiries = async () => {
    try {
      setLoading(true)
      const res = await axiosInstance.get("/support/enquiries");
      if (res.status === 200) {
        setEnquiries(res.data);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };

  const solveTheTicket=async(id:number)=>{
      try{
        const res=await axiosInstance.get("/support/enquiry/solve/"+id);
        if(res.status===200){
            toast.success("Solved the Ticket");
        }
      }catch(error){
          console.log(error)
      }
  }

  const deleteTheTicket=async(id:number)=>{
      try {
          const res=await axiosInstance.delete("/support/enquiry/"+id);
          if(res.status===200){
              toast.success("Ticket Deleted Successfully")
          }
      } catch (error) {
          console.log(error)
      }
  }


  useEffect(() => {
    getAllEnquiries();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="relative overflow-x-auto w-full h-full">
        <div className="flex justify-between mt-3 mb-3">
          <h1 className="text-2xl capitalize font-semibold text-gray-900">
            Enquiry Management
          </h1>
        </div>
        {
          loading ? ( <div className="flex justify-center text-center items-center w-full !h-[90%]">
          <ClockLoader color="#085387" size={200} />
        </div>):(<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                S.No
              </th>
              <th scope="col" className="px-6 py-3">
              Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Subject
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            
            {enquiries?.map((enquiry: any) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {enquiry?.id}
                  </th>
                  <td className="px-6 py-4 flex">
                    {enquiry?.customerName}
                  </td>
                  <td className="px-6 py-4">{enquiry?.email}</td>
                  <td className="px-6 py-4">{enquiry?.subject}</td>
                  <td className="px-6 py-4">{enquiry?.description}</td>
                  <td className="px-6 py-4">{
                  enquiry?.status===true ? <span className="bg-green-500 rounded p-1 text-black">Solved</span >:<span className="bg-red-500 rounded p-1 text-black">Pending</span>
                  }
                  
                  </td>
                  <td className="px-6 py-4 flex justify-end gap-4">
                   
                   <a onClick={()=>{
                       solveTheTicket(enquiry?.id)
                   }}>
                   <CircleCheckBig className="cursor-pointer hover:text-green-700" />
                   </a>
                   <a onClick={()=>{
                       deleteTheTicket(enquiry?.id)
                   }}>
                   <Trash2 className="cursor-pointer hover:text-red-700" />
                   </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>)
        }
      </div>
    </div>
  );
};

export default Support;
