
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
// import required modules
import { Grid, Pagination } from 'swiper/modules';

const PetSwiper = ({ pets }) => {
    return (
        <Swiper
            slidesPerView={1}
            grid={{
                rows: 1,
            }}
            spaceBetween={3}
            pagination={{
                clickable: true,
            }}
            breakpoints={{
                640:{slidesPerView:1,
                    grid:{rows:1}
                },
                768:{slidesPerView:3,
                    grid:{rows:2}
                },
                1024:{slidesPerView:4,
                    grid:{rows:2}
                }
            }}
            modules={[Grid,Pagination]}
            className="h-[100vh] mySwiper "
        >
            {pets.map((pet, index) => <SwiperSlide key={index}    >
           
                    <div className='flex justify-center '>
                        <div className=" w-[90%] shadow-xl card border border-[#F3D6C2] bg-white hover:border-[#A47148]  group  " >
                            <div className="card-body ">
                                {/* img------------------ */}

                                <div className='w-full md:h-[30vh] h-[70vh]'>
                                    <img src={pet.image} alt="petImg" className='w-full h-full rounded-xl' />
                                </div>

                                {/* pet name--------------- */}
                                <div>
                                    <p className='text-5xl font-semibold text-center text-[#A47149]  font-[kapakana] group-hover:font-sans transition-all duration-500 group-hover:text-4xl'>{pet.name}</p>
                                </div>

                            </div>
                        </div>
                    </div>
           





            </SwiperSlide>)}


        </Swiper>
    );
};


export default PetSwiper;