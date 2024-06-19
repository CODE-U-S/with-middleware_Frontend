import axios from 'axios';
import { Post as PostType } from '../types';


export const getSearchPost = async (searchText: string): Promise<PostType[]> => {
    try {
        const response = await axios.get<PostType[]>(`http://localhost:8080/post/search/${searchText}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return [];
    }
};

export const getSearchPostCategory = async (category:string, search: string): Promise<PostType[]> => {
    try {
        const response = await getSearchPost(search);
        return response.filter((post) => post.category === category);
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return [];
    }
};

export type { PostType };
