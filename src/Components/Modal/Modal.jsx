import useAuth from '@/Hooks/Auth/useAuth';
import { Formik, Field, Form } from 'formik';

import img2 from "../../assets/Pet-Care-img/care-2.png"
import useAxiosPublic from '@/Hooks/AxiosPublic/useAxiosPublic';
import successMsg from '@/ReUseAbleFunction/SuccessMsg/successMsg';
import errorMsg from '@/ReUseAbleFunction/ErrorMsg/errorMsg';
import { useRef } from 'react';



const Modal = ({ data }) => {
    const modalRef = useRef()
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    console.log(user)
    const { name, age, category, image, location, postedDate, _id } = data || {}
    // console.log(data)
    return (
        <dialog ref={modalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">

            <div className="modal-box">
                <div className="flex flex-col items-center mt-5">
                    <img src={image} alt="img1" className="w-[20%] rounded-lg" />
                    <h1 className="sm:text-2xl font-semibold   text-[#e48d11] text-3xl">{name}</h1>
                    <img src={img2} alt="img2" className="w-[20%]" />
                </div>
                <Formik
                    enableReinitialize
                    initialValues={{
                        petName: name,
                        petImg: image,
                        petId: _id,
                        userName: user?.displayName || '',
                        userEmail: user?.email || "",
                        userPhone: "",
                        userAddress: ""
                    }}
                    onSubmit={async (values) => {

                        try {
                            console.log(values)
                            const res = await axiosPublic.post("/adoptPets", values)
                            if (res.data.insertedId) {
                                successMsg("post successful")
                                //  modal close---------
                                modalRef.current.close()
                                document.activeElement?.blur()
                            }


                        } catch (err) {
                            if (err) {
                                errorMsg(err.message)
                            }
                        }

                    }}
                >
                    <Form>
                        <label htmlFor="userName">Name </label>
                        <Field id="userName" name="userName" className="w-full input input-bordered" readOnly disabled />

                        <label htmlFor="userEmail">Email</label>
                        <Field id="userEmail" name="userEmail" className="w-full input input-bordered" readOnly disabled />

                        <label htmlFor="userPhone">Phone : </label>
                        <Field id="userPhone" name="userPhone" required className="w-full input input-bordered" placeholder="input your phone number" />

                        <label htmlFor="userAddress">Address : </label>
                        <Field id="userAddress" name="userAddress" required className="w-full mb-2 input input-bordered" placeholder="input your address" />

                        <button type="submit" className=" btn btn-primary bg-[#e48d11] w-full text-xl tracking-wide my-3">Submit</button>

                    </Form>
                </Formik>




            </div>
        </dialog>
    );
};

export default Modal;