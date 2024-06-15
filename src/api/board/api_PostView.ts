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

export const addLike = async (userId: number, postId: number): Promise<any> => {
    try {
        const response = await axios.post(`http://localhost:8080/like`, {
            user: { id: userId },
            post: { id: postId }
        });
        return response.data;
    } catch (error) {
        console.error(`Error adding like for post ${postId} by user ${userId}:`, error);
        throw error;
    }
};

export const cancelLike = async (likeId: number): Promise<void> => {
    try {
        await axios.delete(`http://localhost:8080/like/${likeId}`);
    } catch (error) {
        console.error(`Error cancelling like with ID ${likeId}:`, error);
        throw error;
    }
};

export const getLikeCount = async (postId: number): Promise<number> => {
    try {
        const response = await axios.get<number>(`http://localhost:8080/like/post/count/${postId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching like count for post ${postId}:`, error);
        throw error;
    }
};
