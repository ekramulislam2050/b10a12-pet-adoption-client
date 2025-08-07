import useAuth from "@/Hooks/Auth/useAuth";
import useAxiosSecure from "@/Hooks/AxiosSecure/useAxiosSecure";
import errorMsg from "@/ReUseAbleFunction/ErrorMsg/errorMsg";
import successMsg from "@/ReUseAbleFunction/SuccessMsg/successMsg";
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";


const CheckoutForm = ({ id }) => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (event) => {
        event.preventDefault()
        // donation amount field---------
        const donationAmount = Number(event.target.donationAmount.value)


        // clientSecret--------------
        const res = await axiosSecure.post("/create_payment_intent", { donationAmount })
        const clientSecret = res.data.clientSecret

        if (!stripe || !elements) {
            return
        }
        // stripes elements-------------
        const cardNumber = elements.getElement(CardNumberElement)
        const expiry = elements.getElement(CardExpiryElement)
        const cvc = elements.getElement(CardCvcElement)
        if (!cardNumber || !expiry || !cvc ) {
            errorMsg("card information is incomplete")
            return
        }
        // stripe payment method-----------
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardNumber
        });

        if (error) {
            errorMsg(error.message)
            console.log('[error]', error)
            return
        } else {
            successMsg("created paymentMethod successfully")
            document.getElementById("my_modal_4").close()
            console.log("[paymentMethod]", paymentMethod)
        }
        // stripe confirmation------------
        let paymentStatus = ""
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardNumber,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous"
                }
            }
        })
        if (confirmError) {
            errorMsg(confirmError.message)
            paymentStatus = "failed"
        } else {
            if (paymentIntent.status === "succeeded") {
                successMsg("confirm payment")
                paymentStatus = "success"
                // form field reset------------
                event.target.reset()
                // stripe field reset----------
                cardNumber?.clear()
                expiry?.clear()
                cvc?.clear()
            // for show recommendation donation section--------
              document.getElementById("rd").style.display="block"
            }
        }

        // payment details-----------
        const paymentDetails = {
            email: user?.email,
            donationAmount: donationAmount,
            petId: id,
            donatedDated: new Date().toISOString(),
            status: paymentStatus
        }

        // post payment to db--------
        const response = await axiosSecure.post("/donationPayment", paymentDetails)
        console.log(response)
        if (response?.data?.insertedId) {
            successMsg("payment details post success")
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
                {/* for donation */}
                <div>
                    <label className="text-lg font-semibold text-orange-500">Donation amount :</label>
                    <div >
                        <input type="number" placeholder="Enter your donation amount" name="donationAmount" className="w-full p-3 border border-orange-300 rounded-xl " />
                    </div>
                </div>
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