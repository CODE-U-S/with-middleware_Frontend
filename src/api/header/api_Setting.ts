import axios from 'axios';
import { User } from '../types.ts';

const BASE_URL = 'http://localhost:8080';  // API의 기본 URL

// 유저 정보 가져오기 API
export const getUserInfo = async (userId: number): Promise<User> => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${userId}`);
        return response.data as User;
    } catch (error) {
        console.error('유저 정보를 가져오는 데 실패했습니다.', error);
        throw error;  // 예외 처리를 위해 에러를 다시 던집니다.
    }
};
