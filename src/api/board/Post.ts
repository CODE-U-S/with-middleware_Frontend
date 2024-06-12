// api/api.ts

import axios from 'axios';

interface PostData {
    title: string;
    content: string;
    user: { id: number };
    category: string | null;
    field: string | null;
}

export const createPost = async (postData: PostData) => {
    try {
        const response = await axios.post('http://localhost:8080/post', postData);
        return response.data;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};
