import useAuth from "@/Hooks/Auth/useAuth";
import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import Spinner from "@/ReUseAbleFunction/Spinner/Spinner";
import successMsg from "@/ReUseAbleFunction/SuccessMsg/successMsg";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";



const MyDonations = () => {
   const axiosSecure = useAxiosSecure()
   const { user } = useAuth()
   const email = user?.email?.toLowerCase()
   const { data: donatorData = [], isLoading, isError, error, refetch } = useQuery({
      queryKey: ["donatorData", user?.email],
      queryFn: async () => {
         const res = await axiosSecure.get("/donarDataByEmail", { params: { email } })
         return res.data
      }
   })
   // console.log(donatorData)

   // handle delete --------------
   const handleDelete = async (id) => {
      // console.log(id)
      try {
         const res = await axiosSecure.delete(`/refund/${id}`)
         if (res.data.deletedCount === 1) {
            successMsg("delete successful")
            table.options?.meta?.refetch()
         }
      } catch (err) {
         errorMsg(err.message)
      }
   }

   // column definition-----------
   const columnHelper = createColumnHelper()
   const columns = [
      columnHelper.accessor("petImg", {
         id: "petImg",
         header: () => <span className="text-orange-400 mr-3 sm:mr-0">Pet Image</span>,
         cell: (info) => {
            return (
               <img src={info.getValue()} alt="petImg" className="rounded h-14 w-14" />
            )
         }
      }),
      columnHelper.accessor("petName", {
         id: "petName",
         header: () => <span className="text-orange-400 mr-3  sm:mr-0">Pet Name</span>,
         cell: (info) => <span className="text-[#ffffff]">{info.getValue()}</span>
      }),
      columnHelper.accessor("donationAmount", {
         id: "donationAmount",
         header: () => <span className="text-orange-400 mr-3  sm:mr-0">Amount</span>,
         cell: (info) => <span className="text-[#ffffff] ">{info.getValue()}</span>
      }),
      columnHelper.display({
         id: "refund",
         header: () => <span className="text-orange-400 mr-3  sm:mr-0">Refund</span>,
         cell: (info) => {
            return (
               <button className="btn "
                  onClick={() => handleDelete(info.row.original._id)}
               >Refund</button>
            )
         }
      })
   ]
   // tanstack table instance---------
   const table = useReactTable({
      data: donatorData,
      columns: columns,
      getCoreRowModel: getCoreRowModel(),
      meta: { refetch }
   })


   return (
      <div className="overflow-x-auto w-full  ">
         {isLoading && <Spinner isLoading={isLoading}></Spinner>}
         {isError && errorMsg(error.message)}

         <div className="flex-col items-center flex">
            {/* heading------------ */}
            <h2 className="flex justify-center text-3xl font-semibold text-[teal] my-4">💝 My donation</h2>
            {/* Short message under heading */}
            <p className="sm:flex justify-center text-[#ffffff] tracking-wide text-sm">You have donated <span className="sm:mx-2 sm:text-xl font-semibold text-orange-300 text-sm">{donatorData.length} </span> campaigns.Thank you for your kindness!</p>
         </div>
         <div className="flex justify-center">
            <table className="sm:table  ">
               {/* head */}
               <thead className=" ">
                  {
                     table.getHeaderGroups().map((headerGroup) => {
                        return (
                           <tr key={headerGroup.id} className=" ">
                              {
                                 headerGroup.headers.map(header => {
                                    return (
                                       <th key={header.id} className="">
                                          {
                                             flexRender(header.column.columnDef.header, header.getContext())
                                          }
                                       </th>
                                    )
                                 })
                              }
                           </tr>
                        )
                     })
                  }
               </thead>
               <tbody className="">
                  {/* row 1 */}
                  {
                     table.getRowModel().rows.map((row) => {
                        return (
                           <tr key={row.id}>
                              {row.getVisibleCells().map(cell => {
                                 return (
                                    <td key={cell.id}>
                                       {
                                          flexRender(cell.column.columnDef.cell, cell.getContext())
                                       }
                                    </td>
                                 )
                              })}
                           </tr>
                        )
                     })
                  }


               </tbody>


            </table>
         </div>
      </div>
   );
};

export default MyDonations;