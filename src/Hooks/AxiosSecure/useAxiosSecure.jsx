
import { useEffect } from "react";
import useAuth from "../Auth/useAuth";
import { useNavigate } from "react-router-dom";


const instance = axios.create({
    baseURL: "http://localhost:5000/",
    headers: { "content-type": "application/json" }
})
const useAxiosSecure = () => {
    const { logOut } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        // request interceptor------------
        const requestInterceptors=instance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("accessToken")
                if (token) {
                    config.headers=config.headers || {}
                    config.headers.Authorization = `Bearer ${token}`
                }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )

        // response interceptor--------------
        const responseInterceptors=instance.interceptors.response.use(
            (response) => {
                return response
            },
            (error) => {
                const status = error.response?.status
                if (status === 401 || status === 403) {
                    logOut()
                    navigate("/login")
                }
                return Promise.reject(error)
            }
        )

        return ()=>{
            instance.interceptors.request.eject(requestInterceptors)
            instance.interceptors.response.eject(responseInterceptors)
        }
    }, [logOut,navigate])

    return instance
};

export default useAxiosSecure;