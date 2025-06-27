
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
// import required modules
import { Grid, Pagination } from 'swiper/modules';

const PetSwiper = ({pets}) => {
    return (
        <Swiper
            slidesPerView={3}
            grid={{
                rows: 2,
            }}
            spaceBetween={30}
            pagination={{
                clickable: true,
            }}
            modules={[Grid, Pagination]}
            className="mySwiper"
        >
            {pets.map((pet, index) => <SwiperSlide key={index}><p>{pet.name}</p></SwiperSlide>)}


        </Swiper>
    );
};


export default PetSwiper;