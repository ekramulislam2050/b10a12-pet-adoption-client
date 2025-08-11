import useAuth from "@/Hooks/Auth/useAuth";
import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import Spinner from "@/ReUseAbleFunction/Spinner/Spinner";
import { useQuery } from "@tanstack/react-query";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const MyDonationCampaigns = () => {
  const { user } = useAuth()
  const email = user?.email?.toLowerCase()

  const axiosSecure = useAxiosSecure()
  const { data: dpData = [], isError, isLoading, error } = useQuery({
    queryKey: ["dpData", email],
    queryFn: async () => {
      const res = await axiosSecure.get('/donationPayment', { params: { email } })
      return res.data

    },
    enabled: !!email,
    staleTime: 0
  })
  if (!email) {
    return
  }
  console.log(dpData)
  if (isLoading) {
    return <Spinner isLoading={isLoading}></Spinner>
  }
  if (isError) {
    return errorMsg(error.message)
  }
  return (
    <div className="p-5">
      <div className="overflow-x-auto border border-[#07c19f] rounded-lg">
        <table className="table ">
          {/* head */}
          <thead className="">
            <tr className="text-[#fcb700] border border-[#07c19f]  ">
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Pet Name</th>
              <th>Max Donation</th>
              <th>Progress</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            {
              dpData.map(data => <tr className="border border-[#07c19f] text-[#ffffff]" key={data._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-12 h-12 mask mask-squircle">
                        <img
                          src={data.campaignInfo.petPicture}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{data.campaignInfo.petName}</div>

                    </div>
                  </div>
                </td>
                <td>

                  <p className="badge badge-ghost badge-sm">{data.campaignInfo.maximumDonationAmount
                  }<span className="text-sm font-extrabold text-orange-400">৳</span></p>
                </td>
                {/* progress bar---------- */}
                <td  >
                  <div style={{ width: 45, height: 45 }}>
                    <CircularProgressbar
                      value={Number(data?.donatedPercentage || 0).toFixed(0)}
                      text={`${Number(data?.donatedPercentage || 0).toFixed(0)}%`}
                      styles={{
                        text: { fontSize: '30px', fill: "#ffffff" },
                        path: { stroke: '#f97316' },
                        trail: { stroke: '#ffffff' },
                      }}
                    />
                  </div>
                </td>
                <th >
                  <div className="flex items-center justify-between">
                    <div className="bg-[#ffffff] px-3 rounded-full">
                      <button className="text-black btn btn-ghost btn-xs">Edit</button>
                    </div>
                    <div className="bg-[#ffffff] px-3 rounded-full">
                      <button className="text-black btn btn-ghost btn-xs">Pause</button>
                    </div>
                    <div className="bg-orange-500 rounded-full">
                      <button className="btn btn-ghost btn-xs ">Donators</button>
                    </div>
                  </div>
                </th>
              </tr>)
            }



          </tbody>
          {/* foot */}
          <tfoot className="">
            <tr className="text-[#ffffff]  border border-[#07c19f] ">
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default MyDonationCampaigns;