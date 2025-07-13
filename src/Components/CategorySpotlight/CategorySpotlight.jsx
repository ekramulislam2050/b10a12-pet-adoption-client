import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import successMsg from "@/ReUseAbleFunction/SuccessMsg/successMsg";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import '/styles.css'


const CategorySpotlight = () => {



    const carousel = (slider) => {
        const z = 380
        function rotate() {
            const deg = 360 * slider.track.details.progress
            slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`
        }
        slider.on("created", () => {
            const deg = 360 / slider.slides.length
            slider.slides.forEach((element, idx) => {
                element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`
            })
            rotate()
        })
        slider.on("detailsChanged", rotate)
    }


    const [sliderRef] = useKeenSlider(
        {
            loop: true,
            selector: ".carousel__cell",
            renderMode: "custom",
            mode: "free-snap",
        },
        [carousel]
    )

    return (


        <div className="mb-[30vh] flex flex-col items-center justify-center ">
            <h1 className="pb-4 text-3xl sm:text-4xl text-[#A47149]">Category Spotlight</h1>
            <b className="pb-4 text-red-500 animate-pulse">🎯 Swipe or drag to rotate the 3D carousel.</b>
            <div className=" wrapper">
                <div className="scene">
                    {/* slider-1---------- */}
                    <div className="carousel keen-slider" ref={sliderRef}>
                        <div className="carousel__cell number-slide1 ">
                            <div className="bg-[#1f2937]/60 backdrop-blur-sm backdrop-sepia-0 p-1 mt-[-330px] w-full text-white rounded-md  ">
                                <div className="flex justify-center ">
                                    <div className="p-2 tracking-wide">
                                        <p className="text-sm"> Adoption:1,200+</p>
                                        <p className="text-sm"> Rescue:180+</p>
                                    </div>
                                    <div className="p-2 tracking-wide">
                                        <p className="text-sm"> Donation:$80,000+</p>
                                        <p className="text-sm"> Volunteers:300+</p>
                                    </div>

                                </div>
                                <h1 className="pb-2 text-sm font-bold tracking-wider text-center text-yellow-400 animate-bounce">Please choose a category button above</h1>
                            </div>
                        </div>
                        {/* slider-2------------ */}
                        <div className="carousel__cell number-slide2">
                            <div className="bg-[#1f2937]/60 backdrop-blur-sm backdrop-sepia-0 p-1 mt-[-330px] w-full text-white rounded-md  ">
                                <div className="flex justify-center ">
                                    <div className="p-2 tracking-wide">
                                        <p className="text-sm"> Adoption:1,000+</p>
                                        <p className="text-sm"> Rescue:200+</p>
                                    </div>
                                    <div className="p-2 tracking-wide">
                                        <p className="text-sm"> Donation:$30,000+</p>
                                        <p className="text-sm"> Volunteers:300+</p>
                                    </div>

                                </div>
                                <h1 className="pb-2 text-sm font-bold tracking-wider text-center text-yellow-400 animate-bounce">Please choose a category button above</h1>
                            </div>
                        </div>
                        {/* slider-3------------ */}
                        <div className="carousel__cell number-slide3">
                            <div className="bg-[#1f2937]/60 backdrop-blur-sm backdrop-sepia-0 p-1 mt-[-330px] w-full text-white rounded-md ">
                                <div className="flex justify-center ">
                                    <div className="p-2 tracking-wide">
                                        <p className="text-sm"> Adoption:1,300+</p>
                                        <p className="text-sm"> Rescue:100+</p>
                                    </div>
                                    <div className="p-2 tracking-wide">
                                        <p className="text-sm"> Donation:$60,000+</p>
                                        <p className="text-sm"> Volunteers:300+</p>
                                    </div>

                                </div>
                                <h1 className="pb-2 text-sm font-bold tracking-wider text-center text-yellow-400 animate-bounce">Please choose a category button above</h1>
                            </div>
                        </div>
                        {/* slider-4------------- */}
                        <div className="carousel__cell number-slide4">
                            <div className="bg-[#1f2937]/60 backdrop-blur-sm backdrop-sepia-0 p-1 mt-[-330px] w-full text-white rounded-md  ">
                                <div className="flex justify-center ">
                                    <div className="p-2 tracking-wide">
                                        <p className="text-sm"> Adoption:1,500+</p>
                                        <p className="text-sm"> Rescue:120+</p>
                                    </div>
                                    <div className="p-2 tracking-wide">
                                        <p className="text-sm"> Donation:$70,000+</p>
                                        <p className="text-sm"> Volunteers:300+</p>
                                    </div>

                                </div>
                                <h1 className="pb-2 text-sm font-bold tracking-wider text-center text-yellow-400 animate-bounce">Please choose a category button above</h1>
                            </div>
                        </div>
                        {/* slider-5-------------- */}
                        <div className="carousel__cell number-slide5">
                            <div className="bg-[#1f2937]/60 backdrop-blur-sm backdrop-sepia-0 p-1 mt-[-330px] w-full text-white rounded-md  ">
                                <div className="flex justify-center ">
                                    <div className="p-2 tracking-wide">
                                        <p className="text-sm"> Adoption:800+</p>
                                        <p className="text-sm"> Rescue:110+</p>
                                    </div>
                                    <div className="p-2 tracking-wide">
                                        <p className="text-sm"> Donation:$50,000+</p>
                                        <p className="text-sm"> Volunteers:300+</p>
                                    </div>

                                </div>
                                <h1 className="pb-2 text-sm font-bold tracking-wider text-center text-yellow-400 animate-bounce">Please choose a category button above</h1>
                            </div>
                        </div>
                        {/* slider-6-------------- */}
                        <div className="carousel__cell number-slide6"> <div className="bg-[#1f2937]/60 backdrop-blur-sm backdrop-sepia-0 p-1 mt-[-330px] w-full text-white rounded-md ">
                            <div className="flex justify-center ">
                                <div className="p-2 tracking-wide">
                                    <p className="text-sm"> Adoption:700+</p>
                                    <p className="text-sm"> Rescue:130+</p>
                                </div>
                                <div className="p-2 tracking-wide">
                                    <p className="text-sm"> Donation:$40,000+</p>
                                    <p className="text-sm"> Volunteers:300+</p>
                                </div>

                            </div>
                            <h1 className="pb-2 text-sm font-bold tracking-wider text-center text-yellow-400 animate-bounce">Please choose a category button above</h1>
                        </div>
                    </div>
                    {/* slider-7--------------- */}
                        <div className="carousel__cell number-slide7"> 
                            <div className="bg-[#1f2937]/60 backdrop-blur-sm backdrop-sepia-0 p-1 mt-[-330px] w-full text-white rounded-md  ">
                            <div className="flex justify-center ">
                                <div className="p-2 tracking-wide">
                                    <p className="text-sm"> Adoption:600+</p>
                                    <p className="text-sm"> Rescue:190+</p>
                                </div>
                                <div className="p-2 tracking-wide">
                                    <p className="text-sm"> Donation:$90,000+</p>
                                    <p className="text-sm"> Volunteers:300+</p>
                                </div>

                            </div>
                            <h1 className="pb-2 text-sm font-bold tracking-wider text-center text-yellow-400 animate-bounce">Please choose a category button above</h1>
                        </div>
                        </div>
                        {/* slider-8----------------- */}
                        <div className="carousel__cell number-slide8">
                            <div className="bg-[#1f2937]/60 backdrop-blur-sm backdrop-sepia-0 p-1 mt-[-330px] w-full text-white rounded-md  ">
                                <div className="flex justify-center ">
                                    <div className="p-2 tracking-wide">
                                        <p className="text-sm"> Adoption:1,400+</p>
                                        <p className="text-sm"> Rescue:130+</p>
                                    </div>
                                    <div className="p-2 tracking-wide">
                                        <p className="text-sm"> Donation:$10,000+</p>
                                        <p className="text-sm"> Volunteers:300+</p>
                                    </div>

                                </div>
                                <h1 className="pb-2 text-sm font-bold tracking-wider text-center text-yellow-400 animate-bounce">Please choose a category button above</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategorySpotlight;