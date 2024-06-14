import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getPost } from '../../api/board/api_PostView';
import { Post as PostType } from '../../api/board/types';
import MDEditor from '@uiw/react-md-editor';

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

const BoldDate = styled.span`
    font-weight: bold;
`;

const CustomButton = styled.button`
    display: flex;
    align-items: center;
    background-color: #fff;
    color: black;
    font-size: 2vh;
    padding: 1vh 2vh;
    border: none;
    border-radius: 5vh;
    cursor: pointer;
    transition: background-color 0.3s ease;
    box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;
`;

// 아이콘 컴포넌트들 (이미지 경로는 적절하게 수정 필요)
const DesignIcon = () => <Icon src="/src/assets/board/design_icon.svg" alt="디자인 아이콘" />;
const DevelopIcon = () => <Icon src="/src/assets/board/develop_icon.svg" alt="개발자 아이콘" />;
const StudyIcon = () => <Icon src="/src/assets/board/study_icon.svg" alt="스터디 아이콘" />;
const TeamIcon = () => <Icon src="/src/assets/board/team_icon.svg" alt="팀프로젝트 아이콘" />;

const Icon = styled.img`
    width: 1.5vh;
    height: 2vh;
    margin-right: 1vh;
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

    // 함수를 통해 카테고리에 따른 아이콘 선택
    const getCategoryIcon = (category: string | undefined): JSX.Element | null => {
        switch (category) {
            case '팀프로젝트':
                return <TeamIcon />;
            case '개발자':
                return <DevelopIcon />;
            case '디자이너':
                return <DesignIcon />;
            case '스터디':
                return <StudyIcon />;
            default:
                return null; // 기본적으로 아이콘 없음
        }
    };

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
                        {post.category && (
                            <CustomButton>
                                {getCategoryIcon(post.category)}
                                {post.category}
                            </CustomButton>
                        )}
                    </InfoItem>
                    <InfoItem>
                        {post.field && (
                            <CustomButton>
                                {post.field}
                            </CustomButton>
                        )}
                    </InfoItem>
                </InfoContainer>
                <Divider />
                <MDEditor.Markdown source={post.content} /> {/* Correctly render markdown content */}
            </PostContainer>
        </PageContainer>
    );
};

export default PostView;
