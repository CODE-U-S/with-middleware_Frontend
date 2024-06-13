import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getPost } from '../../api/board/api_PostView';
import { Post as PostType } from '../../api/board/types';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3vh;
    width: 100%;
    height: 100%;
`;

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: white;
    padding: 3vh;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 1vh;
`;

const Title = styled.h1`
    font-size: 4vh;
    margin-bottom: 2vh;
`;

const Content = styled.div`
    font-size: 2.5vh;
    line-height: 1.5;
    margin-bottom: 3vh;
`;

const User = styled.div`
    font-size: 2vh;
    color: #555;
    margin-bottom: 1vh;
`;

const Category = styled.div`
    font-size: 2vh;
    color: #555;
    margin-bottom: 1vh;
`;

const Field = styled.div`
    font-size: 2vh;
    color: #555;
    margin-bottom: 1vh;
`;

const PostView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<PostType | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPost(Number(id));
                setPost(data);
            } catch (error) {
                setError("Failed to fetch post.");
            }
        };

        fetchPost();
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <PageContainer>
            <PostContainer>
                <Title>{post.title}</Title>
                <User>User ID: {post.user.id}</User>
                <Category>Category: {post.category}</Category>
                <Field>Field: {post.field}</Field>
                <Content>{post.content}</Content>
            </PostContainer>
        </PageContainer>
    );
};

export default PostView;
