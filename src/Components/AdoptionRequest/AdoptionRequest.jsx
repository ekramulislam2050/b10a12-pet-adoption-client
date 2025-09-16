import useAuth from "@/Hooks/Auth/useAuth";
import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import Spinner from "@/ReUseAbleFunction/Spinner/Spinner";
import successMsg from "@/ReUseAbleFunction/SuccessMsg/successMsg";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ref } from "yup";


const AdoptionRequest = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const ownerEmail = user?.email?.toLowerCase()
    const { data: requestedForAdopt = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ["requestedForAdopt", ownerEmail],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requestedForAdoptByOwnerEmail?email=${ownerEmail}`)
            return res.data
        },
        enabled: !!ownerEmail
    })
    console.log(requestedForAdopt)

    // tanstack column def----------
    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.accessor("userName", {
            id: "userName",
            header: () => <span className="text-orange-400">userName</span>,
            cell: (info) => <span className="text-[#ffffff]">{info.getValue()}</span>



        }),
        columnHelper.accessor("userEmail", {
            id: "userEmail",
            header: () => <span className="text-orange-400">userEmail</span>,
            cell: (info) => <span className="text-[#ffffff] pr-2">{info.getValue()}</span>
        }),
        columnHelper.accessor("userPhone", {
            id: "userPhone",
            header: () => <span className="text-orange-400">Phone</span>,
            cell: (info) => {
                return (
                    <span className="text-[#ffffff] pr-2">{info.getValue()}</span>
                )
            }
        }),
        columnHelper.accessor("userAddress", {
            id: "userAddress",
            header: () => <span className="text-orange-400">Location</span>,
            cell: (info) => <span className="text-[#ffffff]">{info.getValue()}</span>
        }),
        columnHelper.display({
            id: "action",
            header: () => <span className="hidden text-orange-400 sm:block">Action</span>,
            cell: (info) => {
                const rowData = info.row.original
                return (
                    <div className="hidden gap-2 sm:flex">
                        <button
                            className="border btn btn-success border-[teal]"
                            onClick={() => handleAccept(rowData._id)}
                            disabled={rowData.status === "accepted"}
                        >Accept</button>
                        <button
                            className="border btn btn-error border-[teal]"
                            onClick={() => handleReject(rowData._id)}
                            disabled={rowData.status === "rejected"}
                        >Reject</button>
                    </div>
                )
            }
        })
    ]

    // tanstack table instance------------
    const table = useReactTable({
        data: requestedForAdopt,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })

    //   handle accept btn---------
    const handleAccept = async (id) => {
        try {
            const res = await axiosSecure.patch(`/adoptPets/${id}/status`)

            if (res.data.modifiedCount > 0) {
                successMsg("status accepted")
                refetch()
            }
        } catch (err) {
            errorMsg(err.message)
        }
    }

    //  handle reject-----------
    const handleReject = async (id) => {
        try {
            const res = await axiosSecure.patch(`/adoptPets/${id}/reject`)
            if (res.data.modifiedCount > 0) {
                successMsg("status rejected")
                refetch()
            }
        } catch (err) {
            errorMsg(err.message)

        }
    }
    return (
        <div className="w-full overflow-x-auto ">
            {isLoading && <Spinner isLoading={isLoading}></Spinner>}
            {isError && errorMsg(error.message)}
            <div className="flex flex-col items-center">
                {/* heading --------- */}
                <h2 className="flex justify-center my-4 sm:text-3xl font-semibold text-[teal] text-2xl"> 📩 Adoption Requests for your pets</h2>
                {/* Short message under heading */}
                <p className="flex justify-center text-[#ffffff] tracking-wide">You have <span className="mx-1 text-xl font-semibold text-orange-400"> {requestedForAdopt.length} </span>pending request</p>
            </div>
            <table className="mx-auto sm:table">
                {/* head */}
                <thead>
                    {
                        table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {
                                    headerGroup.headers.map((header) => (
                                        <th key={header.id}>
                                            {
                                                flexRender(header.column.columnDef.header, header.getContext())
                                            }
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        table.getRowModel().rows.map((row) => {
                            const data = row.original
                            return (
                                <>
                                    <tr key={row.id}>
                                        {
                                            row.getVisibleCells().map((cell) => (
                                                <td key={cell.id}>
                                                    {
                                                        flexRender(cell.column.columnDef.cell, cell.getContext())
                                                    }
                                                </td>

                                            )

                                            )
                                        }

                                    </tr>
                                    {/* for mobile------------- */}
                                    <tr>
                                        <td colSpan={6}>
                                            <div className="flex justify-center gap-2 py-2 border-[teal] border-b-2 sm:hidden">
                                                <button
                                                    className="border btn btn-success border-[teal] btn-sm"
                                                    onClick={() => handleAccept(data._id)}
                                                    disabled={data.status === "accepted"}
                                                >Accept</button>
                                                <button
                                                    className="border btn btn-error border-[teal] btn-sm"
                                                    onClick={() => handleReject(data._id)}
                                                    disabled={data.status === "rejected"}
                                                >Reject</button>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            )
                        }
                        )
                    }

                </tbody>

            </table>
        </div>
    );
};

export default AdoptionRequest;