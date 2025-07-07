import { FaPaw } from "react-icons/fa";
import img from "../../assets/logo/Screenshot (5).png" 

const PetCare = () => {
    return (
        <div>
            <div className="flex flex-col items-center ">
                 <div className="w-[340px] h-[300px] p-5  relative">
                         <img src={img} alt="img" className="object-cover w-full h-full"/>
                             <h1 className="absolute font-[kapakana] text-5xl font-semibold text-[#f7921e] top-20 translate-x-20">Pet Care Tips</h1>
                 </div>
                <h2 className="font-[kapakana] text-4xl font-semibold text-[#8dc73f] leading-relaxed  text-center  "> <FaPaw className="inline-block text-[#f7921e] text-2xl md:text-3xl  mr-2" />Simple Ways to Keep Your Furry Friend Happy & Healthy</h2>
              
            </div>
        </div>
    );
};

export default PetCare;