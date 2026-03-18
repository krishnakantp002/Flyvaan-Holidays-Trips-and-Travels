import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import BASE_URL from "../utils/config";
import { toast } from "react-toastify";
import { FaCreditCard } from "react-icons/fa";

const Payment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/payment/hash`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ bookingId: id })
            });
            const resData = await response.json();

            if (response.ok && resData.success) {
                const data = resData.data;

                // Dynamically create a form and submit
                const form = document.createElement("form");
                form.action = "https://test.payu.in/_payment"; // Use test environment URL
                form.method = "POST";

                const fields = {
                    key: data.key,
                    txnid: data.txnid,
                    amount: data.amount,
                    productinfo: data.productinfo,
                    firstname: data.firstname,
                    email: data.email,
                    phone: data.phone,
                    surl: data.surl,
                    furl: data.furl,
                    hash: data.hash,
                };

                for (const [name, value] of Object.entries(fields)) {
                    if (value !== undefined && value !== null) {
                        const input = document.createElement("input");
                        input.type = "hidden";
                        input.name = name;
                        input.value = value;
                        form.appendChild(input);
                    }
                }

                document.body.appendChild(form);
                toast.info("Redirecting to PayU...");
                form.submit();
            } else {
                toast.error(resData.message || "Failed to initiate payment");
                setLoading(false);
            }
        } catch (err) {
            toast.error("Server not responding");
            setLoading(false);
        }
    };

    return (
        <section>
            <div className="container flex justify-center items-center py-10 min-h-[500px]">
                <div className="max-w-[500px] w-full bg-white shadow-xl rounded-lg p-8 border border-gray-100">
                    <div className="flex flex-col items-center mb-6">
                        <FaCreditCard className="text-5xl text-BaseColor mb-4" />
                        <h2 className="text-3xl font-bold text-HeadingColor text-center">
                            Complete Payment
                        </h2>
                        <p className="text-TextColor mt-2 text-center">
                            Please finalize your payment to confirm the booking securely via PayU.
                        </p>
                    </div>

                    <div className="mb-8">
                        <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-700">
                            <p className="font-semibold mb-1">Booking Ref:</p>
                            <p className="font-mono text-xs break-all">{id}</p>
                        </div>
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="btn w-full flex justify-center items-center py-3 text-lg"
                    >
                        {loading ? "Processing..." : "Pay with PayU"}
                    </button>

                    <button
                        onClick={() => navigate("/my-account")}
                        className="w-full mt-4 text-gray-500 hover:text-black underline text-sm transition-colors"
                    >
                        Cancel and Return
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Payment;
