import useAuth from "@/Hooks/Auth/useAuth";
import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import Spinner from "@/ReUseAbleFunction/Spinner/Spinner";
import { useQuery } from "@tanstack/react-query";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import EditModal from "../EditModal/EditModal";
import DonarModal from "../DonarModal/DonarModal";
import PauseBtn from "../PauseBtn/PauseBtn";


const MyDonationCampaigns = () => {
  const { user } = useAuth()
  const email = user?.email?.toLowerCase()

  const axiosSecure = useAxiosSecure()
  const { data: dpData = [], isError, isLoading, error } = useQuery({
    queryKey: ["dpData", email],
    queryFn: async () => {
      const res = await axiosSecure.get('/cdcDataByEmail', { params: { email } })
      return res.data

    },
    enabled: !!email,
    staleTime: 0
  })
  if (!email) {
    return
  }
  console.log('cdc=', dpData)
  if (isLoading) {
    return <Spinner isLoading={isLoading}></Spinner>
  }
  if (isError) {
    return errorMsg(error.message)
  }
  return (
    <div>
      {
        dpData.length === 0 ?
          (
            <div>
              {/* heading-------------- */}
              <div>
                <h1 className=" text-4xl sm:text-5xl flex justify-center text-orange-500 font-[kapakana] font-semibold tracking-wide py-5 px-2">
                  🚫 No Donation Campaigns Found
                </h1>
              </div>
              {/* heading message----------- */}
              <div className="max-w-4xl px-2 mx-auto text-center">
                <p className="text-center sm:text-lg text-[#ffffff]">Here you   You are not the owner of any donation campaigns.
                </p>

              </div>
              <div className="flex justify-center mb-3">
                <span className="text-4xl text-orange-500">*****</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[200px]">😩</span>
              </div>
            </div>
          )

          :

          (<div className="px-5">
            {/* heading-------------- */}
            <div>
              <h1 className=" text-4xl sm:text-5xl flex justify-center text-orange-500 font-[kapakana] font-semibold tracking-wide py-5 px-2">
                ✨My Donation Campaigns
              </h1>
            </div>
            {/* heading message----------- */}
            <div className="max-w-4xl px-2 mx-auto text-center">
              <p className="text-center sm:text-lg text-[#ffffff]">Here you can see a list of all the donation campaigns you have created.
                You can edit the information, pause it, or view the list of donors if you want.
              </p>

            </div>
            <div className="flex justify-center mb-3">
              <span className="text-4xl text-orange-500">*****</span>
            </div>
            <div className="overflow-x-hidden sm:overflow-x-auto border border-[#07c19f] rounded-lg">
              <table className="table ">
                {/* head */}
                <thead className="text-center sm:text-left">
                  <tr className="text-[#fcb700] border border-[#07c19f]  ">

                    <th>Pet Name</th>
                    <th>Max Donation</th>
                    <th>Progress</th>
                    <th className="hidden sm:block">Action</th>
                  </tr>
                </thead>
                <tbody >

                  {
                    dpData.map((data, index) => <>
                      <tr className="text-[#ffffff]  sm:border-b-0  sm:border sm:border-[#07c19f]" key={index}>

                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="w-12 h-12 mask mask-squircle">
                                <img
                                  src={data.petPicture}
                                  alt="Avatar Tailwind CSS Component" />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{data.petName}</div>

                            </div>
                          </div>
                        </td>
                        <td>

                          <p className="badge badge-ghost badge-sm">{data.maximumDonationAmount
                          }<span className="text-sm font-extrabold text-orange-400">৳</span></p>
                        </td>
                        {/* progress bar---------- */}
                        <td  >
                          <div style={{ width: 45, height: 45 }}>
                            <CircularProgressbar
                              value={Number(data?.percentage || 0).toFixed(0)}
                              text={`${Number(data?.percentage || 0).toFixed(0)}%`}
                              styles={{
                                text: { fontSize: '30px', fill: "#ffffff" },
                                path: { stroke: '#f97316' },
                                trail: { stroke: '#ffffff' },
                              }}
                            />
                          </div>
                        </td>
                        {/* btn for desktop------------- */}
                        <th >
                          <div className="hidden sm:block">
                            <div className="flex items-center justify-between ">

                              {/* edit btn----------- */}
                              <div className="bg-[#ffffff] rounded-full">
                                <button className="px-6 text-black btn btn-ghost btn-xs"
                                  onClick={() => { document.getElementById(`editModal-${data._id}`).showModal() }}>Edit</button>

                              </div>

                              {/* pause btn------------- */}
                              <PauseBtn data={data}
                              ></PauseBtn>
                              {/* donar btn--------------- */}
                              <div className="bg-orange-500 rounded-full" onClick={() => { document.getElementById(`donarModal-${data._id}`).showModal() }}>
                                <button className="btn btn-ghost btn-xs ">Donators</button>

                              </div>
                            </div>
                          </div>
                        </th>

                      </tr>

                      {/* modal component------------- */}
                      <EditModal id={`editModal-${data._id}`} data={data}></EditModal>

                      <DonarModal data={data} id={`donarModal-${data._id}`} ></DonarModal>


                      {/* btn for mobil------------ */}
                      <tr className="border-b border-red-500 sm:border-0">
                        <td colSpan={4}  >
                          <div className="block sm:hidden">
                            <div className="flex justify-evenly text-[#ffffff] ">

                              {/* edit btn----------- */}
                              <div className="bg-[#ffffff] px-3 rounded-full  ">
                                <button className="text-black btn btn-ghost btn-xs"
                                  onClick={() => { document.getElementById(`editModal-${data._id}`).showModal() }}>Edit</button>
                              </div>

                              {/* pause btn------------- */}
                              <PauseBtn data={data} ></PauseBtn>

                              {/* donar btn--------------- */}
                              <div className="bg-orange-500 rounded-full" onClick={() => {
                                document.getElementById(`donarModal-${data.
                                  _id}`).showModal()
                              }}>
                                <button className="btn btn-ghost btn-xs ">Donators</button>

                              </div>
                            </div>
                          </div>

                        </td>


                      </tr>



                    </>
                    )
                  }



                </tbody>

              </table>
            </div>
          </div>)
      }
    </div>
  );
};

export default MyDonationCampaigns;