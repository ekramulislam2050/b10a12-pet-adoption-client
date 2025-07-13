
import leaf from "../../assets/logo/leaf213.jpg"
const Heading = ({headingMsg}) => {
    return (
        <div className="relative flex items-center justify-center px-4 mt-8">
            <h2 className="text-[#A47149] font-semibold text-center  text-5xl md:text-5xl sm:text-4xl lg:text-6xl xl:text-7xl absolute -top-9 tracking-wide"
                style={{ fontFamily: "kapakana,sens-serif" }}
            >{headingMsg}</h2>

            <img src={leaf} alt="leaf" className='w-full h-auto max-w-[600px] object-contain' />
        </div>
    );
};

export default Heading;