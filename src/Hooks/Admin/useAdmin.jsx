import { useQuery } from "@tanstack/react-query";
import useAuth from "../Auth/useAuth";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";


const useAdmin = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data:allLoginUser=[], isLoading, isError, error } = useQuery({
        queryKey: ['loginUsers',user?.email],
        enabled:!!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get("/loginUsers")
            return res.data 
        }
    })
    const loginUsers = allLoginUser.find((loggedUser) => loggedUser?.email === user?.email )
      console.log(loginUsers)
     return {loginUsers:loginUsers||{},isLoading,isError,error}
};

export default useAdmin;