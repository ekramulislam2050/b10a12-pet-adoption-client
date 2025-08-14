import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import Spinner from "@/ReUseAbleFunction/Spinner/Spinner";
import { useQuery } from "@tanstack/react-query";
import { Field, Formik, useFormik } from "formik";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { Form } from "react-router-dom";


const EditModal = ({ id }) => {
    const axiosSecure = useAxiosSecure({})
    const modalRef = useRef()

    const { data: cdcData = {}, isLoading, isError, error } = useQuery({
        queryKey: ["cdcData", petId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/cdcData/${petId}`)
            return res.data
        }
    })
    if (isLoading) {
        return <Spinner isLoading={isLoading}></Spinner>
    }
    if (isError) {
        return errorMsg(error.message)
    }

    const [selectedDate, setSelectedDate] = useState(null)
    const formik = useFormik({
        initialValues: {
            petName: '',
            petPicture: '',
            maximumDonationAmount: '',
            lastDateOfDonation: '',
            shortDescription: '',
            longDescription: ''
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const result = await axiosPublic.post("/createDonationCampaign", values)
                if (result.data.insertedId) {
                    successMsg("successful post")
                    resetForm();
                    setSelectedDate(null)
                }
            } catch (err) {
                errorMsg(err.message)
            }

        },
    });
    return (
        <div>
            <dialog ref={modalRef} id="my_modal_6" className="modal modal-bottom sm:modal-middle">

                <div  >
                    {/* heading------------ */}
                    <div className="flex justify-center p-2 mt-3">
                        <h1 className="text-orange-300 text-4xl font-[kapakana]  tracking-wide sm:text-5xl font-semibold" > 📢	Create Donation Campaign</h1>
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
            </dialog>
        </div>
    );
};

export default EditModal;