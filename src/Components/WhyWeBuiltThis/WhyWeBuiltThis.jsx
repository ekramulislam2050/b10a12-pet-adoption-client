import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import img1 from '../../assets/Imotional-img/full-shot-woman-playing-with-cute-dog.jpg';
import img2 from '../../assets/Imotional-img/girl-plays-with-domestic-rabbit-street-pet-concept (1).jpg';
import img3 from '../../assets/Imotional-img/girl-plays-with-domestic-rabbit-street-pet-concept.jpg';
import img4 from '../../assets/Imotional-img/high-angle-woman-caring-rabbit.jpg';
import img5 from "../../assets/Imotional-img/woman-petting-adorable-rabbit.jpg";
import { FaHome, FaPaw, FaSearch, FaUserCheck } from "react-icons/fa";

// img array--------------------------
const images = [img1, img2, img3, img4, img5];

// card data---------------------------
const cardData = [
  {
    icon: <FaPaw className="text-4xl text-pink-500" />,
    title: "Animal Welfare",
    desc: "We aim to reduce the number of homeless animals by finding them loving families."
  },
  {
    icon: <FaSearch className="text-4xl text-indigo-500" />,
    title: "Easy Pet Discovery",
    desc: "We built this platform to make it easier to discover pets in need of adoption."
  },
  {
    icon: <FaUserCheck className="text-4xl text-yellow-500" />,
    title: "Trust & Transparency",
    desc: "We ensure transparency between adopters and shelters with verified information."
  },
  {
    icon: <FaHome className="text-4xl text-green-500" />,
    title: "Forever Homes",
    desc: "Our goal is to give every pet a safe and loving forever home."
  }
];


const WhyWeBuiltThis = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="flex items-center justify-center w-screen min-h-screen py-10">
      <div className="relative w-[90%]  h-[95vh] overflow-hidden shadow-xl rounded-xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt="Emotional Image"
            className="absolute object-cover w-full h-full"
            initial={{ opacity: 0, y: 50, scale: 1.05 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              opacity: { duration: 1.2, ease: "easeInOut" },
              scale: { duration: 1.5, ease: [0.4, 0, 0.2, 1] } // smoother custom bezier
            }}
          />
        </AnimatePresence>

        {/* black overlay----------------- */}
        <div className="absolute inset-0 z-10 bg-black bg-opacity-50"></div>

        {/* card----overly---------------------- */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 py-8 overflow-y-auto text-white">

          <h2 className="mb-8 text-4xl md:text-5xl font-bold text-center font-[kapakana] drop-shadow-xl">🐾 Why We Built This</h2>
          {/* card------------------- */}
          <div className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {
              cardData.map((data, index) => <div key={index} className="p-6 text-center text-gray-800 transition bg-white shadow-md bg-opacity-90 rounded-xl hover:shadow-lg ">
                {data.icon}
                <h1 className="mb-2 text-xl font-semibold">{data.title}</h1>
                <p className="text-sm text-gray-600">{data.desc}</p>
              </div>)
            }
          </div>
          
        </div>
      </div>

    </div>
  );
};

export default WhyWeBuiltThis;

