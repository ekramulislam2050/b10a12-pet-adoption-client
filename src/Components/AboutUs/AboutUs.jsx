import Heading from "../Heading/Heading";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import AboutTeam from "../AboutTeam/AboutTeam";
import WhoWeAre from "../WhoWeAre/WhoWeAre";
import OurMission from "../OurMission/OurMission";
import HowItWork from "../HowItWork/HowItWork";
import WhyItBuiltThis from "../WhyItBuiltThis/WhyItBuiltThis";



const tabs = [
    { label: "About Team", content: <AboutTeam></AboutTeam> },
    { label: "Who We Are", content: <WhoWeAre></WhoWeAre> },
    { label: "Our Mission", content: <OurMission></OurMission> },
    { label: "How It Work", content: <HowItWork></HowItWork> },
    { label: "Why we Built This", content: <WhyItBuiltThis></WhyItBuiltThis> },
];




const AboutUs = () => {
    const [selectedTab, setSelectedTab] = useState(tabs[0])


    return (
        <div className="flex flex-col items-center justify-center pt-10">
            {/* Icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-14 h-14 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-[#607f33] p-2 sm:p-3 rounded-full"
                fill="black"
            >
                <path
                    d="M256 0C114.836 0 0 114.836 0 256s114.836 256 256 256 256-114.836 256-256S397.164 0 256 0zm0 472c-119.385 0-216-96.615-216-216S136.615 40 256 40s216 96.615 216 216-96.615 216-216 216z"
                    fill="#ffffff"
                />
                <path
                    d="M256 376c-13.255 0-24-10.745-24-24V232c0-13.255 10.745-24 24-24s24 10.745 24 24v120c0 13.255-10.745 24-24 24zM256 160c-17.673 0-32-14.327-32-32s14.327-32 32-32 32 14.327 32 32-14.327 32-32 32z"
                    fill="#ffffff"
                />
            </svg>

            <Heading headingMsg={"About Us"} />

            {/* --------------------------- */}
            <div className="w-[98%] flex flex-col items-center justify-center ">
                <nav className="flex justify-center w-full ">
                    <div className="lg:w-[45%] lg:h-[15vh] overflow-x-scroll md:w-[60%]  md:h-[15vh]  ">
                        <ul className="flex gap-1 px-2 py-2 w-max whitespace-nowrap">
                            {tabs.map((item) => (
                                <motion.li
                                    key={item.label}
                                    initial={false}
                                    animate={{
                                        backgroundColor:
                                            item === selectedTab ? "#607f33" : "#A47149",
                                    }}

                                    onClick={() => setSelectedTab(item)}
                                    className="text-[#ffffff] rounded-full px-3 py-[2px] text-[16px] cursor-pointer"
                                >
                                    {`${item.label}`}
                                    {item === selectedTab ? (
                                        <motion.div

                                            layoutId="underline"
                                            id="underline"
                                        />
                                    ) : null}
                                </motion.li>
                            ))}
                        </ul>
                        <div className="flex justify-center text-sm font-semibold text-orange-300 animate-pulse ">
                            ⇆ Drag
                        </div>
                    </div>


                </nav>
                <main className="flex items-center justify-center w-full" >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedTab ? selectedTab.label : "empty"}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2 }}

                        >
                            {selectedTab ? selectedTab.content : "😋"}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>





        </div>
    );
};

export default AboutUs;
