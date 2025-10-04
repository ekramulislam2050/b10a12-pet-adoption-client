import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";


const allAddedPetsModal = ({data}) => {
    console.log(data)
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    // console.log("editModal", data)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
           
            petName: data?.petName || '',
            petPicture: data?.petPicture,
            maximumDonationAmount: data?.maximumDonationAmount || "",
            lastDateOfDonation: data?.lastDateOfDonation || "",
            shortDescription: data?.shortDescription || "",
            longDescription: data?.longDescription || "",
            location: data?.location || "",
            age:data?.age || ""
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                // const result = await axiosSecure.patch(`/cdcData/${data._id}`, values)
                // if (result.data.modifiedCount > 0) {
                //     successMsg("patch successful ")
                //     resetForm();
                //     navigate("/donationCampaigns")
                // }
            } catch (err) {
                errorMsg(err.message)
            }

        },
    });
    return (
        <div className="">
            <dialog id={'petWithOwnerModal'} className=" modal sm:modal-middle modal-middle">
                <div className="bg-[#054560] h-[400px] overflow-y-auto p-5 rounded-xl shadow-lg  ">
                    {/* heading------------ */}
                    <div className="flex justify-center p-2 mt-3">
                        <h1 className="text-orange-300 text-4xl font-[kapakana]  tracking-wide sm:text-5xl font-semibold" >✏️ Edit Donation Campaign</h1>
                    </div>
                    <div className="flex flex-col ">
                        <form onSubmit={formik.handleSubmit}>
                           
                            {/* pet name------------ */}
                            <div className="flex flex-col gap-3 px-2 py-3 ">
                                <label htmlFor="petPicture" className="text-[#ffffff] ">Pet Name :</label>
                                <input
                                    id="petName"
                                    name="petName"
                                    type="text"
                                    placeholder="pet Name"
                                    onChange={formik.handleChange}
                                    value={formik.values.petName}
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
                                    placeholder="input pet image link"
                                    onChange={formik.handleChange}
                                    value={formik.values.petPicture}
                                    className="bg-[#054560] border border-orange-300 w-full
                                        rounded-[8px] p-1 text-[#ffffff]
                                       "
                                />
                            </div>
                            {/* max-donation and last date of donation------------------ */}
                            <div className="sm:justify-between sm:flex ">
                                {/* max donation----------------- */}
                                <div className="flex flex-col gap-3 px-2 py-3 sm:w-[50%]">
                                    <label htmlFor="maximumDonationAmount" className="text-[#ffffff] ">Maximum donation amount :</label>
                                    <input
                                        id="maximumDonationAmount"
                                        name="maximumDonationAmount"
                                        type="number"
                                        onChange={formik.handleChange}
                                        value={formik.values.maximumDonationAmount}
                                        className="bg-[#054560] border border-orange-300 w-full
                                        rounded-[8px] p-1 text-[#ffffff]
                                       "
                                    />
                                </div>
                                {/* last date of donation----------------- */}
                                <div className="flex flex-col gap-3 px-2 py-3 sm:w-[50%] ">
                                    <label htmlFor="lastDateOfDonation" className="text-[#ffffff] ">Last date of donation :</label>
                                    <input
                                        id="lastDateOfDonation"
                                        name="lastDateOfDonation"
                                        type="date"
                                        onChange={formik.handleChange}
                                        value={formik.values.lastDateOfDonation}
                                        className="bg-[#054560] border border-orange-300 w-full
                                        rounded-[8px] p-1 text-[#ffffff]
                                       "
                                    />
                                </div>
                            </div>
                            {/* location and age------------------ */}
                            <div className="sm:justify-between sm:flex ">
                                {/* location----------------- */}
                                <div className="flex flex-col gap-3 px-2 py-3 sm:w-[50%]">
                                    <label htmlFor="maximumDonationAmount" className="text-[#ffffff] ">Location :</label>
                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.location}
                                        className="bg-[#054560] border border-orange-300 w-full
                                        rounded-[8px] p-1 text-[#ffffff]
                                       "
                                    />
                                </div>
                                {/* age----------------- */}
                                <div className="flex flex-col gap-3 px-2 py-3 sm:w-[50%] ">
                                    <label htmlFor="lastDateOfDonation" className="text-[#ffffff] ">Age :</label>
                                    <input
                                        id="age"
                                        name="age"
                                        type="number"
                                        onChange={formik.handleChange}
                                        value={formik.values.age}
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
                                    placeholder="write short description"
                                    onChange={formik.handleChange}
                                    value={formik.values.shortDescription}
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
                                    placeholder="write long description"
                                    onChange={formik.handleChange}
                                    value={formik.values.longDescription}
                                    className="bg-[#054560] border border-orange-300 w-full
                                        rounded-[8px] p-1 text-[#ffffff]
                                       "
                                />
                            </div>

                            {/* submit btn--------------- */}
                            <div className="my-3 text-center">
                                <button type="submit" className="text-[#ffffff] btn-ghost border border-orange-300 py-2 px-3 rounded-xl w-[20%]">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>

            </dialog>
        </div>
    );
};

export default allAddedPetsModal;