 import { CircleLoader } from "react-spinners";

const Spinner = ({isLoading}) => {
      if(isLoading){
         return(
            <div className="flex items-center justify-center h-screen">
            <CircleLoader color="#36d7b7" size={100}/>
        </div>
         )
      }
      return null
};

export default Spinner;