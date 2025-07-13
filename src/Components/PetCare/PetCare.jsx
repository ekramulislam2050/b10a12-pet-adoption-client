import { FaPaw } from "react-icons/fa";
import img from "../../assets/logo/Screenshot (5).png"

import {
    FaStethoscope, FaUtensils, FaDog, FaShower, FaSyringe,
    FaHeart, FaBan, FaBed
} from "react-icons/fa";
import { Link } from "react-router-dom";

const PetCare = () => {

    const petCareTips = [
        {
            icon: <FaStethoscope className="text-3xl text-[#f7921e]" />,
            title: "Regular Health Checkups",
            description: "Take your pet to the vet at least once a year for a full health checkup."
        },
        {
            icon: <FaUtensils className="text-3xl text-[#f7921e]" />,
            title: "Proper Food and Water",
            description: "Ensure your pet gets nutritious food and fresh, clean water every day."
        },
        {
            icon: <FaDog className="text-3xl text-[#f7921e]" />,
            title: "Exercise and Play",
            description: "Engage your pet in daily walks, running, or play to keep them active and healthy."
        },
        {
            icon: <FaShower className="text-3xl text-[#f7921e]" />,
            title: "Maintain Hygiene",
            description: "Regularly bathe, groom, and clean your pet’s bedding and surroundings."
        },
        {
            icon: <FaSyringe className="text-3xl text-[#f7921e]" />,
            title: "Vaccination and Medication",
            description: "Keep up with vaccinations and deworming to prevent diseases."
        },
        {
            icon: <FaHeart className="text-3xl text-[#f7921e]" />,
            title: "Love and Attention",
            description: "Spend quality time and show affection to support your pet’s emotional well-being."
        },
        {
            icon: <FaBan className="text-3xl text-[#f7921e]" />,
            title: "Avoid Harmful Items",
            description: "Keep sharp objects, toxic foods, and chemicals away from your pet’s reach."
        },
        {
            icon: <FaBed className="text-3xl text-[#f7921e]" />,
            title: "Comfortable Sleeping Space",
            description: "Provide a quiet, cozy, and safe place for your pet to sleep."
        }
    ];




    return (
        <div>
            <div className="flex flex-col items-center mt-5">
                <div className="w-[340px] h-[300px] p-5  relative">
                    <img src={img} alt="img" className="object-cover w-full h-full" />
                    <h1 className="absolute font-[kapakana] text-5xl font-semibold text-[#f7921e] top-20 translate-x-20">Pet Care Tips</h1>
                </div>
                <h2 className="font-[kapakana] text-4xl font-semibold text-[#8dc73f] tracking-wide  text-center  p-2"> <FaPaw className="inline-block text-[#f7921e] text-2xl md:text-3xl  mr-2 " />Simple Ways to Keep Your Furry Friend Happy & Healthy</h2>
                {/* marquee---------------------- */}

                <div className="min-h-screen w-full bg-gradient-to-b from-[#8dc73f] to-[#f7921e] py-16 px-6 flex flex-col justify-center items-center mt-5">

                    {/* card-------------- */}
                    <div className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {
                            petCareTips.map((data, index) => <div key={index} className="p-6 text-center text-gray-800 transition bg-white shadow-md bg-opacity-90 rounded-xl hover:shadow-lg ">
                                {data.icon}
                                <h1 className="mb-2 text-xl font-semibold">{data.title}</h1>
                                <p className="text-sm text-gray-600">{data.description}</p>
                            </div>)
                        }
                    </div>



                    {/* button--------------------- */}
                    <Link to={"/petCareTipsDetails"}>
                        <div className="mt-5 rounded-full   bg-[#8dc73f] text-[#ffffff] py-2 px-4 hover:border border-4 ">
                            <button className="text-xl font-semibold leading-relaxed">Click To Know Every Tips Details</button>
                        </div>
                    </Link>
                </div>




            </div>
        </div >
    );
};

export default PetCare;