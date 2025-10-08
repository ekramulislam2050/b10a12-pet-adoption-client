import useAuth from "@/Hooks/Auth/useAuth";

import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";

import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import successMsg from "@/ReUseAbleFunction/SuccessMsg/successMsg";
import { useFormik } from "formik";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";



const CreateDonationCampaigns = () => {
    const navigate=useNavigate()
  const axiosSecure=useAxiosSecure()
    const {user}=useAuth()
    const [selectedDate, setSelectedDate] = useState(null)
    const formik = useFormik({
        initialValues: {
            email:user?.email ||'',
            petName:'',
            petPicture: '',
            maximumDonationAmount: '',
            lastDateOfDonation: '',
            shortDescription: '',
            longDescription: ''
        },
        enableReinitialize:true,
        onSubmit: async (values, { resetForm }) => {
            try {
                const result = await axiosSecure.post("/createDonationCampaign", values)
                if (result.data.insertedId) {
                    successMsg("successful post")
                    resetForm();
                    setSelectedDate(null)
                    navigate("/donationCampaigns")
                }
            } catch (err) {
                errorMsg(err.message)
            }

        },
    });
    return (
        <div  >
            {/* heading------------ */}
            <div className="flex justify-center p-2 mt-3">
                <h1 className="text-orange-300 text-4xl font-[kapakana]  tracking-wide sm:text-5xl font-semibold" > 📢	Create Donation Campaign</h1>
            </div>
            <div className="flex flex-col ">
                <form onSubmit={formik.handleSubmit}>
                    {/* email------------ */}
                    <div className="flex flex-col gap-3 px-2 py-3 ">
                        <label htmlFor="petPicture" className="text-[#ffffff] ">Email :</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder={user?.email}
                            // onChange={formik.handleChange}
                            value={formik.values.email}
                            readOnly
                            className="bg-[#054560] border border-orange-300 w-full
                          rounded-[8px] p-1 text-[#ffffff]
                         "
                        />
                    </div>
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
                                placeholder="input maximum donation amount"
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
                            <DatePicker
                                id="lastDateOfDonation"
                                name="lastDateOfDonation"
                                selected={selectedDate}
                                onChange={(date) => {
                                    const formattedDate = date.toISOString().split("T")[0]
                                    setSelectedDate(date)
                                    formik.setFieldValue('lastDateOfDonation', formattedDate)
                                }}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="select a date"
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
    );
};

export default CreateDonationCampaigns;