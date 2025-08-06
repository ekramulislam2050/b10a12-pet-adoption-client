 
 
import useAuth from "@/Hooks/Auth/useAuth";
 
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";


const DonationModal = ({ data }) => {
    const stripePromise = loadStripe(import.meta.env.VITE_stripe_pk)
    const { petPicture,_id } = data || {}
     
    return (

        <dialog id="my_modal_4" className="modal modal-bottom sm:modal-middle">

            <div className="modal-box">
                <div className="flex flex-col items-center mt-1">
                    <img src={petPicture} alt="img1" className="w-[35%] h-[105px] rounded-lg" />
                   
                    <div>
                        <h2 className="text-2xl font-bold text-center text-[#A47149] mb-4 flex items-center justify-center gap-2">
                            🐾 Support with Love
                        </h2>
                        <p className="mb-6 tracking-wide text-center text-gray-600">
                            Your kind donation helps pets find a loving home through AdopetNest.
                        </p>
                    </div>
                </div>
                {/* stripe----------- */}
                <div>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm id={_id}></CheckoutForm>
                    </Elements>
                </div>

            </div>

        </dialog>

    );
};

export default DonationModal;