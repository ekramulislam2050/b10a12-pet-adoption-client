
import leaf from "../../assets/logo/leaf213.jpg"
const Heading = ({headingMsg}) => {
    return (
        <div className="relative flex justify-center md:h-[130px]  items-center mt-8">
            <h2 className="text-[#A47149] font-semibold text-center  mb-8 text-4xl md:text-7xl absolute -top-9 "
                style={{ fontFamily: "kapakana,sens-serif" }}
            >{headingMsg}</h2>

            <img src={leaf} alt="leaf" className='h-full' />
        </div>
    );
};

export default Heading;