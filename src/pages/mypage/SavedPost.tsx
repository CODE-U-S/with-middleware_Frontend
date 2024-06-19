import React, { useEffect, useState } from "react";
import { Like } from "../../api/types";  // Like 타입 확인 필요
import { getSavedPost } from "../../api/board/api_SavedPost";
import styled from "styled-components";
import {Link} from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import {userProfilePic} from "../../api/sidebar/api_getUser.ts";
import {FaComment, FaHeart} from "react-icons/fa";
import {formatDistanceToNow} from "date-fns";
import {getCommentCountByPostId, getLikeCount} from "../../api/board/api_PostView.ts";
import {ko} from "date-fns/locale";  // PostType 타입 확인 필요

const PostListContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const PostList = styled.div`
    width: 95%;
    display: grid;
    margin-left: 4.5vw;
    grid-template-columns: repeat(auto-fill, minmax(25%, 1fr));
`;

const PostItem = styled(Link)`
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

const PostSearchView: React.FC = () => {
    // hook 관련
    const [likePost, setLikePost] = useState<Like[]>([]);

    // useEffect 사용 - useParams를 사용하여 좋아요 누른 id값을 불러옴
    useEffect(() => {
        const fetchSavedData = async () => {
            const data = await getSavedPost();
            setLikePost(data);
        };
        fetchSavedData();
    }, []);

    // 아이콘 컴포넌트들 (이미지 경로는 적절하게 수정 필요)
    const DesignIcon = () => <PinIcon src="/src/assets/board/design_icon.svg" alt="디자인 아이콘" />;
    const DevelopIcon = () => <PinIcon src="/src/assets/board/develop_icon.svg" alt="개발자 아이콘" />;
    const StudyIcon = () => <PinIcon src="/src/assets/board/study_icon.svg" alt="스터디 아이콘" />;
    const TeamIcon = () => <PinIcon src="/src/assets/board/team_icon.svg" alt="팀프로젝트 아이콘" />;

    const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});
    const [commentCounts, setCommentCounts] = useState<Record<number, number>>({});

    useEffect(() => {
        const fetchLikeCounts = async () => {
            const counts: Record<number, number> = {};
            for (const post of likePost) {
                try {
                    counts[post.id] = await getLikeCount(post.id);
                } catch (error) {
                    console.error(`Error fetching like count for post ${post.id}:`, error);
                    counts[post.id] = 0;
                }
            }
            setLikeCounts(counts);
        };

        if (likePost.length > 0) {
            fetchLikeCounts();
        }
    }, [likePost]);

    useEffect(() => {
        const fetchCommentCounts = async () => {
            const counts: Record<number, number> = {};
            for (const post of likePost) {
                try {
                    counts[post.id] = await getCommentCountByPostId(post.id);
                } catch (error) {
                    console.error(`Error fetching comments count for post ${post.id}:`, error);
                    counts[post.id] = 0;
                }
            }
            setCommentCounts(counts);
        };

        if (likePost.length > 0) {
            fetchCommentCounts();
        }
    }, [likePost]);

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
        <PostListContainer>
            <PostList>
                {likePost.map((post) => (
                    <PostItem key={post.post.id} to={`/post/${post.post.id}`}>
                        <PostPin>
                            {post.post.category && getCategoryIcon(post.post.category)}
                        </PostPin>
                        <PostDescription>
                            <Profile>
                                <ProfileImage src={userProfilePic(post.user.id)} alt="Profile" />
                                <ProfileDescription>
                                    <ProfileNameAndTime>
                                        <ProfileName>{post.user.name}</ProfileName>
                                        <PostTime>&nbsp;·&nbsp;{post.modifiedDate && formatDate(post.modifiedDate)}</PostTime>
                                    </ProfileNameAndTime>
                                    <ProfileIconList>
                                        {post.post.field && (
                                            <CustomButton>
                                                {post.post.field}
                                            </CustomButton>
                                        )}
                                    </ProfileIconList>
                                </ProfileDescription>
                            </Profile>
                        </PostDescription>
                        <Divider />
                        <PostTitle>{post.post.title}</PostTitle>
                        <PostContent source={post.post.content} />
                        <PostFooter>
                            <FaHeart style={{ marginRight: '0.2vw', color: '#ddd', blockSize: '1.3vh' }} />
                            <PostFooterNumber>{likeCounts[post.id] !== undefined ? likeCounts[post.id] : '?'}</PostFooterNumber>
                            <FaComment style={{ marginRight: '0.2vw', color: '#ddd', blockSize: '1.3vh' }} />
                            <PostFooterNumber>{commentCounts[post.id] !== undefined ? commentCounts[post.id] : '?'}</PostFooterNumber>
                        </PostFooter>
                    </PostItem>
                ))}
            </PostList>
        </PostListContainer>
    );
};

export default PostSearchView;
