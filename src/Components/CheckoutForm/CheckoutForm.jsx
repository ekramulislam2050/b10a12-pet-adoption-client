import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import successMsg from "@/ReUseAbleFunction/SuccessMsg/successMsg";
import { CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";



const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card == null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        });

        if (error) {
            errorMsg(error.message)
            console.log('[error]', error)
        } else {
            successMsg("created paymentMethod successfully")
            console.log("[paymentMethod]", paymentMethod)
        }


    }

    const inputStyle = {
        style: {
            base: {

                fontSize: '18px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#9e2146',
            },
        },
    }


    return (
        <div className="w-full mx-auto">
            <form onSubmit={handleSubmit}>
                {/* card number---------- */}
                <label className="text-lg font-semibold text-orange-500">Card Number : </label>
                <div className="p-3 mt-2 border border-orange-300 rounded-xl">
                    <CardNumberElement options={inputStyle} />
                </div>

                <div className="flex justify-between mt-5">
                    {/* Expiry---------- */}
                    <div className="w-[40%]">
                        <label className="text-lg font-semibold text-orange-500">Expiry : </label>
                        <div className="p-3 mt-2 border border-orange-300 rounded-xl">
                            <CardExpiryElement options={inputStyle}></CardExpiryElement>
                        </div>
                    </div>
                    {/* CVC-------------- */}
                    <div className="w-[40%]">
                        <label className="text-lg font-semibold text-orange-500">CVC : </label>
                        <div className="p-3 mt-2 border border-orange-300 rounded-xl">
                            <CardCvcElement options={inputStyle}></CardCvcElement>
                        </div>
                    </div>
                </div>
                <button type="submit" disabled={!stripe} className="w-full bg-orange-500 btn text-[#ffffff] text-lg mt-5 rounded-full  ">
                    Pay
                </button>

            </form>
        </div>
    );
};

export default CheckoutForm;