import axios from 'axios';
import { User } from '../types';

export const getUser = async (userId: number): Promise<User> => {
    try {
        const response = await axios.get(`http://localhost:8080/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error get User:", error);
        throw error;
    }
};