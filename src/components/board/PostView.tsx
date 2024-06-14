import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getPost } from '../../api/board/api_PostView';
import { Post as PostType } from '../../api/board/types';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: white;
    padding: 5vh;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 1vh;
`;

const Title = styled.h1`
    font-size: 4vh;
    margin-bottom: 1vh;
`;

const UserName = styled.div`
    font-size: 2.5vh;
    color: #196CE9; /* 변경된 색상 */
    font-weight: bold; /* 볼드체로 변경 */
    margin-bottom: 1vh;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1vh;
    font-size: 2vh;
    color: #555;
`;

const InfoItem = styled.div`
    margin-right: 1vh;
`;

const Divider = styled.hr`
    width: 100%;
    border: 0.5px solid #ddd;
    margin: 2vh 0;
`;

const Content = styled.div`
    font-size: 2.5vh;
    line-height: 1.5;
`;

const BoldDate = styled.span`
    font-weight: bold;
`;

const CategoryButton = styled.button`
    background-color: #fff;
    color: black;
    font-size: 2vh;
    padding: 1vh 2vh;
    border: none;
    border-radius: 5vh;
    cursor: pointer;
    transition: background-color 0.3s ease;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const FieldButton = styled(CategoryButton)`
    /* CategoryButton 스타일을 상속. */
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
                <UserName>{post.user.name || "Unknown User"}</UserName>
                <InfoContainer>
                    <InfoItem>
                        작성일 <BoldDate>{post.createdDate}</BoldDate>
                    </InfoItem>
                    <InfoItem>
                        <CategoryButton>{post.category}</CategoryButton>
                    </InfoItem>
                    <InfoItem>
                        <FieldButton>{post.field}</FieldButton>
                    </InfoItem>
                </InfoContainer>
                <Divider />
                <Content>{post.content}</Content>
            </PostContainer>
        </PageContainer>
    );
};

export default PostView;
