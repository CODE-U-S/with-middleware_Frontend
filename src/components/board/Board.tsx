// Board.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getPostsByCategory, PostType } from '../../api/board/api_Board'; // 파일 확장자(.ts) 제거
import MDEditor from '@uiw/react-md-editor';

const PostListContainer = styled.div`
    width: 70vw;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25%, 1fr));
    padding-right: 10%;
    padding-left: 10%;
`;

const PostItem = styled.div`
    width: 80%;
    height: 25vh;
    overflow-y: clip; //스크롤 형식으로 바꾸고 싶다면 clip을 scroll로 바꾸세요
    margin-bottom: 50px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const PostTitle = styled.h2`
    font-size: 20px;
    margin: 0;
    margin-bottom: 20px;
`;

const PostContent = styled(MDEditor.Markdown)`
    font-size: 16px;
    background: rgba(255, 0, 0, 0);
`;

const PostComponent: React.FC<{ category: string }> = ({ category }) => {
    const [posts, setPosts] = useState<PostType[]>([]);

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
                    <PostContent source={post.content}/>
                </PostItem>
            ))}
        </PostListContainer>
    );
};

export default PostComponent;
