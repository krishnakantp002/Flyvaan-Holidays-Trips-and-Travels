import React, { useState, useEffect, useContext } from 'react';
import BASE_URL from '../../utils/config';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const AdminGallery = () => {
    const { token } = useContext(AuthContext);
    const [uploading, setUploading] = useState(false);
    const [galleryItems, setGalleryItems] = useState([]);

    const fetchGallery = async () => {
        try {
            const res = await fetch(`${BASE_URL}/gallery`);
            const result = await res.json();
            if (result.success) {
                setGalleryItems(result.data);
            }
        } catch (err) {
            toast.error('Failed to fetch gallery');
        }
    }

    useEffect(() => {
        fetchGallery();
    }, []);

    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploading(true);
            const formDataToUpload = new FormData();
            formDataToUpload.append("image", file);

            try {
                const uploadRes = await fetch(`${BASE_URL}/upload`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    body: formDataToUpload,
                });

                const uploadResult = await uploadRes.json();

                if (uploadRes.ok) {
                    const galleryRes = await fetch(`${BASE_URL}/gallery`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({ imageUrl: uploadResult.data.url })
                    });
                    const galleryResult = await galleryRes.json();
                    if (galleryRes.ok) {
                        toast.success("Image added to gallery!");
                        fetchGallery();
                    } else {
                        toast.error(galleryResult.message);
                    }
                } else {
                    toast.error(uploadResult.message || "Failed to upload image to Cloudinary");
                }
            } catch (err) {
                toast.error("Upload process failed.");
            }
            setUploading(false);
        }
    };

    const deleteImage = async (id) => {
        try {
            const res = await fetch(`${BASE_URL}/gallery/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await res.json();
            if (res.ok) {
                toast.success(result.message);
                fetchGallery();
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            toast.error("Failed to delete image.");
        }
    }

    return (
        <div className="container mx-auto p-4 md:p-8 min-h-screen">
            <h2 className="text-3xl font-bold mb-8 text-HeadingColor">Manage Live Gallery</h2>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <label className="block text-lg font-medium text-GrayColor mb-2">Upload New Photo (Drag & Drop here)</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-md focus:outline-none focus:border-GreenColor text-center cursor-pointer"
                    disabled={uploading}
                />
                {uploading && <p className="text-GreenColor font-medium text-sm mt-3 animate-pulse">Uploading securely to Cloudinary...</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {galleryItems.map((item) => (
                    <div key={item._id} className="relative group rounded-lg overflow-hidden shadow-sm border border-gray-200">
                        <img src={item.imageUrl} alt="Gallery item" className="w-full h-48 object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                                onClick={() => deleteImage(item._id)}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 font-semibold shadow-md transform hover:scale-105 transition-transform"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
                {galleryItems.length === 0 && <p className="col-span-full text-center text-gray-500">No images have been uploaded to the live gallery yet.</p>}
            </div>
        </div>
    );
};

export default AdminGallery;
