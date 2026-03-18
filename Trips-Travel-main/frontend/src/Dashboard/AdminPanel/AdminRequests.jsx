import React, { useState, useEffect, useContext } from "react";
import BASE_URL from "../../utils/config";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const AdminRequests = () => {
    const { token, user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);

    const { apiData: adminHistory, loading, error } = useFetch(
        `${BASE_URL}/user/admin/pending`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    useEffect(() => {
        if (adminHistory) {
            setRequests(adminHistory.filter(admin => admin._id !== user._id)); // Hide self from audit log
        }
    }, [adminHistory, user._id]);

    const approveAdmin = async (id) => {
        try {
            const res = await fetch(`${BASE_URL}/user/admin/approve/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const result = await res.json();
            if (res.ok) {
                toast.success(result.message);
                // Map over state to visually update it without refreshing
                setRequests(prev => prev.map(admin => admin._id === id ? { ...admin, isApproved: true } : admin));
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            toast.error("Failed to approve admin request");
        }
    };

    return (
        <section className="pt-5 pb-10">
            <div className="container mx-auto px-5">
                <h2 className="text-2xl font-bold mb-5">Admin Authorization Log</h2>

                {loading && <h4 className="text-center pt-5">Loading logs...</h4>}
                {error && <h4 className="text-center pt-5 text-red-500">{error}</h4>}

                {!loading && !error && requests.length === 0 && (
                    <h4 className="text-center pt-5 text-gray-500">No admin history found.</h4>
                )}

                {!loading && !error && requests.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto text-sm border-collapse border border-gray-200 shadow-md">
                            <thead className="bg-gray-100 text-left">
                                <tr>
                                    <th className="p-4 border-b">Username</th>
                                    <th className="p-4 border-b">Email</th>
                                    <th className="p-4 border-b">Status</th>
                                    <th className="p-4 border-b text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((admin) => (
                                    <tr key={admin._id} className="hover:bg-gray-50">
                                        <td className="p-4 border-b font-semibold">{admin.username}</td>
                                        <td className="p-4 border-b text-gray-600">{admin.email}</td>
                                        <td className="p-4 border-b">
                                            {admin.isApproved ? (
                                                <span className="text-green-600 font-bold bg-green-100 px-2 py-1 rounded">Approved</span>
                                            ) : (
                                                <span className="text-yellow-600 font-bold bg-yellow-100 px-2 py-1 rounded">Pending</span>
                                            )}
                                        </td>
                                        <td className="p-4 border-b text-center">
                                            {!admin.isApproved ? (
                                                <button
                                                    onClick={() => approveAdmin(admin._id)}
                                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-colors"
                                                >
                                                    Approve
                                                </button>
                                            ) : (
                                                <span className="text-gray-400 italic">No Action</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AdminRequests;
