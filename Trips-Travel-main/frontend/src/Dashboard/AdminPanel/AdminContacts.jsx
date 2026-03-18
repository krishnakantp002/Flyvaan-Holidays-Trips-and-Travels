import React, { useState, useEffect, useContext } from "react";
import BASE_URL from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { MdOutlineMailOutline, MdDeleteOutline } from "react-icons/md";

const AdminContacts = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/contact`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const resData = await response.json();

                if (response.ok) {
                    setMessages(resData.data);
                } else {
                    toast.error(resData.message);
                }
            } catch (err) {
                toast.error("Failed to fetch messages. Server not responding.");
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [token]);

    const deleteMessage = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this message?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`${BASE_URL}/contact/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (response.ok) {
                toast.success(result.message);
                setMessages(messages.filter(msg => msg._id !== id));
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            toast.error("Server not responding");
        }
    };

    return (
        <section>
            <div className="container py-8 max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <MdOutlineMailOutline className="text-4xl text-BaseColor" />
                    <h2 className="text-3xl font-bold text-HeadingColor">
                        User Messages
                    </h2>
                </div>

                {loading ? (
                    <h4 className="text-center pt-5 text-lg">Loading messages...</h4>
                ) : messages.length === 0 ? (
                    <div className="bg-gray-50 border border-t-4 border-t-BaseColor rounded-lg p-8 text-center mt-6">
                        <h4 className="text-xl text-gray-500">No contact messages received yet.</h4>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {messages.map((msg) => (
                            <div
                                key={msg._id}
                                className="bg-white rounded-lg shadow-md border border-gray-100 p-6 flex flex-col justify-between relative group"
                            >
                                <button
                                    onClick={() => deleteMessage(msg._id)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                                    title="Delete Message"
                                >
                                    <MdDeleteOutline className="text-2xl" />
                                </button>

                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-orange-200">
                                            Message
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-800 mb-2 truncate pr-6">
                                        {msg.subject}
                                    </h3>

                                    <div className="mb-4">
                                        <p className="text-sm font-medium text-gray-500 mb-1">From:</p>
                                        <a href={`mailto:${msg.email}`} className="text-sm text-blue-600 hover:underline break-all">
                                            {msg.email}
                                        </a>
                                    </div>

                                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                                        <p className="text-gray-700 text-sm whitespace-pre-wrap flex-grow">
                                            {msg.message}
                                        </p>
                                    </div>
                                    <p className="text-xs text-gray-400 font-mono mt-4 text-right">
                                        {new Date(msg.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default AdminContacts;
