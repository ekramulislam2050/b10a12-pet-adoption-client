import axios from "axios";

 
 const instance=axios.create({
    baseURL:"https://b10a12-pet-adoption-server.vercel.app/",
    headers:{
        "Content-Type":"application/json"
    }
 })
const useAxiosPublic = () => {
    return instance
};

export default useAxiosPublic;