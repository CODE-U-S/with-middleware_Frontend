import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getPostsByCategory, PostType, getPostsByCategoryAndField } from '../../api/board/api_Board';
import MDEditor from '@uiw/react-md-editor';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { FaHeart, FaComment } from 'react-icons/fa';
import { options } from './options';
import { getLikeCount, getCommentCountByPostId } from '../../api/board/api_PostView';

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

const PostFilterBar = styled.div`
    width: 100%;
    height: 6vh;
    display: flex;
    aligin-items: center;
    margin-bottom: 2vh;
    border-radius: 3vh;
    background-color: #fff;
    box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;
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

const FilterSumbmitButton = styled.button`
    align-items: center;
    width: 30%;
    background-color: white;
    color: black;
    font-size: 1.5vh;
    border: none;
    cursor: pointer;
    border-radius: 5vh;
    margin: 1vh;
    box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;

    &:hover {
        background-color: gray;
        color: white;
    }
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

const DropdownContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1vh;
`;

const Dropdown = styled.select`
    width: 100%;
    padding: 0.5vh;
    font-size: 1.5vh;
    border: none;
    border-radius: 1vh;
    background-color: #ddd;
    outline: none;
`;

const CategoryLabel = styled.p`
    margin-left: 1.5vw;
    width: 3vw;
    font-size: 1.7vh;
    font-weight: bold;
`;

const Option = styled.option``;

const PostComponent: React.FC<{ category: string }> = ({ category }) => {
    // 아이콘 컴포넌트들 (이미지 경로는 적절하게 수정 필요)
    const DesignIcon = () => <PinIcon src="/src/assets/board/design_icon.svg" alt="디자인 아이콘" />;
    const DevelopIcon = () => <PinIcon src="/src/assets/board/develop_icon.svg" alt="개발자 아이콘" />;
    const StudyIcon = () => <PinIcon src="/src/assets/board/study_icon.svg" alt="스터디 아이콘" />;
    const TeamIcon = () => <PinIcon src="/src/assets/board/team_icon.svg" alt="팀프로젝트 아이콘" />;

    const [posts, setPosts] = useState<PostType[]>([]);
    const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});
    const [commentCounts, setCommentCounts] = useState<Record<number, number>>({});
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [selectedSort, setSelectedSort] = useState<string>('likes');

    useEffect(() => {
        switch (category) {
            case '팀프로젝트':
                setSelectedCategory('teamProject'); break;
            case '개발자':
                setSelectedCategory('developer'); break;
            case '디자이너':
                setSelectedCategory('designer'); break;
        }
    }, [category]);

    const statusOptions = ["OPEN", "CLOSED"]; // Define status options
    const sortOptions = ["likes", "comments", "date"]; // Define sort options

    useEffect(() => {
        if (selectedCategory !== null && options[selectedCategory]) {
            setCategoryOptions(options[selectedCategory]);
        }
    }, [selectedCategory]);

    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await getPostsByCategory(category);
            setPosts(posts);
        };

        fetchPosts();
    }, [category]);

    useEffect(() => {
        const fetchLikeCounts = async () => {
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

        if (posts.length > 0) {
            fetchLikeCounts();
        }
    }, [posts]);

    useEffect(() => {
        const fetchCommentCounts = async () => {
            const counts: Record<number, number> = {};
            for (const post of posts) {
                try {
                    counts[post.id] = await getCommentCountByPostId(post.id);
                } catch (error) {
                    console.error(`Error fetching comments count for post ${post.id}:`, error);
                    counts[post.id] = 0;
                }
            }
            setCommentCounts(counts);
        };

        if (posts.length > 0) {
            fetchCommentCounts();
        }
    }, [posts]);

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

    const getPostsFilter = async (field: string | null, status: string | null, sort: string | null) => {
        const posts = await getPostsByCategoryAndField(category, field, status, sort);
        setPosts(posts);
    }

    const handleFilterClick = (field: string | null, status: string | null, sort: string | null) => {
        getPostsFilter(field, status, sort);
    };

    return (
        <PostListContainer>
            {category !== '스터디' && (
                <PostFilterBar>
                    {selectedCategory !== null && categoryOptions.length > 0 && (
                        <DropdownContainer>
                            <CategoryLabel>분류</CategoryLabel>
                            <Dropdown value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                <Option value="">분야를 선택하세요</Option>
                                {categoryOptions.map((option: string, index: number) => (
                                    <Option key={index} value={option}>{option}</Option>
                                ))}
                            </Dropdown>
                        </DropdownContainer>
                    )}
                    <DropdownContainer>
                        <CategoryLabel>상태</CategoryLabel>
                        <Dropdown value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                            <Option value="">모집 상태를 선택하세요</Option>
                            {statusOptions.map((option: string, index: number) => (
                                <Option key={index} value={option}>{option}</Option>
                            ))}
                        </Dropdown>
                    </DropdownContainer>
                    <DropdownContainer>
                        {selectedCategory && selectedStatus && (
                            <CategoryLabel>순서</CategoryLabel>
                        )}
                        {selectedCategory && selectedStatus && (
                            <Dropdown value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}>
                                <Option value="" disabled>게시판 순서를 선택하세요</Option>
                                {sortOptions.map((option: string, index: number) => (
                                    <Option key={index} value={option}>{option}</Option>
                                ))}
                            </Dropdown>
                        )}
                    </DropdownContainer>
                    <FilterSumbmitButton onClick={() => handleFilterClick(selectedCategory || null, selectedStatus || null, selectedSort || null)}>찾기</FilterSumbmitButton>
                </PostFilterBar>
            )}
            <PostList>
                {posts.map((post) => (
                    <PostItem key={post.id} to={`/post/${post.id}`}>
                        <PostPin>
                            {post.category && getCategoryIcon(post.category)}
                        </PostPin>
                        <PostDescription>
                            <Profile>
                                <ProfileImage src={`http://localhost:8080/${post.user.id})}.png`} alt="Profile" />
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


export default PostComponent;
