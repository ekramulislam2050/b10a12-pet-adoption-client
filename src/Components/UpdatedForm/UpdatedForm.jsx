
import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import successMsg from "@/ReUseAbleFunction/SuccessMsg/successMsg";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatedForm = ({ data }) => {

    const [upLoading, setUploading] = useState(false)
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const [selectedDate, setSelectedDate] = useState(
        data?.postedDate ? new Date(data.postedDate) : null
    )

    const { mutate } = useMutation({
        mutationKey: ["updatePet"],
        mutationFn: async (values) => {
            const res = await axiosSecure.patch(`/allPet/${data._id}`, values)
            return res.data
        },
        onSuccess: () => {
            successMsg("pet update successfully!")
            navigate("/petListing")
        },
        onError: () => {
            errorMsg("something went wrong!")
        }
    })

    const formik = useFormik({
        initialValues: {
            name: data?.name || "",
            category: data?.category || "",
            age: data?.age || "",
            location: data?.location || "",
            image: data?.image || "",
            postedDate: data?.postedDate || "",
            shortDescription: data?.shortDescription || "",
            longDescription: data?.longDescription || ""
        },
        enableReinitialize: true,
        onSubmit: values => {
           
            mutate(values)
        }
    })
    //cloudinary img url------------
    const handleChangeImgUrl = async (e) => {
        const file = e.target.files[0]
        if (!file) {
            return
        }
        setUploading(true)
        const formattedDate = new FormData()
        formattedDate.append("file", file)
        formattedDate.append("upload_preset", "firs_time_using_cloudinary")

        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/dkupkd5fq/image/upload", formattedDate)
            const imgUrl = res.data.secure_url

            formik.setFieldValue("image", imgUrl)
            toast.success("✅ Image uploaded successfully!", {

            });
        } catch (err) {
            errorMsg(err.message)
        } finally {
            setUploading(false)
        }
    }
    // category-----------
    const categoryOptions = [
        { value: "Cat", label: "Cat" },
        { value: "Dog", label: "Dog" },
        { value: "Fish", label: "Fish" },
        { value: "Rabbit", label: "Rabbit" },
    ];
    return (
        <div  >
            <ToastContainer></ToastContainer>
            {/* heading------------ */}
            <div className="flex justify-center p-2 mt-3">
                <h1 className="text-orange-300 text-4xl font-[kapakana]  tracking-wide sm:text-5xl font-semibold" > ➕ Update Your Pet</h1>
            </div>
            <div className="flex flex-col ">
                <form onSubmit={formik.handleSubmit}>

                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        {/* pet name------------ */}
                        <div className="flex flex-col gap-3 px-2 py-3 ">
                            <label htmlFor="name" className="text-[#ffffff] ">Pet Name :</label>
                            <input
                                required
                                id="name"
                                name="name"
                                type="text"
                                placeholder="pet Name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                className="bg-[#054560] border border-orange-300 w-full
                                 rounded-[8px] p-1 text-[#ffffff]
                                "
                            />
                        </div>

                        {/* pet picture------------ */}
                        <div className="flex flex-col gap-3 px-2 py-3 ">
                            <label htmlFor="image" className="text-[#ffffff] ">Pet Picture :</label>
                            <input
                              
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"

                                onChange={handleChangeImgUrl}

                                className="hidden "
                            />
                            <label
                                htmlFor="image"
                                className="bg-[#054560] border border-orange-300 w-full
                                 rounded-[8px] p-1 text-[#ffffff]"
                            >
                                {upLoading ? <p className="text-red-500">upLoading--------</p> : "Choose Image"}


                            </label>
                            {formik.values.image && (
                                <img
                                    src={formik.values.image}
                                    alt="Pet Preview"
                                    className="object-cover h-12 mt-2 border border-orange-300 rounded-md w-14"
                                />
                            )}

                        </div>

                        {/* pet age------------ */}
                        <div className="flex flex-col gap-3 px-2 py-3 ">
                            <label htmlFor="age" className="text-[#ffffff] ">Pet Age :</label>
                            <input
                                required
                                id="age"
                                name="age"
                                type="text"
                                placeholder="input pet age"
                                onChange={formik.handleChange}
                                value={formik.values.age}
                                className="bg-[#054560] border border-orange-300 w-full
                                 rounded-[8px] p-1 text-[#ffffff]
                                "
                            />
                        </div>

                        {/* location------------ */}
                        <div className="flex flex-col gap-3 px-2 py-3 ">
                            <label htmlFor="location" className="text-[#ffffff] ">Location :</label>
                            <input
                                required
                                id="location"
                                name="location"
                                type="text"
                                placeholder="input pet location"
                                onChange={formik.handleChange}
                                value={formik.values.location}
                                className="bg-[#054560] border border-orange-300 w-full
                                 rounded-[8px] p-1 text-[#ffffff]
                                "
                            />
                        </div>


                        {/* category------------ */}
                        <div className="flex flex-col gap-3 px-2 py-3 ">
                            <label htmlFor="category" className="text-[#ffffff] ">category :</label>
                            <Select
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        backgroundColor: "#054560",
                                        borderColor: "orange",
                                        borderRadius: "8px",

                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        backgroundColor: "#065475",
                                        color: "white",

                                    }),
                                    option: (base, state) => ({
                                        ...base,
                                        backgroundColor: state.isFocused ? "#054560" : "#065475"
                                    }),
                                    singleValue: (base) => ({
                                        ...base,
                                        color: "#ffffff"
                                    }),
                                    placeholder: (base) => ({
                                        ...base,
                                        color: "lightgray"
                                    })
                                }}
                                options={categoryOptions}
                                onChange={(selectedCategory) => {
                                    formik.setFieldValue("category", selectedCategory.value)
                                }}
                                placeholder={'select category'}
                                className="w-full p-1 "
                                value={categoryOptions.find(opt => opt.value === formik.values.category)}
                            />
                        </div>

                        {/* postedDate---------------- */}
                        <div className="flex flex-col gap-3 px-2 py-3">
                            <label htmlFor="location" className="text-[#ffffff] ">Date :</label>
                            <DatePicker
                                required
                                id="postedDate"
                                name="postedDate"
                                selected={selectedDate}
                                onChange={(date) => {
                                    setSelectedDate(date)
                                    formik.setFieldValue("postedDate", date)
                                }}
                                dateFormat="dd/MM/yyyy"
                                className="bg-[#054560] border border-orange-300 w-full
                                 rounded-[8px] p-1 text-[#ffffff]
                               "
                                calendarClassName="custom-calendar  "
                            ></DatePicker>

                        </div>

                    </div>


                    {/* short description---------------- */}
                    <div className="flex flex-col gap-3 px-2 py-3">
                        <label htmlFor="location" className="text-[#ffffff] ">Short Description :</label>

                        <textarea
                            required
                            placeholder="write short description about pet"
                            id="shortDescription"
                            name="shortDescription"
                            onChange={formik.handleChange}
                            value={formik.values.shortDescription}
                            className="bg-[#054560] border border-orange-300 w-full
                                 rounded-[8px] p-1 text-[#ffffff]
                                ">

                        </textarea>
                    </div>
                    {/* long description---------------- */}
                    <div className="flex flex-col gap-3 px-2 py-3">
                        <label htmlFor="location" className="text-[#ffffff] ">Long Description :</label>

                        <textarea
                            required
                            placeholder="write long description about pet"
                            id="longDescription"
                            name="longDescription"
                            onChange={formik.handleChange}
                            value={formik.values.longDescription}
                            className="bg-[#054560] border border-orange-300 w-full
                                 rounded-[8px] p-1 text-[#ffffff]
                                ">

                        </textarea>
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

export default UpdatedForm;