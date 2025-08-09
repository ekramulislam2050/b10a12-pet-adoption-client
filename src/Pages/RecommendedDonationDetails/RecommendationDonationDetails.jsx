import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import Spinner from "@/ReUseAbleFunction/Spinner/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import img1 from "../../assets/Pet-Care-img/care-1.png"
import img2 from "../../assets/Pet-Care-img/care-2.png"


const RecommendationDonationDetails = () => {
    const axiosSecure = useAxiosSecure()
    const { id } = useParams()
    const { data: rd_details = {}, isError, isLoading, error } = useQuery({
        queryKey: ["details", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/recommended_donation/${id}`)
            return res.data
        }
    })
    if (isLoading) {
        return <Spinner isLoading={isLoading}></Spinner>
    }
    if (isError) {
        return errorMsg(error.message)
    }

    return (
        <div className="min-h-screen ">
            <div className="flex flex-col items-center mt-5">
                <img src={img1} alt="img1" className="w-[15%]" />
                <h1 className="sm:text-5xl font-semibold font-[kapakana] text-[#e48d11] text-4xl">{rd_details.petName}, s details</h1>
                <img src={img2} alt="img2" className="w-[15%]" />
            </div>
            <div className="hero">

                <div className="flex-col hero-content lg:flex-row-reverse">
                    <img
                        src={rd_details.petPicture}
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                    <div>
                        <h1 className="text-5xl font-bold text-[#e48d11] ">{rd_details.petName}</h1>
                        <div className="p-6">

                            <div>💰 <strong>Max-donation amount :</strong> {rd_details.maximumDonationAmount}</div>
                            <div>💸 <strong>Donated amount :</strong> {''}</div>
                            <div> 📅 <strong>Last date of donation :</strong> {rd_details.lastDateOfDonation}</div>

                            <p className="text-lg text-gray-700">
                                <strong className="text-orange-400">Short description : </strong>{rd_details.shortDescription}
                            </p>
                            <p className="text-lg text-gray-700">
                                <strong className="text-orange-300">Long description : </strong>{rd_details.longDescription}
                            </p>
                        </div>
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button className=" btn btn-primary bg-[#e48d11] w-full text-xl tracking-wide animate-pulse" onClick={() => document.getElementById('my_modal_4').showModal()}>Donate Now</button>
                        {/* <DonationModal data={''}></DonationModal> */}




                    </div>
                </div>
            </div>

        </div>
    );
};

export default RecommendationDonationDetails;