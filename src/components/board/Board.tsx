import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getPostsByCategory, Post } from '../../api/board/PostList'; // 여기서 Post 타입을 가져옵니다.

const PostListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PostItem = styled.div`
    width: 80%;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
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
