// api_Board.ts
import axios from 'axios';
import { Post as PostType } from './types'; // types.ts 파일에서 export 한 Post를 가져옵니다.

export const getPostsByCategory = async (category: string): Promise<PostType[]> => {
    try {
        const response = await axios.get<PostType[]>(`http://localhost:8080/post/category/${category}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return [];
    }
};

export const getPostsByCategoryAndField = async(category: string, field: string, status: string, sort: string): Promise<PostType[]> => {
    try {
        const response = await axios.get<PostType[]>(`http://localhost:8080/post/field/${field}/status/${status}/sort/${sort}`);
        return response.data.filter((response) => response.category === category) ;
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return [];
    }
}

export type { PostType };
