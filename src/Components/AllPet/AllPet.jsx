
import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import Spinner from "@/ReUseAbleFunction/Spinner/Spinner";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React from "react";

const AllPet = () => {
  const axiosSecure = useAxiosSecure()
  const { data: allPetWithOwner = [], isLoading, isError, error } = useQuery({
    queryKey: ["allPetWithOwner"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allPetsAndOwnersForAdmin")
      return res.data
    }
  })
  console.log(allPetWithOwner)



  // tanstack table-----------
  const columnHelper = createColumnHelper()
  const columns = [
    columnHelper.accessor("petName", {
      id: "petName",
      header: () => <span className="">petName</span>,
      cell: (info) => (
        <span className="text-blue-100 ">
          {info.getValue()}
        </span>
      )
    }),
   
    columnHelper.accessor("Owner", {
      id: "Owner",
      header: () => "Owner",
      cell: (info) => <span className="text-white">{info.getValue()}</span>
    }),
    columnHelper.display({
      id: "action",
      header: () => <span className="hidden sm:block">Action</span>,
      cell: (info) => {
        const loginUser = info.row.original

        return (


          <div className="hidden gap-2 sm:flex">
            {/* update-------- */}
            <button className="px-2 py-1 btn btn-primary btn-sm"
              onClick={() => handleMakeAdmin(loginUser._id)}
            >Edit</button>
            {/* delete ---------- */}
            <button className="px-2 py-1 btn btn-error btn-sm"
              onClick={() => handleBanAdmin(loginUser._id)}
            >Delete</button>
            {/* change status ---------- */}
            <button className="px-2 py-1 btn btn-error btn-sm"
              onClick={() => handleBanAdmin(loginUser._id)}
            >Change status</button>

          </div>



        )
      }
    })

  ]
  // table instance-----------
  const table = useReactTable({
    data:allPetWithOwner,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  if (isLoading) {
    return <Spinner isLoading={true}></Spinner>
  }
  if (isError) {
    errorMsg(error.message)
  }
  return (
    <div className="flex flex-col items-center overflow-x-auto">
      {/* heading ---------- */}
      <div>
        <h2 className="flex justify-center text-[#04709b] text-3xl font-semibold py-2"> All Registered Users</h2>
        <p className="flex justify-center text-[#ffffff] pb-2">Here you can manage all registered users of your platform. </p>
      </div>
      <div className="w-full overflow-hidden ">
        {isLoading && <Spinner isLoading={isLoading}></Spinner>}
        {isError && errorMsg(error.message)}
        <table className="table overflow-hidden">
          {/* head */}
          <thead className="overflow-hidden">
            {table.getHeaderGroups().map((headerGroups) => (
              <tr key={headerGroups.id} >
                {headerGroups.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-orange-400 cursor-pointer "
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header, header.getContext()
                    )}
                    {
                      header.column.getIsSorted() === "asc" ? " 🔼" : header.column.getIsSorted() === "desc" ? " 🔽" : null
                    }
                  </th>
                ))}
              </tr>
            )
            )}
          </thead>
          <tbody className="overflow-hidden">
            {/* row 1 */}
            <tr className="w-full border border-[#2fbbf2] sm:hidden text-center"></tr>
            {table.getRowModel().rows.map((row) => {
              const user = row.original
              return (
                <React.Fragment key={user._id}>

                  <tr key={`${user._id}-main`} >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>

                  {/* for mobile responsiveness--------- */}
                  <tr className=" sm:hidden" key={`${user._id}-mobile`}>
                    <td colSpan={6}  >
                      <div className="flex justify-evenly ">
                        {/* update-------- */}
                        <button className=" btn btn-primary btn-sm"
                          onClick={() => handleMakeAdmin(user._id)}
                        >Make Admin</button>
                        {/* delete ---------- */}
                        <button className="px-2 py-1 btn btn-error btn-sm"
                          onClick={() => handleBanAdmin(user._id)}
                        >Ban Admin</button>


                      </div>
                      <div className="border border-[#2fbbf2] mt-2 w-full text-center"></div>
                    </td>
                  </tr>
                </React.Fragment>
              )

            })}



          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AllPet;