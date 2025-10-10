import axios from "axios";

 
 const instance=axios.create({
    baseURL:"http://localhost:5000" || "http://localhost:5000" ,
    headers:{
        "Content-Type":"application/json"
    }
 })
const useAxiosPublic = () => {
    return instance
};

export default useAxiosPublic;