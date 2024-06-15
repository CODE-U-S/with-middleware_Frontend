import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getPostsByCategory, PostType } from '../../api/board/api_Board'; // 파일 확장자(.ts) 제거
import MDEditor from '@uiw/react-md-editor';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

const PostListContainer = styled.div`
    width: 70vw;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(25%, 1fr));
`;

const PostItem = styled(Link)`
    width: 80%;
    height: 35vh;
    margin-bottom: 50px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-decoration: none;
    background-color: #fefefe;
    box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;

    &:visited {
        color: black; /* 방문한 링크의 색상을 기본 텍스트 색상과 동일하게 설정 */
    }
`;

const PostPin = styled.div`
    width:100%;
    text-align: center;
`;

const Profile = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    width: 100%;
`;

const ProfileImage = styled.img`
    border-radius: 50%;
    width: auto;
    height: 100%;
`;

const ProfileDescription = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 0.5vw;
`;

const ProfileNameAndTime = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 2vh;
`;

const ProfileIconList = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
`;

const PostTime = styled.p`
    font-size: calc(0.4vw + 0.7vh);
    color: gray;
`;

const PinIcon = styled.img`
    width: 1.5vh;
    height: 2vh;
`;

const ProfileName = styled.div`
    font-size: calc(0.4vw + 0.7vh);
    font-weight: bold;
`;

const PostDescription = styled.div`
    display: flex;
    flex-direction: column;
    height: 17%;
`;

const PostTitle = styled.h2`
    font-size: 20px;
    margin: 0;
    margin-bottom: 1.5vh;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const PostContent = styled(MDEditor.Markdown)`
    height: 16vh;
    font-size: 13px;
    overflow-y: clip; //스크롤 형식으로 바꾸고 싶다면 clip을 scroll로 바꾸세요
    background: rgba(255, 0, 0, 0);
`;

const CustomButton = styled.button`
    display: flex;
    align-items: center;
    background-color: #fff;
    color: black;
    font-size: calc(0.5vw + 0.5vh);
    border: none;
    border-radius: 5vh;
    cursor: pointer;
    margin-top: 0.3vh;
    padding-left: 0.5vw;
    padding-right: 0.5vw;
    transition: background-color 0.3s ease;
    box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;
`;

// 아이콘 컴포넌트들 (이미지 경로는 적절하게 수정 필요)
const DesignIcon = () => <PinIcon src="/src/assets/board/design_icon.svg" alt="디자인 아이콘" />;
const DevelopIcon = () => <PinIcon src="/src/assets/board/develop_icon.svg" alt="개발자 아이콘" />;
const StudyIcon = () => <PinIcon src="/src/assets/board/study_icon.svg" alt="스터디 아이콘" />;
const TeamIcon = () => <PinIcon src="/src/assets/board/team_icon.svg" alt="팀프로젝트 아이콘" />;

const PostFooter = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 0.5vh;
    height: 2vh;
    border: 1px solid red;
`;

const Divider = styled.hr`
    width: 100%;
    border: 0.5px solid #ddd;
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

    const formatDate = (date: string | Date): string => {
        const modifiedDate = new Date(date);
        const now = new Date(); // 현재 시간
        const differenceInMilliseconds = now.getTime() - modifiedDate.getTime();
        const seconds = Math.floor(differenceInMilliseconds / 1000);
    
        if (seconds < 60) {
            return '방금 전';
        } else if (seconds < 3600) {
            const minutes = Math.floor(seconds / 60);
            return `${minutes}분 전`;
        } else if (seconds < 86400) {
            const hours = Math.floor(seconds / 3600);
            return `${hours}시간 전`;
        } else {
            return formatDistanceToNow(modifiedDate, { locale: ko, addSuffix: true });
        }
    };

    return (
        <PostListContainer>
            {posts.map((post) => (
                <PostItem key={post.id} to={`/post/${post.id}`}>
                    <PostPin>
                        {post.category && getCategoryIcon(post.category)}
                    </PostPin>
                    <PostDescription>
                        <Profile>
                            <ProfileImage src="https://via.placeholder.com/80" alt="Profile" />
                            <ProfileDescription>
                                <ProfileNameAndTime>
                                    <ProfileName>{post.user.name}</ProfileName>
                                    <PostTime>&nbsp;·&nbsp;{post.modifiedDate && formatDate(post.modifiedDate)}</PostTime>
                                </ProfileNameAndTime>
                                <ProfileIconList>
                                    {post.field && (
                                        <CustomButton>
                                            {post.field}
                                        </CustomButton>
                                    )}
                                </ProfileIconList>
                            </ProfileDescription>
                        </Profile>
                    </PostDescription>
                    <Divider/>
                    <PostTitle>{post.title}</PostTitle>
                    <PostContent source={post.content} />
                    <PostFooter>

                    </PostFooter>
                </PostItem>
            ))}
        </PostListContainer>
    );
};

export default PostComponent;
