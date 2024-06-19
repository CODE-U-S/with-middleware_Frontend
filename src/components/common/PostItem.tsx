import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHeart, FaComment } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { getLikeCount, getCommentCountByPostId } from '../../api/board/api_PostView';
import MDEditor from '@uiw/react-md-editor';
import { Post } from '../../api/types';

const PostItemContainer = styled(Link)`
    width: 80%;
    height: 35vh;
    margin-bottom: 4vh;
    padding-left: 1.5vh;
    padding-right: 1.5vh;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-decoration: none;
    background-color: #fefefe;
    box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;

    &:visited {
        color: black;
    }
`;

const PostPin = styled.div`
    width:100%;
    height: 2vh;
    margin-top: 0.5vh;
    text-align: center;
`;

const Profile = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 6vh;
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
    width: 1.8vh;
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
    font-size: 1.7vh;
    margin: 0 0 1.5vh;
    width: 100%;
    height: 2vh;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const PostContent = styled(MDEditor.Markdown)`
    height: 18vh;
    font-size: 13px;
    overflow-y: clip;
    background: rgba(255, 0, 0, 0);
`;

const CustomButton = styled.button`
    display: flex;
    align-items: center;
    background-color: #fff;
    color: black;
    font-size: 1vh;
    border: none;
    border-radius: 5vh;
    cursor: pointer;
    margin-top: 0.5vh;
    padding-left: 0.5vw;
    padding-right: 0.5vw;
    transition: background-color 0.3s ease;
    box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;
`;

const Divider = styled.hr`
    width: 100%;
    border: 0.5px solid #ddd;
`;

const PostFooter = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin-top: 0.5vh;
    height: 2vh;
`;

const PostFooterNumber = styled.p`
    font-size: 1vh;
    color: #ccc;
    margin-right: 0.7vw;
`;

interface PostItemProps {
    post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
    const DesignIcon = () => <PinIcon src="/src/assets/board/design_icon.svg" alt="디자인 아이콘" />;
    const DevelopIcon = () => <PinIcon src="/src/assets/board/develop_icon.svg" alt="개발자 아이콘" />;
    const StudyIcon = () => <PinIcon src="/src/assets/board/study_icon.svg" alt="스터디 아이콘" />;
    const TeamIcon = () => <PinIcon src="/src/assets/board/team_icon.svg" alt="팀프로젝트 아이콘" />;

    const [likeCount, setLikeCount] = useState<number | null>(null);
    const [commentCount, setCommentCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchLikeCount = async () => {
            try {
                const count = await getLikeCount(post.id);
                setLikeCount(count);
            } catch (error) {
                console.error(`Error fetching like count for post ${post.id}:`, error);
                setLikeCount(0);
            }
        };

        fetchLikeCount();
    }, [post.id]);

    useEffect(() => {
        const fetchCommentCount = async () => {
            try {
                const count = await getCommentCountByPostId(post.id);
                setCommentCount(count);
            } catch (error) {
                console.error(`Error fetching comment count for post ${post.id}:`, error);
                setCommentCount(0);
            }
        };

        fetchCommentCount();
    }, [post.id]);

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
                return null;
        }
    };

    const formatDate = (date: string | Date): string => {
        const modifiedDate = new Date(date);
        const now = new Date();
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
        <PostItemContainer to={`/post/${post.id}`}>
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
            <Divider />
            <PostTitle>{post.title}</PostTitle>
            <PostContent source={post.content} />
            <PostFooter>
                <FaHeart style={{ marginRight: '0.2vw', color: '#ddd', blockSize: '1.3vh' }} />
                <PostFooterNumber>{likeCount !== null ? likeCount : '?'}</PostFooterNumber>
                <FaComment style={{ marginRight: '0.2vw', color: '#ddd', blockSize: '1.3vh' }} />
                <PostFooterNumber>{commentCount !== null ? commentCount : '?'}</PostFooterNumber>
            </PostFooter>
        </PostItemContainer>
    );
};

export default PostItem;
