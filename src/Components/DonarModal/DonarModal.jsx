import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";



const DonarModal = ({ data, id }) => {

    const axiosSecure = useAxiosSecure()
    const { data: donarData = [] } = useQuery({
        queryKey: ["donarData", data._id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donationPayment/${data._id}`)
            return res.data
        },
        enabled: !!data._id,
        refetchOnWindowFocus: false
    })
    // total donation--------
    const totalDonation = donarData.reduce((total, donar) => total + (Number(donar.donationAmount || 0)), 0)

    return (

        <div>
            <dialog id={id} className="flex justify-center modal modal-middle sm:modal-middle">
                {/* for desktop and tab------------ */}
                <div className="bg-[#014D4E] rounded-xl hidden sm:block 
                h-[400px] overflow-y-auto  ">
                    {/* heading--------- */}
                    <div className="flex flex-col items-center mt-5 ">
                        <div className=" w-[90px]  h-[90px]  ">
                            <img src={data.petPicture} alt="img1" className=" rounded-full   border-[#ffffff] border-2 p-1 w-full h-full" />
                        </div>
                        <h1 className="sm:text-2xl font-semibold   text-[#e48d11] text-xl pb-2  ">Generous Donors for {data.petName}, </h1>

                    </div>

                    <div className="overflow-x-auto ">
                        <table className="table">
                            {/* head */}
                            <thead className="bg-[#01585a]" >
                                <tr className="text-[#ffffff]   ">

                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    donarData.map((data, index) => <tr key={index} >

                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="w-12 h-12 mask mask-squircle">
                                                        <img
                                                            src={data?.photo}
                                                            alt=" img" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold"> {data.name}</div>


                                                </div>
                                            </div>
                                        </td>
                                        <td>

                                            <span className="badge badge-ghost badge-sm">{data.email}</span>
                                        </td>
                                        <td>{data.donationAmount}</td>
                                        <td>{data.donatedDate.split("T")[0]}</td>

                                    </tr>


                                    )
                                }

                                {
                                    donarData.length > 0 && (
                                        <>
                                            <tr className="border-b-2 border-[#ffffff]"></tr>
                                            <tr>

                                                <td colSpan={2}>Total Amount =</td>
                                                <td colSpan={2}>{totalDonation} Taka</td>
                                            </tr>

                                        </>
                                    )
                                }

                            </tbody>

                        </table>
                        <form method="dialog" className="overflow-x-auto ">
                            {/* Table content here */}
                            <div className="w-[90%] mx-auto">
                                <button
                                    type="submit"
                                    className="bg-[#ffffff] text-gray-700  py-2 mt-2 mb-5 rounded-full w-full"
                                    onClick={() => document.getElementById(id).close()}
                                >
                                    Ok
                                </button>
                            </div>
                        </form>
                    </div>

                </div>


                {/* for mobile-------------- */}
                <div className="block sm:hidden bg-[#01585a] rounded-xl w-[90%]  h-[400px] overflow-y-auto">
                    {/* heading--------- */}
                    <div className="flex flex-col items-center my-5 ">
                        <div className=" w-[90px]  h-[90px]  ">
                            <img src={data.petPicture} alt="img1" className=" rounded-full   border-[#ffffff] border-2 p-1 w-full h-full" />
                        </div>
                        <h1 className="sm:text-2xl font-semibold   text-[#e48d11] text-xl pb-2  ">Generous Donors for {data.petName}, </h1>

                    </div>
                    {/* card-------------------- */}
                    {
                        donarData.map((data, index) => <div key={index} className="flex flex-col items-center " >

                            <div className="w-[80px] h-[80px] my-3">
                                <img src={data.photo} alt="img" className="w-full h-full rounded-full border-2 border-[#ffffff]" />
                            </div>

                            <p>Name : {data.name}</p>
                            <p>Email : {data.email}</p>
                            <p>Date : {data.donatedDate.split("T")[0]}</p>
                            <p>Amount : {data.donationAmount}</p>

                        </div>
                        )
                    }
                    {/* btn---------- */}
                    <div className="w-[90%]   mx-auto pt-3 pb-5">
                        <button className="w-full bg-[#ffffff] text-gray-600 rounded-full" onClick={() => document.getElementById(id).close()}>ok</button>
                    </div>
                </div>

            </dialog>
        </div>




    );
};

export default DonarModal;