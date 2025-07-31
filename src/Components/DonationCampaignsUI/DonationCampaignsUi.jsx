import { Link } from "react-router-dom";


const DonationCampaignsUi = ({ data }) => {

    return (
        <div >
            <div className="flex flex-col items-center ">
                {/* heading-------------- */}
                <div>
                    <h1 className=" text-4xl sm:text-5xl flex justify-center text-[#A47149] font-[kapakana] font-semibold tracking-wide py-5 px-2">
                        🎯 Ongoing Donation Campaigns
                    </h1>
                </div>
                {/* heading message----------- */}
                <div className="max-w-4xl px-2 mx-auto text-center">
                    <p className="text-center sm:text-lg">Every campaign here represents a life waiting for love and support.  <span className="font-medium text-orange-400 animate-pulse">Your donations</span> directly help provide food, shelter, and medical care to animals in need.
                    </p>

                </div>
                <div className="flex justify-center mb-3">
                    <span className="text-4xl text-orange-500">*****</span>
                </div>
            </div>

            {/*  cdcData--------------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {
                    data.map(cdcData => <div key={cdcData._id} className="mb-5">
                        <div className='flex justify-center h-full '>
                            <div className=" w-[90%] shadow-xl card border border-[#F3D6C2] bg-white hover:border-[#A47148]  group  h-full " >
                                <div className=" card-body">
                                    {/* img------------------ */}

                                    <div className=' w-full h-[250px]   '>
                                        <img src={cdcData.petPicture} alt="petImg" className='object-cover w-full h-full rounded-xl' />
                                    </div>

                                    {/* pet name--------------- */}
                                    <div>
                                        <p className='text-5xl font-semibold text-center text-[#A47149]  font-[kapakana] group-hover:font-sans transition-all duration-500 group-hover:text-4xl'>{cdcData.petName}</p>
                                        <p className="text-lg">💰 Max-donation amount : {cdcData.maximumDonationAmount}</p>
                                        <p className="text-lg">💸Donated amount : { }</p>
                                        <p className="text-lg ">
                                            📅  date of donation : <span className='font-semibold tracking-wide text-orange-600 '>{cdcData.
                                                lastDateOfDonation.split("T")[0]}</span>
                                        </p>
                                        <Link to={``}>
                                            <span className='flex text-xl text-blue-600 cursor-pointer animate-bounce hover:underline'>  👉 Details</span>
                                        </Link>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>)

                }
            </div>
        </div>
    );
};

export default DonationCampaignsUi;