import axios from 'axios';
import {Like as Post} from '../types';


export const getSavedPost = async (): Promise<Post[]> => {
    try {
        const response = await axios.get<Post[]>(`http://localhost:8080/like`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return [];
    }
};

export type { Post };
