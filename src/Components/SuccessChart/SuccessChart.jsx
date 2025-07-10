

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import successImg from "../../assets/SuccessOvervew/tree-17.jpg"
import Marquee from 'react-fast-marquee';
import sinceImg from "../../assets/SuccessOvervew/—Pngtree—gradient white 2024 vector_9061972.png"
const SuccessChart = () => {
    const data = [
        { name: '🐾 Adoptions', uv: 1200 },
        { name: '💸 Donations', uv: 80000 },
        { name: '👥 Users', uv: 2000 },
        { name: '🧑‍⚕️ Volunteers', uv: 300 },
        { name: '🐶 Rescued', uv: 180 },
        { name: '⭐ Ratings', uv: 4.9 },
        { name: '📍 Locations Covered', uv: 25 },
    ];


    return (
        <div className="flex flex-col items-center mt-10">

            <div className="w-[100px] p-4">
                <img src={successImg} alt="img" className="object-cover w-full " />
            </div>
            <h2 className=" text-5xl font-bold text-center font-[kapakana]  text-[#A47149]">Success Overview</h2>
            {/* marquee-------------- */}
            <Marquee>
                <h3 className='text-2xl text-[#f09423] font-semibold py-3'><span className='text-3xl'>📅 </span >Years of Service
                </h3>
                {/* custom --2024---------------- */}

                <div className='w-[100px] h-[100px] p-3'>
                    <img src={sinceImg} alt="sinceImg" className='object-contain w-full h-full' />
                </div>

            </Marquee>
            <div className="w-full h-[300px] px-10 ">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#e81e68" fill="#e81e68" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            {/* customer reviews */}
        </div>
    );
};

export default SuccessChart;