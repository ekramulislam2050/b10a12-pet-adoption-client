import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import successMsg from "@/ReUseAbleFunction/SuccessMsg/successMsg";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";


const AllDonationModal = ({ data, onClose }) => {

    if (!data) {
        return null
    }
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
  
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {

            petName: data?.petName || "",
            petPicture: data?.petPicture || "",
            maximumDonation: data?.maximumDonationAmount || "",
            shortDescription: data?.shortDescription || "",
            longDescription: data?.longDescription || "",
            totalDonation: data?.totalDonation || "",


        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const result = await axiosSecure.patch(`/updateCdcDataByAdmin/${data._id}`, values)
                if (result.data.modifiedCount > 0) {
                    successMsg("patch successful ")
                    resetForm();
                    onClose()
                    navigate("/donationCampaigns")
                }



            } catch (err) {
                errorMsg(err.message)
            }

        },
    });
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-[#054560] h-[400px] overflow-y-auto p-5 rounded-xl shadow-lg  ">
                {/* heading------------ */}
                <div className="flex justify-center p-2 mt-3">
                    <h1 className="text-orange-300 text-4xl font-[kapakana]  tracking-wide sm:text-5xl font-semibold" >✏️ Edit donation Information</h1>
                </div>
                <div className="flex flex-col ">
                    <form onSubmit={formik.handleSubmit}>

                        {/* pet name------------ */}
                        <div className="flex flex-col gap-3 px-2 py-3 ">
                            <label htmlFor="petName" className="text-[#ffffff] ">Pet Name :</label>
                            <input
                                id="petName"
                                name="petName"
                                type="text"

                                onChange={formik.handleChange}
                                value={formik?.values?.petName || ""}
                                className="bg-[#054560] border border-orange-300 w-full
                                        rounded-[8px] p-1 text-[#ffffff]
                                       "
                            />
                        </div>
                        {/* pet picture------------ */}
                        <div className="flex flex-col gap-3 px-2 py-3 ">
                            <label htmlFor="petPicture" className="text-[#ffffff] ">Pet Picture :</label>
                            <input
                                id="petPicture"
                                name="petPicture"
                                type="url"

                                onChange={formik.handleChange}
                                value={formik.values.petPicture || ""}
                                className="bg-[#054560] border border-orange-300 w-full
                                        rounded-[8px] p-1 text-[#ffffff]
                                       "
                            />
                        </div>
                        {/* maximumDonationAmount------------------- */}
                        <div className="sm:justify-between sm:flex ">
                            {/*maximumDonationAmount----------------- */}
                            <div className="flex flex-col gap-3 px-2 py-3 sm:w-[50%]">
                                <label htmlFor="maximumDonation" className="text-[#ffffff] ">maximumDonation :</label>
                                <input
                                    id="maximumDonation"
                                    name="maximumDonation"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.maximumDonation || ""}
                                    className="bg-[#054560] border border-orange-300 w-full
                                        rounded-[8px] p-1 text-[#ffffff]
                                       "
                                />
                            </div>

                            {/* totalDonation----------------- */}
                            <div className="flex flex-col gap-3 px-2 py-3 sm:w-[50%]">
                                <label htmlFor="totalDonation" className="text-[#ffffff] ">totalDonation :</label>
                                <input
                                    id="totalDonation"
                                    name="totalDonation"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.totalDonation || ""}
                                    className="bg-[#054560] border border-orange-300 w-full
                                        rounded-[8px] p-1 text-[#ffffff]
                                       "
                                />
                            </div>
                        </div>

                        {/* short description----------------- */}
                        <div className="flex flex-col gap-3 px-2 py-3 ">
                            <label htmlFor="shortDescription" className="text-[#ffffff] ">Short description :</label>
                            <textarea
                                id="shortDescription"
                                name="shortDescription"

                                onChange={formik.handleChange}
                                value={formik.values.shortDescription || ""}
                                className="bg-[#054560] border border-orange-300 w-full
                                        rounded-[8px] p-1 text-[#ffffff]
                                       "
                            />
                        </div>
                        {/* long description----------------- */}
                        <div className="flex flex-col gap-3 px-2 py-3 ">
                            <label htmlFor="longDescription" className="text-[#ffffff] ">Long description :</label>
                            <textarea
                                id="longDescription"
                                name="longDescription"

                                onChange={formik.handleChange}
                                value={formik.values.longDescription || ""}
                                className="bg-[#054560] border border-orange-300 w-full
                                        rounded-[8px] p-1 text-[#ffffff]
                                       "
                            />
                        </div>

                        {/* submit btn--------------- */}
                        <div className="my-3 text-center">
                            <button type="submit" className="text-[#ffffff] btn-ghost border border-orange-300 py-2 px-3 rounded-xl w-[20%]" >Submit</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default AllDonationModal;