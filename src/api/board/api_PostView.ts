import axios from 'axios';
import { Post } from './types';

export const getPost = async (id: number): Promise<Post> => {
    try {
        const response = await axios.get<Post>(`http://localhost:8080/post/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching post with ID ${id}:`, error);
        throw error;
    }
};
