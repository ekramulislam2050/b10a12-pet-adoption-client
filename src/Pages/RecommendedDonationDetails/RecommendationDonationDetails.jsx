import { useParams } from "react-router-dom";

 

const RecommendationDonationDetails = () => {
    const {id}=useParams()

    return (
        <div>
            <h1> RecommendationDonationDetails</h1>
        </div>
    );
};

export default RecommendationDonationDetails;