import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";



const DonarModal = ( {data,id} ) => {

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
    //   console.log('donarData=',donarData)

    return (
        <div  >

            <dialog id={id} className=" modal modal-bottom sm:modal-middle">
                <div className="bg-[#014D4E] rounded-xl ">
                    {/* heading--------- */}
                    <div className="flex flex-col items-center mt-5 ">
                          <div className="w-[90px] h-[90px]">
                               <img src={data.petPicture} alt="img1" className=" rounded-full   border-[#ffffff] border-2 p-1 w-full h-full" />
                          </div>
                        <h1 className="sm:text-xl font-semibold   text-[#e48d11] text-2xl pb-2">Generous Donors for {data.petName}, </h1>
                      
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead  className="bg-[#01585a]" >
                                <tr className="text-[#ffffff]   ">
                                    
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    donarData.map((data, index) => <tr key={index}>
                                        
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
                                        <th>
                                            <button className="btn btn-ghost btn-xs">{data.donatedDate.split("T")[0]}</button>
                                        </th>
                                    </tr>)
                                }

                            </tbody>

                        </table>
                        <form method="dialog" className="overflow-x-auto ">
                            {/* Table content here */}
                            <div className="w-[90%] mx-auto">
                                <button
                                    type="submit"
                                    className="bg-[#ffffff] text-gray-700 my-2 py-2 rounded-full w-full"
                                    onClick={() => document.getElementById("donarModal").close()}
                                >
                                    Ok
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div >
    );
};

export default DonarModal;