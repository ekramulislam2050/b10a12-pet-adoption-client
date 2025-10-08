
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import Spinner from "@/ReUseAbleFunction/Spinner/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import img1 from "../../assets/Pet-Care-img/care-1.png"
import img2 from "../../assets/Pet-Care-img/care-2.png"
import Modal from "@/Components/Modal/Modal";
import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";

const PetDetails = () => {

    const { id } = useParams()
    // console.log(id)
   
    const axiosSecure=useAxiosSecure()
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ["data"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allPet/${id}`)
            return res.data
        }
    })
    if (isLoading) {
        return <Spinner isLoading={isLoading} />
    }
    if (isError) {
        return errorMsg(error.message || "something went wrong")
    }

    const { name, age, category, image, location, postedDate, _id,shortDescription,longDescription } = data || {}
    // console.log(data)
    return (
        <div className="min-h-screen ">
            <div className="flex flex-col items-center mt-5">
                <img src={img1} alt="img1" className="w-[15%]" />
                <h1 className="sm:text-5xl font-semibold font-[kapakana] text-[#e48d11] text-4xl">{name}, s details</h1>
                <img src={img2} alt="img2" className="w-[15%]" />
            </div>
            <div className="hero">

                <div className="flex-col hero-content lg:flex-row-reverse">
                    <img
                        src={image}
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                    <div>
                        <h1 className="text-5xl font-bold text-[#e48d11] ">{name}</h1>
                        <div className="p-6">
                            <div>🎂 <strong>Age:</strong> {age}</div>
                            <div>🐾 <strong>Category:</strong> {category}</div>
                            <div>📍 <strong>location:</strong> {location}</div>
                            <div>📅 <strong>postedDate:</strong> {postedDate}</div>
                            <div>🆔 <strong>Id:</strong> {_id}</div>
                            <div>📖 <strong>shortDescription : </strong> {shortDescription}</div>
                            <div>📖 <strong>longDescription : </strong> {longDescription}</div>
                          
                        </div>
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button className=" btn btn-primary bg-[#e48d11] w-full text-xl tracking-wide animate-pulse" onClick={() => document.getElementById('my_modal_5').showModal()}>Adopt Now</button>
                        <Modal data={data}></Modal>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetDetails;