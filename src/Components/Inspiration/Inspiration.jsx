import Heading from "../Heading/Heading";
import InspirationalCarousel from "../InspirationalCarousel/inspirationalCarousel";

// img----------------
import img1 from "../../assets/inspirational-img/charming-little-boy-holds-two-kitties-his-arms.jpg"
import img2 from "../../assets/inspirational-img/pretty-young-woman-petting-her-dog.jpg"
import img3 from "../../assets/inspirational-img/gettyimages-1216771462-612x612.jpg"
import img4 from "../../assets/inspirational-img/gettyimages-1383123445-612x612.jpg"
import img5 from "../../assets/inspirational-img/gettyimages-2149058679-612x612.jpg"


const Inspiration = () => {
    return (
        <div className="flex flex-col items-center px-4 pt-3 space-y-6 md:px-8 lg:px-16 md:pt-12">
            {/* heading---------------- */}
            <div className="w-full space-y-1">
                <div className="relative flex justify-center">

                    <img src="https://i.ibb.co/JRhkGZQx/9007065.png" alt="" className="lg:h-[300px] h-[250px] md:h-[250px]" />

                    <p className="lg:text-4xl text-[#A47149] text-center absolute top-1/2 font-[kapakana,sens-serif] font-semibold md:text-3xl text-3xl -translate-y-1/2 tracking-wide">Be Kind. Adopt.</p>

                </div>
                <div className="mb-2 text-center md:mb-6">
                    <p className="text-3xl md:text-4xl lg:text-4xl font-[kapakana,sens-serif]  text-[#A47149] font-semibold tracking-wide">Adopt a pet today and change a life — theirs and yours.</p>
                </div>
            </div>
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                {/* left div------------------- */}
                <div className="lg:h-[470px] w-full h-[350px] md:h-[453px]">

                    <InspirationalCarousel imgArr={[img1, img2, img3, img4, img5]}></InspirationalCarousel>
                </div>
                {/* right div-------------------- */}
                <div className="border-[#A47149] border rounded-lg p-4 md:p-6  lg:h-[470px] w-full h-[350px] md:h-[450px]">
                    <div className="pb-4">
                        <Heading headingMsg={'Benefits'}></Heading>
                    </div>
                    <div className="text-center  text-[#A47149] space-y-3 text-base md:text-lg font-semibold leading-relaxed"  >
                        <p >🐶 By adopting, you save a life</p>
                        <p >  🏠 You provide them with a safe and loving shelter</p>
                        <p >❤️ You begin a new relationship filled with friendship and love</p>
                        <p >💸 Often, it is more affordable than buying a pet</p>
                    </div>
                </div>
            </div>
        </div>


    );

   };

export default Inspiration;