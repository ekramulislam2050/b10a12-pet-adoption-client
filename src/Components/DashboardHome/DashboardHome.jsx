import useAdmin from '@/Hooks/Admin/useAdmin';
import Spinner from '@/ReUseAbleFunction/Spinner/Spinner';
import AllUser from '../AllUser/AllUser';
import AddPet from '../AddPet/AddPet';
import BannedUser from '../BannedUser/BannedUser';
import DataNotFound from '../DataNotFound/DataNotFound';
 

const DashboardHome = () => {
    const{loginUsers,isLoading}=useAdmin()
    if(isLoading){
        return <Spinner isLoading={true}></Spinner>
    }
    
    if(loginUsers?.role==="admin"){
        return <AllUser></AllUser>
    }else if(loginUsers?.role==="banned"){
        return <BannedUser></BannedUser>
    }else if(loginUsers?.role==="user"){
        return <AddPet></AddPet>
    }else{
       return <DataNotFound></DataNotFound>
    }
};

export default DashboardHome;