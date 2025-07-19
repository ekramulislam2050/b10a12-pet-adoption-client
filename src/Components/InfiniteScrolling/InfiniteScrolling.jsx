import { motion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import SearchAndFilter from "../SearchAndFilter/SearchAndFilter";


const InfiniteScrolling = ({ availablePets }) => {
  // console.log(availablePets)
  const { scrollYProgress } = useScroll()

  return (
    <div>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 2,
          left: 0,
          right: 0,
          height: 10,
          originX: 0,
          backgroundColor: "#ff0088",
          zIndex: 50,
        }}
      />
      <Content availablePets={availablePets} />
    </div>
  );
};

export default InfiniteScrolling;

/**
 * ==============   Utils   ================
 */

function Content({ availablePets }) {
  return (
    <div className="flex flex-col ">
      <h1 className=" text-5xl flex justify-center text-[#A47149] font-[kapakana] font-semibold tracking-wide py-5">
        📦Available Now
      </h1>
      {/* search and filter------------------- */}
       <SearchAndFilter></SearchAndFilter>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {
          availablePets.map((pet, index) => <div key={index} className="mb-5">
            <div className='flex justify-center h-full '>
              <div className=" w-[90%] shadow-xl card border border-[#F3D6C2] bg-white hover:border-[#A47148]  group  h-full " >
                <div className=" card-body">
                  {/* img------------------ */}

                  <div className='w-full h-[200px] px-10  '>
                    <img src={pet.image} alt="petImg" className='object-cover w-full h-full rounded-xl' />
                  </div>

                  {/* pet name--------------- */}
                  <div>
                    <p className='text-5xl font-semibold text-center text-[#A47149]  font-[kapakana] group-hover:font-sans transition-all duration-500 group-hover:text-4xl'>{pet.name}</p>
                    <p className="text-lg">🎂 Age: {pet.age}</p>
                    <p className="text-lg">📍 Location: {pet.location}</p>
                  </div>
                  <div className="flex justify-between">
                    <span className='flex justify-start text-2xl font-semibold text-orange-600 font-[kapakana] tracking-wide'>📅 {pet.postedDate.split("T")[0]}</span>
                    <Link to={`/petDetails/${pet._id}`}>
                      <span className='flex justify-end text-xl text-blue-600 cursor-pointer animate-bounce hover:underline'>  👉 Details</span>
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </div>)
        }
      </div>
    </div>
  )
}
