import AllAddedPetsModal from "../../Components/AllAddedPetsModal/AllAddedPetsModal"
import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import Spinner from "@/ReUseAbleFunction/Spinner/Spinner";
import successMsg from "@/ReUseAbleFunction/SuccessMsg/successMsg";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useState } from "react";
import Swal from "sweetalert2";

const AllPet = () => {
  const queryClient = useQueryClient()
  const [selectedPet, setSelectedPet] = useState(null)
  console.log("selectedPet=", selectedPet)
  const axiosSecure = useAxiosSecure()
  const { data: allPetWithOwner = [], isLoading, isError, error } = useQuery({
    queryKey: ["allPetWithOwner"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allPetsAndOwnersForAdmin")
      return res.data
    }
  })
  console.log(allPetWithOwner)

  // handleDelete----------
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/deletePetByAdmin/${id}`);
        if (res.data.deletedCount > 0) {
          successMsg("Pet deleted successfully!");
          queryClient.invalidateQueries(["allPetWithOwner"]);
        } else {
          errorMsg("Pet not found or already deleted.");
        }
      }
    } catch (err) {
      console.error(err);
      errorMsg("Failed to delete pet.");
    }
  };


  // handle change status-----------
  const handleStatus = async (id, currentStatus) => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to change this pet's adoption status?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, change it!",
      });

      if (!isConfirmed) return;

      const newStatus = { adopted: !currentStatus };
      const res = await axiosSecure.patch(`/statusUpdateByAdmin/${id}`, newStatus);

      if (res.data.modifiedCount > 0) {
        successMsg("Status updated successfully!");
        queryClient.invalidateQueries(["allPetWithOwner"]);
      } else {
        Swal.fire("No Change", "The status was already the same.", "info");
      }
    } catch (err) {
      console.error(err);
      errorMsg("Failed to update pet status.");
    }
  };

  // tanstack table-----------
  const columnHelper = createColumnHelper()
  const columns = [
    columnHelper.accessor("image", {
      id: "image",
      header: () => <span className="">petImg</span>,
      cell: (info) => (
        <img src={info.getValue()} alt="petImg" className="w-10 h-10 border rounded-full border-[#2fbbf2] sm:rounded sm:w-14 sm:h-14   " />
      )
    }),

    columnHelper.accessor("name", {
      id: "name",
      header: () => <span className="">petName</span>,
      cell: (info) => (
        <span className="text-blue-100 ">
          {info.getValue()}
        </span>
      )
    }),

    columnHelper.accessor("category", {
      id: "category",
      header: () => <span className="hidden sm:block">Category</span>,
      cell: (info) => <span className="hidden text-white sm:block">{info.getValue()}</span>
    }),

    columnHelper.accessor((row) => row.petInfoWithOwner?.name || "UnKnown",
      {
        id: "Owner",
        header: () => "Owner",
        cell: (info) => <span className="text-white">{info.getValue()}</span>
      }),

    columnHelper.accessor("adopted", {
      id: "adopted",
      header: () => "Status",
      cell: (info) => <span className={`${info?.getValue() ? "text-green-600" : "text-red-500"}`}>
        {info.getValue() ? "Adopted" : "NotAdopted"}
      </span>
    }),

    columnHelper.display({
      id: "action",
      header: () => <span className="hidden sm:block">Action</span>,
      cell: (info) => {
        const petWithOwner = info.row.original
        console.log("petWithOwner=", petWithOwner)
        return (


          <div className="hidden gap-2 sm:flex">
            {/* update-------- */}
            <button className="px-4 py-1 btn btn-primary btn-sm"
              onClick={() => { setSelectedPet(petWithOwner) }}
            >Edit</button>

            {/* delete ---------- */}
            <button className="px-2 py-1 btn btn-error btn-sm"
              onClick={() => handleDelete(petWithOwner._id)}
            >Delete</button>
            {/* change status ---------- */}
            <button className="px-2 py-1 btn btn-success btn-sm"
              onClick={() => handleStatus(petWithOwner._id, petWithOwner.adopted)}
            >Change status</button>



          </div>



        )
      }
    })

  ]
  // table instance-----------
  const table = useReactTable({
    data: allPetWithOwner,
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
      {/* modal components------------------- */}
      {
        selectedPet && (
          <AllAddedPetsModal data={selectedPet} onClose={() => setSelectedPet(null)}></AllAddedPetsModal>
        )
      }
      {/* heading ---------- */}
      <div className="px-2 text-center">
        <h2 className="flex justify-center text-[#04709b] text-3xl font-semibold py-2">All Added Pets</h2>
        <p className="flex sm:justify-center text-[#ffffff] pb-2 text-sm ">Here you can view, update, delete, or manage the status of all pets added by users on the platform. </p>


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
                        <button className="px-4 py-1 btn btn-primary btn-sm"
                          onClick={() => { setSelectedPet(user) }}
                        >Edit</button>

                        {/* delete ---------- */}
                        <button className="px-2 py-1 btn btn-error btn-sm"
                          onClick={() => handleDelete(user._id)}
                        >Delete</button>
                        {/* change status ---------- */}
                        <button className="px-2 py-1 btn btn-success btn-sm"
                          onClick={() => handleStatus(user._id, user.adopted)}
                        >Change status</button>



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