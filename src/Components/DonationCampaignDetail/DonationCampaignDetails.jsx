import useAxiosPublic from "@/Hooks/AxiosPublic/useAxiosPublic";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import Spinner from "@/ReUseAbleFunction/Spinner/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import img1 from "../../assets/Pet-Care-img/care-1.png"
import img2 from "../../assets/Pet-Care-img/care-2.png"
import DonationModal from "../DonationModal/DonationModal";
import RecommendedDonation from "../RecommendedDonation/RecommendedDonation";


const DonationCampaignDetails = () => {
    const { id } = useParams()

    const axiosPublic = useAxiosPublic()
    const { data: dcDetails = {}, isLoading, isError, error, } = useQuery({
        queryKey: ['dcDetails', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/cdcData/${id}`)
            return res.data
        }
    })
    // console.log(dcDetails)
    if (isLoading) {
        return <Spinner isLoading={isLoading}></Spinner>
    }
    if (isError) {
        return errorMsg(error.message || "something went wrong")
    }
    return (
        <div>
            <div className="min-h-screen ">
                <div className="flex flex-col items-center mt-5">
                    <img src={img1} alt="img1" className="w-[15%]" />
                    <h1 className="sm:text-5xl font-semibold font-[kapakana] text-[#e48d11] text-4xl">{dcDetails.petName}, s details</h1>
                    <img src={img2} alt="img2" className="w-[15%]" />
                </div>
                <div className="hero">

                    <div className="flex-col hero-content lg:flex-row-reverse">
                        <img
                            src={dcDetails.petPicture}
                            className="max-w-sm rounded-lg shadow-2xl"
                        />
                        <div>
                            <h1 className="text-5xl font-bold text-[#e48d11] ">{dcDetails.petName}</h1>
                            <div className="p-6">

                                <div>💰 <strong>Max-donation amount :</strong> {dcDetails.maximumDonationAmount}</div>
                                <div>💸 <strong>Donated amount :</strong> {dcDetails.totalDonation}</div>
                                <div> 📅 <strong>Last date of donation :</strong> {dcDetails.lastDateOfDonation}</div>

                                <p className="text-lg text-gray-700">
                                    <strong className="text-orange-400">Short description : </strong>{dcDetails.shortDescription}
                                </p>
                                <p className="text-lg text-gray-700">
                                    <strong className="text-orange-300">Long description : </strong>{dcDetails.longDescription}
                                </p>
                            </div>
                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                            <button
                                className={`btn btn-primary w-full text-xl tracking-wide animate-pulse ${dcDetails.status === "Pause" ? "btn-disabled" : ""}`}
                                disabled={dcDetails.status === "Pause"}
                                onClick={() => document.getElementById('my_modal_4').showModal()}
                            >
                                {dcDetails.status === "Pause" ? "Donation Paused ⏸️" : "Donate Now"}
                            </button>

                            <DonationModal data={dcDetails}  ></DonationModal>




                        </div>
                    </div>
                </div>

            </div>
            <RecommendedDonation  ></RecommendedDonation>
        </div>
    );
};

export default DonationCampaignDetails;