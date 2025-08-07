import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Line } from "recharts";



const RecommendedDonation = () => {
    const axiosSecure = useAxiosSecure()
    const { data: rd_data = [] } = useQuery({
        queryKey: ["recommendedDonation"],
        queryFn: async () => {
            const res = await axiosSecure.get("/recommended_donation")
            return res.data
        }
    })
    return (
        <div id='rd' style={{ display: " " }}>
            <div className="flex flex-col items-center my-5">
                <h1 className="flex justify-center  text-3xl font-bold text-[#00bf83]">👐Extend your Kindness</h1>
                <p className="text-4xl font-bold">*****</p>
            </div>
            <div className="grid grid-cols-4">
                {
                    rd_data.map(data => <div key={data._id}>
                        <div className="flex justify-center">
                            <div className="flex flex-col items-center p-5     bg-[rgb(255,255,255)] shadow-xl rounded-lg">
                                <div >
                                    <img src={data.petPicture} alt="petPicture" className="h-[150px] w-[200px] rounded-lg" />
                                </div>
                                <div>
                                    <p className="text-xl font-semibold">{data.petName}</p>
                                </div>
                                <Link to={`/recommendedDonationDetails/${data._id}`} className="w-full btn btn-active btn-success text-[#ffffff]">
                                    <div className="w-full my-2">
                                        <button >Details</button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>

        </div>
    );
};

export default RecommendedDonation;