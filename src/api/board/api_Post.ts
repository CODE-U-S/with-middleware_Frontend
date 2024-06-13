import axios from 'axios';
import { Post } from './types';

interface PostData extends Omit<Post, 'id'> {}

export const createPost = async (postData: PostData): Promise<Post> => {
    try {
        const response = await axios.post('http://localhost:8080/post', postData);
        return response.data;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};
