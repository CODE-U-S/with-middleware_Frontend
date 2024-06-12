import axios from 'axios';

export interface Post {
    id: number;
    title: string;
    content: string;
}

export const getPostsByCategory = async (category: string): Promise<Post[]> => {
    try {
        const response = await axios.get<Post[]>(`http://localhost:8080/post/category/${category}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return [];
    }
};
