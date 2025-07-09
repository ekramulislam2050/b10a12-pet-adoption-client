import { FaSearch, FaPaw, FaUserCheck, FaHome } from "react-icons/fa";

const HowItWork = () => {
    const cardData = [
        {
            icon: <FaSearch className="text-4xl text-indigo-500" />,
            title: "Browse Pets",
            desc: "Find your perfect companion by browsing through available pets."
        },
        {
            icon: <FaPaw className="text-4xl text-green-500" />,
            title: "View Details",
            desc: "Check pet details like age, breed, health status, and more."
        },
        {
            icon: <FaUserCheck className="text-4xl text-yellow-500" />,
            title: "Apply for Adoption",
            desc: "Submit your application and wait for approval."
        },
        {
            icon: <FaHome className="text-4xl text-pink-500" />,
            title: "Bring Home",
            desc: "Once approved, welcome your new furry friend home!"
        }
    ];
    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-[#A47149] to-[#607f33] py-16 px-6 flex flex-col justify-center items-center mt-5">
            <h2 className="mb-12 text-5xl font-bold text-center text-white font-[kapakana]">🐾 How It Works</h2>
            {/* card-------------- */}
            <div className="grid max-w-6xl grid-cols-1 gap-8 mx- auto md:grid-cols-2 lg:grid-cols-4">
                {
                    cardData.map((data, index) => <div key={index} className="p-6 text-center transition duration-300 bg-[#ffffff] shadow-md rounded-xl hover:shadow-xl">
                        {data.icon}
                        <h1  className="mb-2 text-xl font-semibold">{data.title}</h1>
                        <p className="text-sm text-gray-600">{data.desc}</p>
                    </div>)
                }
            </div>

        </div>
    );
};

export default HowItWork;


