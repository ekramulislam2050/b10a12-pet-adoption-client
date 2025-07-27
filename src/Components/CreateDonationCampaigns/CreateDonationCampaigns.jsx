import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import successMsg from "@/ReUseAbleFunction/SuccessMsg/successMsg";
import { useFormik } from "formik";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const CreateDonationCampaigns = () => {
    const axiosSecure=useAxiosSecure()
    const [selectedDate, setSelectedDate] = useState(null)
    const formik = useFormik({
        initialValues: {
            petPicture: '',
            maximumDonationAmount: '',
            lastDateOfDonation: '',
            shortDescription: '',
            longDescription: ''
        },
        onSubmit: async(values) => {
             try{
                const result = await axiosSecure.post("/createDonationCampaign",values)
            if(result.data.insertedId){
                successMsg("successful post")
            }
             }catch(err){
                errorMsg(err.message)
             }
            
        },
    });
    return (
        <div className="flex flex-col ">
            <form onSubmit={formik.handleSubmit}>
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
                <div className="flex justify-between">
                    {/* max donation----------------- */}
                    <div className="flex flex-col gap-3 px-2 py-3 w-[50%]">
                        <label htmlFor="maximumDonationAmount" className="text-[#ffffff] ">Maximum donation amount :</label>
                        <input
                            id="maximumDonationAmount"
                            name="maximumDonationAmount"
                            type="number"
                            placeholder=""
                            onChange={formik.handleChange}
                            value={formik.values.maximumDonationAmount}
                            className="bg-[#054560] border border-orange-300 w-full
                          rounded-[8px] p-1 text-[#ffffff]
                         "
                        />
                    </div>
                    {/* last date of donation----------------- */}
                    <div className="flex flex-col gap-3 px-2 py-3 w-[50%]">
                        <label htmlFor="lastDateOfDonation" className="text-[#ffffff] ">Last date of donation :</label>
                        <DatePicker
                            id="lastDateOfDonation"
                            name="lastDateOfDonation"
                            selected={selectedDate}
                            onChange={(date) => {
                                const formattedDate=date.toISOString().split("T")[0]
                                setSelectedDate(date )
                                formik.setFieldValue('lastDateOfDonation',formattedDate )
                            }}

                          
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
    );
};

export default CreateDonationCampaigns;