
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
// import required modules
import { Grid, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

const PetSwiper = ({ pets }) => {
    // console.log(pets)
    
    return (
        <Swiper
            slidesPerView={1}
            grid={{
                rows: 1,
                fill: "row",
            }}
            spaceBetween={10}
            pagination={{
                clickable: true,
            }}
            breakpoints={{
                 
                640: {
                    slidesPerView: 3,
                    grid: { rows: 2 }
                },
                1024: {
                    slidesPerView: 4,
                    grid: { rows: 2 }
                }
            }}
            modules={[Grid, Pagination]}
            className=" mySwiper"
        >
            {pets.map((pet, index) => <SwiperSlide key={index}    >

                <div className='flex justify-center h-full mb-10'>
                    <div className=" w-[90%] shadow-xl card border border-[#F3D6C2] bg-white hover:border-[#A47148]  group  h-full " >
                        <div className="card-body ">
                            {/* img------------------ */}

                            <div className='w-full sm:h-[160px] h-[200px]'>
                                <img src={pet.image} alt="petImg" className='object-cover w-full h-full rounded-xl' />
                            </div>

                            {/* pet name--------------- */}
                            <div>
                                <p className='text-5xl font-semibold text-center text-[#A47149]  font-[kapakana] group-hover:font-sans transition-all duration-500 group-hover:text-4xl'>{pet.name}</p>
                                 
                            </div>
                            <Link to={`/petDetails/${pet._id}`}>
                                <span className='flex justify-end text-xl text-blue-600 cursor-pointer animate-bounce hover:underline'>  👉 Details</span>
                            </Link>
                        </div>
                        
                    </div>
                    
                </div>
            </SwiperSlide>)}


        </Swiper>




    );
};


export default PetSwiper;