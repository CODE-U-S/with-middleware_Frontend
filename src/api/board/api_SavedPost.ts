import axios from 'axios';
import {Like as LikeType} from '../types';

export const getSavedPost = async (): Promise<LikeType[]> => {
    try {
        const response = await axios.get<LikeType[]>(`http://localhost:8080/like/user/1`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.message);
        } else {
            console.error("Unexpected error:", error);
        }
        return [];
    }
};

export type { LikeType };
