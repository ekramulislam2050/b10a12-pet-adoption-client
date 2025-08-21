
import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import successMsg from "@/ReUseAbleFunction/SuccessMsg/successMsg";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";


const AddPet = () => {
    const navigate=useNavigate()
    const axiosSecure = useAxiosSecure()
    const [selectedDate, setSelectedDate] = useState(null)

    const { mutate, isPending } = useMutation({
        mutationKey: ["addPet"],
        mutationFn: async (values) => {
            const res = await axiosSecure.post("/allPet",values)
            return res.data
        },
        onSuccess:()=>{
            successMsg("pet added successfully!")
            navigate("/petListing")
        },
        onError:()=>{
            errorMsg("something went wrong!")
        }
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            category: '',
            age: '',
            location: '',
            image: '',
            postedDate: ''
        },
        onSubmit: values => {
            mutate(values)
        }
    })
    return (
        <div  >
            {/* heading------------ */}
            <div className="flex justify-center p-2 mt-3">
                <h1 className="text-orange-300 text-4xl font-[kapakana]  tracking-wide sm:text-5xl font-semibold" > ➕ Add Your Pet</h1>
            </div>
            <div className="flex flex-col ">
                <form onSubmit={formik.handleSubmit}>

                    {/* pet name------------ */}
                    <div className="flex flex-col gap-3 px-2 py-3 ">
                        <label htmlFor="name" className="text-[#ffffff] ">Pet Name :</label>
                        <input
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
                            type="url"
                            placeholder="input pet image link"
                            onChange={formik.handleChange}
                            value={formik.values.image}
                            className="bg-[#054560] border border-orange-300 w-full
                                 rounded-[8px] p-1 text-[#ffffff]
                                "
                        />
                    </div>

                    {/* pet age------------ */}
                    <div className="flex flex-col gap-3 px-2 py-3 ">
                        <label htmlFor="age" className="text-[#ffffff] ">Pet Age :</label>
                        <input
                            id="age"
                            name="age"
                            type="number"
                            placeholder="input pet image link"
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
                            id="location"
                            name="location"
                            type="text"
                            placeholder="input pet image link"
                            onChange={formik.handleChange}
                            value={formik.values.location}
                            className="bg-[#054560] border border-orange-300 w-full
                                 rounded-[8px] p-1 text-[#ffffff]
                                "
                        />
                    </div>

                    {/* posted date------------ */}
                    <div className="flex flex-col gap-3 px-2 py-3 ">
                        <label htmlFor="postedDate" className="text-[#ffffff] ">Date :</label>
                        <DatePicker
                            name="postedDate"
                            id="postedDate"
                            selected={selectedDate}
                            onChange={(data) => {
                                const formattedDate = data.toISOString().split("T")[0]
                                setSelectedDate(data)
                                formik.setFieldValue("postedDate", formattedDate)
                            }}
                            dateFormat="dd/MM/yyyy"
                            className="bg-[#054560] border border-orange-300 w-full
                                 rounded-[8px] p-1 text-[#ffffff]
                                "
                            placeholderText="input postedDate"
                        />


                    </div>
                    {/* category------------ */}
                    <div className="flex flex-col gap-3 px-2 py-3 ">
                        <label htmlFor="category" className="text-[#ffffff] ">category :</label>
                        <select
                            name="category"
                            id="category"
                            onChange={formik.handleChange}
                            value={formik.values.category}
                            className="bg-[#054560] border border-orange-300 text-[#ffffff] rounded-[8px] p-1"
                        >
                            <option value="" >Choose</option>
                            <option value="Cat">Cat</option>
                            <option value="Dog">Dog</option>
                            <option value="Fish">Fish</option>
                            <option value="Rabbit">Rabbit</option>
                        </select>
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

export default AddPet;