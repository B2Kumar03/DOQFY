import axios from 'axios';

const API_URL = 'https://doqf-backend-1.onrender.com/api';

export const getItems = async () => {
    try {
        const response = await axios.get(`${API_URL}/items`);
        return response;
    } catch (error) {
        console.error("Error fetching items:", error);
        throw error;
    }
};

export const addItem = async (item) => {
    try {
        const response = await axios.post(`${API_URL}/items`, item);
        return response;
    } catch (error) {
        console.error("Error adding item:", error);
        throw error;
    }
};

export const updateItem = async (id, item) => {
    try {
        const response = await axios.put(`${API_URL}/items/${id}`, item);
        return response;
    } catch (error) {
        console.error("Error updating item:", error);
        throw error;
    }
};

export const deleteItem = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/items/${id}`);
        return response;
    } catch (error) {
        console.error("Error deleting item:", error);
        throw error;
    }
};
