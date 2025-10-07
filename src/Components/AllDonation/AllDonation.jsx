import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import Spinner from "@/ReUseAbleFunction/Spinner/Spinner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useState } from "react";
import Swal from "sweetalert2";
import AllDonationModal from "../AllDonationModal/AllDonationModal";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import successMsg from "@/ReUseAbleFunction/SuccessMsg/successMsg";

const AllDonation = () => {
    const queryClient = useQueryClient()
    const [selectedDonation, setDonation] = useState(null)

    const axiosSecure = useAxiosSecure()
    const { data: cdcDataForAdmin = [], isLoading, isError, error } = useQuery({
        queryKey: ["cdcDataForAdmin"],
        queryFn: async () => {
            const res = await axiosSecure.get("/cdcData")
            return res.data
        }
    })
    console.log("cdcDataForAdmin=", cdcDataForAdmin)

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
                const res = await axiosSecure.delete(`/deleteCdcDataByAdmin/${id}`);
                if (res.data.deletedCount > 0) {
                    successMsg("Pet deleted successfully!");
                    queryClient.invalidateQueries(["cdcDataForAdmin"]);
                } else {
                    errorMsg("Pet not found or already deleted.");
                }
            }
        } catch (err) {
            console.error(err);
            errorMsg("Failed to delete pet.");
        }
    };


    //    handle change status------------------
    const handleStatus = async (id, currentStatus) => {
        try {
            if (!currentStatus) return;

            // normalize whitespace & case
            const normalizedStatus = currentStatus.trim().toLowerCase();
            const isActive = normalizedStatus === "active";
            const newStatus = isActive ? "Pause" : "Active";

            console.log("currentStatus:", currentStatus, "normalized:", normalizedStatus);
            console.log("newStatus:", newStatus);

            const { isConfirmed } = await Swal.fire({
                title: `Are you sure you want to ${isActive ? "pause" : "unpause"} this campaign?`,
                icon: "question",
                showCancelButton: true,
                confirmButtonText: `Yes, ${isActive ? "Pause" : "Unpause"} it!`,
            });

            if (!isConfirmed) return;

            const res = await axiosSecure.patch(`/cdcStatusUpdateByAdmin/${id}`, { status: newStatus });

            console.log("Backend Response:", res.data);

            if (res.data.modifiedCount > 0) {
                successMsg(`Campaign ${isActive ? "paused" : "resumed"} successfully!`);
                queryClient.invalidateQueries(["cdcDataForAdmin"]);
            } else {
                Swal.fire("No Change", "The status was already the same.", "info");
            }
        } catch (err) {
            console.error(err);
            errorMsg("Failed to update campaign status.");
        }
    };



    // tanstack table-----------
    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.accessor("petPicture", {
            id: "petPicture",
            header: () => <span className="">petImg</span>,
            cell: (info) => (
                <img src={info.getValue()} alt="petImg" className="w-10 h-10 border rounded-full border-[#2fbbf2] sm:rounded sm:w-14 sm:h-14   " />
            )
        }),

        columnHelper.accessor("maximumDonationAmount", {
            id: "maximumDonationAmount",
            header: () => <span className="">Maximum</span>,
            cell: (info) => (
                <span className="text-blue-100 ">
                    {info.getValue()}<span className="p-1 text-sm font-extrabold text-orange-400">৳</span>
                </span>
            )
        }),

        columnHelper.accessor("totalDonation", {
            id: "totalDonation",
            header: () => <span className="">Total</span>,
            cell: (info) => <span className="text-white ">{info.getValue()}<span className="p-1 text-sm font-extrabold text-orange-400">৳</span></span>
        }),

        columnHelper.accessor("email",
            {
                id: "email",
                header: () => <span className="hidden sm:block">Owner</span>,
                cell: (info) => <span className="hidden text-white sm:block">{info?.getValue()}</span>
            }),

        columnHelper.accessor("status", {
            id: "status",
            header: () => "Status",
            cell: (info) => <span className={`${info.getValue() === "Active" ? "text-green-600" : "text-red-500"}`}>
                {info.getValue() === "Active" ? "Active" : "Pause"}
            </span>
        }),

        columnHelper.display({
            id: "action",
            header: () => <span className="hidden sm:block">Action</span>,
            cell: (info) => {
                const cdcData = info.row.original

                return (


                    <div className="hidden gap-2 sm:flex">
                        {/* update-------- */}
                        <button className="px-4 py-1 btn btn-primary btn-sm"
                            onClick={() => { setDonation(cdcData) }}
                        >Edit</button>

                        {/* delete ---------- */}
                        <button className="px-2 py-1 btn btn-error btn-sm"
                            onClick={() => handleDelete(cdcData._id)}
                        >Delete</button>
                        {/* change status ---------- */}
                        <button
                            className={`px-2 py-1 btn btn-sm ${cdcData.status === "Active" ? "btn-warning" : "btn-success"
                                }`}
                            onClick={() => handleStatus(cdcData._id, cdcData.status)}
                        >
                            {cdcData.status === "Active" ? "Pause ⏸️" : "Unpause ▶️"}
                        </button>



                    </div>



                )
            }
        })

    ]
    // table instance-----------
    const table = useReactTable({
        data: cdcDataForAdmin,
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
                selectedDonation && (
                    <AllDonationModal data={selectedDonation} onClose={() => setDonation(null)}></AllDonationModal>
                )
            }
            {/* heading ---------- */}
            <div className="px-2 text-center">
                <h2 className="flex justify-center text-[#04709b] text-3xl font-semibold py-2">All Donation</h2>
                <p className="flex sm:justify-center text-[#ffffff] pb-2 text-sm ">Here you can view, update, delete, or manage the status of all donation by users on the platform. </p>


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
                            const data = row.original
                            return (
                                <React.Fragment key={data._id}>

                                    <tr key={`${data._id}-main`} >
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>

                                    {/* for mobile responsiveness--------- */}
                                    <tr className=" sm:hidden" key={`${data._id}-mobile`}>
                                        <td colSpan={6}  >
                                            <div className="flex justify-evenly ">
                                                {/* update-------- */}
                                                <button className="px-4 py-1 btn btn-primary btn-sm"
                                                    onClick={() => { setDonation(data) }}
                                                >Edit</button>

                                                {/* delete ---------- */}
                                                <button className="px-2 py-1 btn btn-error btn-sm"
                                                    onClick={() => handleDelete(data._id)}
                                                >Delete</button>
                                                {/* change status ---------- */}
                                                <button
                                                    className={`px-2 py-1 btn btn-sm ${data.status === "Active" ? "btn-warning" : "btn-success"
                                                        }`}
                                                    onClick={() => handleStatus(data._id, data.status)}
                                                >
                                                    {data.status === "Active" ? "Pause ⏸️" : "Unpause ▶️"}
                                                </button>



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

export default AllDonation;