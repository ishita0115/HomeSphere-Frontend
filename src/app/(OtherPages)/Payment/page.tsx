'use client'
import authMiddleware from "@/app/authMiddelware";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useRazorpay from "react-razorpay";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const Payment = ()=>{
    const [Razorpay] = useRazorpay();
    const router = useRouter()
    const [amount, setAmount] = useState(100);
    const username = useSelector((state: any) => state.auth.users.first_name);
    const email = useSelector((state: any) => state.auth.users.email);
    const phoneno = useSelector((state: any) => state.auth.users.phoneno);
    const token = useSelector((state: any) => state.auth.token.access);
    const complete_order = (paymentID:any, orderID:any, signature:any)=>{
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/razorpayapp/order/complete/',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
            data: {
                "payment_id": paymentID,
                "order_id": orderID,
                "signature": signature,
                "amount": amount
            }
        })
        .then((response)=>{
            toast.success(response.data.message);
            router.push('/');
        })
        .catch((error)=>{
            toast.error(error.response.data);
        })
    }

    const razorPay = ()=>{
        //create order
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/razorpayapp/order/create/',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
            data: {
                amount: amount,
                currency: "INR"
            }
        })
        .then((response)=>{
            
            // get order id
            var order_id = response.data.data.id
            
            // handle payment
            const options:any = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID, 
                name: "Home Sphere",
                description: "Your Subscription Here",
                image: "/images/logo.jpg",
                order_id: order_id, 
                handler: function (response:any) {

                    //complete order
                    complete_order(
                        response.razorpay_payment_id,
                        response.razorpay_order_id,
                        response.razorpay_signature
                    )
                },
                prefill: {
                name: username,
                email: email,
                contact: phoneno,
                },
                notes: {
                address: "Razorpay Corporate Office",
                },
                theme: {
                color: "#3399cc",
                },
            };

            const rzp1 = new Razorpay(options);
            rzp1.on("payment.failed", function (response:any) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });
            rzp1.open();
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return(
        <> <div><h1 className="text-2xl font-semibold mb-4 text-center mt-4">You Need Subscription</h1></div>
        <div className="flex justify-center items-center mt-10">
           
            <div className="bg-yellow-400 border p-5 rounded-lg text-center shadow-lg transform transition duration-500 hover:scale-105" style={{ width: "28%" }}>
                 <h1 className="text-4xl font-bold mb-2">₹100</h1>
                    <p className="text-lg mb-4">per month</p>
                    <div>
                        <h1 className="text-2xl font-semibold mb-4">Subscription</h1>
                         <div className="text-left">
                    <ul style={{fontSize:"14px"}}>
                        <li>1.Home Sphere You need subscription for use videocall facility</li>
                        <li>2.first payment done</li>
                        <li>3. after payment seller profile to click contact button.</li>
                        <li>4. subscription people have facility to anytime videocall and shoe seller home</li>
                        <li>5. you have any quary in payment contact ishitachovatiya15@gmail.com</li>
                    </ul>
                </div>
                <div className="d-grid mt-6">
                    <button type="button" className="btn btn-light fw-semibold py-3 bg-white p-3 rounded" onClick={razorPay}>Upgrad now</button>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default authMiddleware(Payment);