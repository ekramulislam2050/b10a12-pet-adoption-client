import useAuth from "@/Hooks/Auth/useAuth";
import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import Spinner from "@/ReUseAbleFunction/Spinner/Spinner";
import successMsg from "@/ReUseAbleFunction/SuccessMsg/successMsg";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const MyAddedPets = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [sorting, setSorting] = useState([])

    const { data: pets = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ["myAddedPet", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allDataByEmail?email=${user?.email}`)
            return res.data
        },
        enabled: !!user?.email
    })


    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.display({
            id: "sl",
            header: "SL",
            cell: (info) => (
                <span className="text-[#ffffff]">
                    {info.row.index + 1}
                </span>
            )
        }),
        columnHelper.accessor("name", {
            id: "name",
            header: () => "Pet Name",
            cell: (info) => (
                <span className="text-[#ffffff]">
                    {info.getValue()}
                </span>
            ),

        }),
        columnHelper.accessor("category", {
            id: "category",
            header: () => "Category",
            cell: (info) => (
                <span className="text-blue-100">
                    {info.getValue()}
                </span>
            )
        }),
        columnHelper.accessor("image", {
            id: "image",
            header: () => "Image",
            cell: (info) => (
                <img src={info.getValue()} alt="petImg" className="rounded w-14 h-14" />
            )
        }),
        columnHelper.accessor("adopted", {
            id: "adopted",
            header: () => "Adoption status",
            cell: (info) => {
                const adopted = info.getValue()
                return (
                    <span className={`${adopted ? "text-[#ffffff]" : "text-red-500"}`}>
                        {adopted ? "Adopted" : "Not Adopted"}
                    </span>
                )
            }
        }),
        columnHelper.display({
            id: "action",
            header: () => "Action",
            cell: (info) => {
                const pet = info.row.original
                return (
                    <div className="flex gap-2">
                        {/* update-------- */}
                        <button className="px-2 py-1 btn btn-primary btn-sm"
                            onClick={() => navigate(`/dashboard/updatedMyAddedPets/${pet._id}`)}
                        >Update</button>
                        {/* delete ---------- */}
                        <button className="px-2 py-1 btn btn-error btn-sm"
                            onClick={() => handleDelete(pet._id)}
                        >Delete</button>
                        {/*adopt--------  */}
                        <button 
                        className= {`px-2 py-1 btn btn-success btn-sm ${pet.adopted ? " text-[#04709b] border-[#2fbbf2] " : ""}`}
                            onClick={() => handleAdopt(pet._id)}
                            disabled={pet.adopted}
                        >Adopt</button>
                    </div>
                )
            }
        })

    ]

    //  table instance--------------
    const table = useReactTable({
        data: pets,
        columns: columns,
        state: { sorting },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 10
            }
        },
        meta: { refetch }
    })

    // handle delete---------
    const handleDelete = async (id) => {
        try {
            const confirmDelete = confirm("Are you sure you want to delete this pet?")
            if (confirmDelete) {
                const res = await axiosSecure.delete(`/allPet/${id}`)
                if (res.data.deletedCount > 0) {
                    successMsg("Pet deleted successfully!")
                    table.options.meta?.refetch()
                }
            }

        } catch (err) {
            errorMsg(err.message)
        }
    }

    // handle adopt----------
    const handleAdopt = async (id) => {
        try {
            const res = await axiosSecure.patch(`/allPet/${id}/status`, { adopted: true })
            if (res.data.modifiedCount > 0) {
                successMsg("Adopt status updated successfully")

                table.options.meta?.refetch()
            }

        } catch (err) {
            errorMsg(err.message)
        }
    }

    return (
        <div className="flex flex-col items-center ">
            {/* heading ---------- */}
            <div>
                <h2 className="flex justify-center text-[#04709b] text-3xl font-semibold py-2">My Added Pets</h2>
                <p className="flex justify-center text-[#ffffff] pb-2">Here you can manage all the pets you have added </p>
            </div>
            <div className="overflow-x-auto ">
                {isLoading && <Spinner isLoading={isLoading}></Spinner>}
                {isError && errorMsg(error.message)}
                <table className="table ">
                    {/* head */}
                    <thead>
                        {table.getHeaderGroups().map((headerGroups) => (
                            <tr key={headerGroups.id} >
                                {headerGroups.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="text-orange-400 cursor-pointer"
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
                    <tbody>
                        {/* row 1 */}
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>

                        ))}
                    </tbody>

                </table>
            </div>
            {/* pagination control------- */}
            <div className="flex gap-5 py-2 my-2">
                <button
                    className="btn btn-sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Prev
                </button>

                <button
                    className="btn btn-sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </button>
            </div>
        </div>
    )

}

export default MyAddedPets;


