import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getPostsByCategory } from '../../api/board/api_Board';
import { Post } from '../../api/board/types';

const PostListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap; /* 여러 행으로 나뉘도록 설정 */
    justify-content: center; /* 가운데 정렬 */
    gap: 20px; /* 항목 사이의 간격 설정 */
`;

const PostItem = styled.div`
    width: 30%; 
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box; 
`;

const PostTitle = styled.h2`
    font-size: 20px;
    margin-bottom: 5px;
`;

const PostContent = styled.p`
    font-size: 16px;
`;

const PostComponent: React.FC<{ category: string }> = ({ category }) => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await getPostsByCategory(category);
            setPosts(posts);
        };

        fetchPosts();
    }, [category]);

    return (
        <PostListContainer>
            {posts.map((post) => (
                <PostItem key={post.id}>
                    <PostTitle>{post.title}</PostTitle>
                    <PostContent>{post.content}</PostContent>
                </PostItem>
            ))}
        </PostListContainer>
    );
};

export default PostComponent;
