import React, { useEffect, useState } from "react";
// import { Like } from "../../api/types";  // Like 타입 확인 필요
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { FaComment, FaHeart } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { getCommentCountByPostId, getLikeCount, getLikePosts, getMyPost } from "../../api/board/api_PostView.ts";
import { ko } from "date-fns/locale";
import { getUser, userProfilePic } from "../../api/sidebar/api_getUser.ts";
import { PostType } from "api/board/api_Board.ts";

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

const MyPageContainer = styled.div`
    width: 90%;
    height: 100%;
`;

const UserProfileContainer = styled.div`
    display: flex;
    margin: 7vh 0 5vh 0;
    font-size: 15pt;
`;

const UserInfoContainer = styled.div`
    margin: 1vw;
`;

const UserNameContainer = styled.div`
    font-weight: bold;
    margin: 2vmin;
`;

const UserEmailContainer = styled.div`
    margin: 2vmin;
    color: gray;
`;

const LabelContainer = styled.div`
    display: flex;
`;

const PageLabel = styled.label`
    cursor: pointer;
    margin: 0.5vmin;
    font-size: 12pt;
`;

const PostOptionP = styled.p`
    padding: 1vmin 1vmin 1vmin 1vmin;
    width: 18vmin;
    text-align: center;
    &.check {
        font-weight: bold;
        background-color: rgb(0, 0, 0, 0.1);
        border-radius: 10px;
    }
`;

const PageInput = styled.input`
    opacity: 0;
`;

const MyPage: React.FC = () => {
    // hook 관련
    const [likePost, setLikePost] = useState<PostType[]>([]);
    const [myPost, setMyPost] = useState<PostType[]>([]);
    const { id: userId } = useParams();
    const [userName, setUserName] = useState<string>();
    const [userEmail, setUserEmail] = useState<string>();
    const [page, setPage] = useState(0);

    const DesignIcon = () => <PinIcon src="/src/assets/board/design_icon.svg" alt="디자인 아이콘" />;
    const DevelopIcon = () => <PinIcon src="/src/assets/board/develop_icon.svg" alt="개발자 아이콘" />;
    const StudyIcon = () => <PinIcon src="/src/assets/board/study_icon.svg" alt="스터디 아이콘" />;
    const TeamIcon = () => <PinIcon src="/src/assets/board/team_icon.svg" alt="팀프로젝트 아이콘" />;

    const HandlePage = (m: number) => {
        setPage(m);
    }

    // userName, userEmail 불러오기
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (userId) {
                    const data = await getUser(Number(userId));     // userId를 number로 변환
                    setUserName(data.name ?? "Unknown User");       // 기본값 설정
                    setUserEmail(data.email ?? "Unknown Email");
                }
            } catch (error) {
                console.error('유저를 불러오는 데 실패했습니다.');
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    // page 변경 시 게시물 불러오기
    useEffect(() => {
        const fetchSavedData = async () => {
            if (page === 1) {
                const data = await getLikePosts(Number(userId));
                console.log(data);
                setLikePost(data);
            } else {
                const data = await getMyPost(Number(userId));
                console.log(data);
                setMyPost(data);
            }
        };

        if (userId) {
            fetchSavedData();
        }
    }, [page, userId]);

    const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});
    const [commentCounts, setCommentCounts] = useState<Record<number, number>>({});

    useEffect(() => {
        const fetchLikeCounts = async (posts: PostType[]) => {
            const counts: Record<number, number> = {};
            for (const post of posts) {
                try {
                    counts[post.id] = await getLikeCount(post.id);
                } catch (error) {
                    console.error(`Error fetching like count for post ${post.id}:`, error);
                    counts[post.id] = 0;
                }
            }
            setLikeCounts(counts);
        };

        if (page === 1 && likePost.length > 0) {
            fetchLikeCounts(likePost);
        } else if (page === 0 && myPost.length > 0) {
            fetchLikeCounts(myPost);
        }
    }, [likePost, myPost, page]);

    useEffect(() => {
        const fetchCommentCounts = async (posts: PostType[]) => {
            const counts: Record<number, number> = {};
            for (const post of posts) {
                try {
                    counts[post.id] = await getCommentCountByPostId(post.id);
                } catch (error) {
                    console.error(`Error fetching comment count for post ${post.id}:`, error);
                    counts[post.id] = 0;
                }
            }
            setCommentCounts(counts);
        };

        if (page === 1 && likePost.length > 0) {
            fetchCommentCounts(likePost);
        } else if (page === 0 && myPost.length > 0) {
            fetchCommentCounts(myPost);
        }
    }, [likePost, myPost, page]);

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

    // 게시물 렌더링 함수
    const renderPosts = (posts: PostType[]) => (
        posts.map((post) => (
            <PostItem key={post.id} to={`/postview/${post.id}`}>
                <PostPin>
                    {post.category && getCategoryIcon(post.category)}
                </PostPin>
                <Profile>
                    <ProfileImage src={userProfilePic(post.user.id)} alt="Profile" />
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
                <Divider />
                <PostTitle>{post.title}</PostTitle>
                <PostContent source={post.content} />
                <PostFooter>
                    <FaHeart style={{ marginRight: '0.2vw', marginLeft: '0.3vw', color: '#ddd', blockSize: '100%' }} />
                    <PostFooterNumber>{likeCounts[post.id] !== undefined ? likeCounts[post.id] : '?'}</PostFooterNumber>
                    <FaComment style={{ marginRight: '0.2vw', marginLeft: '0.3vw', color: '#ddd', blockSize: '100%' }} />
                    <PostFooterNumber>{commentCounts[post.id] !== undefined ? commentCounts[post.id] : '?'}</PostFooterNumber>
                </PostFooter>
            </PostItem>
        ))
    );

    return (
        <MyPageContainer>
            <UserProfileContainer>
                <ProfileImage src={userProfilePic(Number(userId))} />
                <UserInfoContainer>
                    <UserNameContainer>{userName}</UserNameContainer>
                    <UserEmailContainer>{userEmail}</UserEmailContainer>
                </UserInfoContainer>
            </UserProfileContainer>
            <LabelContainer>
                <PageLabel htmlFor="0">
                    <PostOptionP className={page === 0 ? "check" : ""}>내 게시물</PostOptionP>
                </PageLabel>
                <PageInput
                    type="radio"
                    id="0"
                    name="page"
                    value="0"
                    checked={page === 0}
                    onChange={() => HandlePage(0)}
                />
                <PageLabel htmlFor="1">
                    <PostOptionP className={page === 1 ? "check" : ""}>좋아요 누른 게시물</PostOptionP>
                </PageLabel>
                <PageInput
                    type="radio"
                    id="1"
                    name="page"
                    value="1"
                    checked={page === 1}
                    onChange={() => HandlePage(1)}
                />
            </LabelContainer>
            <PostListContainer>
                <PostList>
                    {page === 0 ? renderPosts(myPost) : renderPosts(likePost)}
                </PostList>
            </PostListContainer>
        </MyPageContainer>
    );
};

export default MyPage;
