import React, { useState, useEffect } from 'react';
import { getItems, addItem, updateItem, deleteItem } from '../services/itemService';
import { FaTrash, FaEdit, FaPlusCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductAdmin = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '', price: '' });
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const { data } = await getItems();
            setItems(data);
        } catch (error) {
            toast.error("Failed to fetch items.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleAddItem = async () => {
        const { name, description, price } = newItem;

        if (!name || !description || !price) {
            toast.error("Please fill in all fields before submitting.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        try {
            if (editingItem) {
                await updateItem(editingItem._id, newItem);
            } else {
                await addItem(newItem);
            }
            fetchItems();
            setNewItem({ name: '', description: '', price: '' });
            setEditingItem(null);

            toast.success(editingItem ? "Item updated successfully!" : "Item added successfully!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            toast.error("Failed to add or update item.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleEditItem = (item) => {
        setNewItem(item);
        setEditingItem(item);
    };

    const handleDeleteItem = async (id) => {
        try {
            await deleteItem(id);
            fetchItems();
            toast.success("Item deleted successfully!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            toast.error("Failed to delete item.", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Product Admin Panel</h1>

            {/* Responsive Layout */}
            <div className="flex flex-col-reverse md:flex-row gap-8">
                
                {/* Product List (Bottom on Mobile, Left on Desktop) */}
                <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6 border border-gray-200 overflow-y-auto max-h-[80vh]">
                    <h2 className="text-2xl font-semibold mb-4">Products</h2>
                    <ul className="grid grid-cols-1 gap-4">
                        {items.length === 0 ? "Product not available" : items.map(item => (
                            <li key={item._id} className="bg-gray-100 p-4 rounded shadow flex justify-between items-center border border-gray-300">
                                <div>
                                    <h3 className="text-xl font-bold">{item.name}</h3>
                                    <p>{item.description}</p>
                                    <span className="text-green-600 font-semibold">${item.price}</span>
                                </div>
                                <div className="flex space-x-4">
                                    <button
                                        className="text-blue-500 hover:text-blue-700"
                                        onClick={() => handleEditItem(item)}
                                    >
                                        <FaEdit size={20} />
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => handleDeleteItem(item._id)}
                                    >
                                        <FaTrash size={20} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Add / Edit Form (Top on Mobile, Right on Desktop) */}
                <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6 border h-1/2 border-gray-200">
                    <h2 className="text-2xl font-semibold mb-4">{editingItem ? 'Edit Product' : 'Add New Product'}</h2>
                    <div className="mb-4">
                        <input
                            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Product Name"
                            value={newItem.name}
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Description"
                            value={newItem.description}
                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="number"
                            placeholder="Price"
                            value={newItem.price}
                            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                        />
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                        onClick={handleAddItem}
                    >
                        {editingItem ? 'Update Product' : 'Add Product'} <FaPlusCircle className="inline ml-2" />
                    </button>
                </div>
            </div>

            {/* Toast Notification Container */}
            <ToastContainer />
        </div>
    );
};

export default ProductAdmin;
