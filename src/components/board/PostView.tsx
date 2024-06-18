import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getPost, addComment, getCommentsByPostId } from '../../api/board/api_PostView';
import { Post as PostType, Comment } from '../../api/board/types';
import MDEditor from '@uiw/react-md-editor';
import { FaArrowLeft, FaHeart } from 'react-icons/fa'; // FaComment 아이콘 추가
import { ViewButton } from './ViewButton.ts';

const Container = styled.div`
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
    padding: 5vh 25vh;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    font-size: 5vh;
    margin-bottom: 3vh;
`;

const UserName = styled.div`
    font-size: 2.5vh;
    color: #196CE9; /* 변경된 색상 */
    font-weight: bold; /* 볼드체로 변경 */
    margin-bottom: 1vh;
`;

const InfoContainer = styled.div`
    display: flex;
    justify-content: space-between; /* 요소 사이의 간격을 최대화 */
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

const BackButton = styled(ViewButton)`
    position: fixed;
    top: 25vh;
    left: 48vh;
`;

const StatusButton = styled(ViewButton)`
    position: fixed;
    top: 35vh;
    right: 8vh;
    background: #196CE9;
    color: white;
`;

const HeartButton = styled(ViewButton)<{ isLiked: boolean }>`
    position: fixed;
    top: 41.5vh;
    right: 8vh;
    background: #fff; /* Red color when liked */
    color: ${({ isLiked }) => (isLiked ? '#DB4455' : '196CE9')}; /* White color for icon when liked */
`;

const Icon = styled.img`
    width: 1.5vh;
    height: 2vh;
    margin-right: 1vh;
`;

const DesignIcon = () => <Icon src="/src/assets/board/design_icon.svg" alt="디자인 아이콘" />;
const DevelopIcon = () => <Icon src="/src/assets/board/develop_icon.svg" alt="개발자 아이콘" />;
const StudyIcon = () => <Icon src="/src/assets/board/study_icon.svg" alt="스터디 아이콘" />;
const TeamIcon = () => <Icon src="/src/assets/board/team_icon.svg" alt="팀프로젝트 아이콘" />;

const EditorWrapper = styled.div`
    line-height: 3.5vh;
    margin-top: 2vh;
    margin-bottom: 5vh;
`;

const CommentSection = styled.div`
    width: 100%;
    background-color: #f9f9f9;
    padding: 2vh 25vh;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CommentInput = styled.textarea`
    width: 100%;
    padding: 1vh;
    margin-bottom: 2vh;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 2vh;
    resize: none;
`;

const CommentButton = styled.button`
    padding: 1vh 2vh;
    background-color: #196CE9;
    color: white;
    border: none;
    border-radius: 5vh;
    cursor: pointer;
    font-size: 2vh;
    transition: background-color 0.3s ease;
    
    &:hover {
        background-color: #145bbd;
    }
`;

const CommentItem = styled.div`
    background-color: white;
    padding: 2vh;
    margin-bottom: 3vh;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CommentContent = styled.div`
    font-size: 2vh;
    margin-bottom: 1vh;
`;

const CommentActions = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const CommentAction = styled.button`
    background: none;
    border: none;
    color: #196CE9;
    cursor: pointer;
    font-size: 2vh;
    margin-left: 1vh;

    &:hover {
        text-decoration: underline;
    }
`;

const PostView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<PostType | null>(null);
    const [comments, setComments] = useState<Comment[]>([]); // 댓글을 담는 상태
    const [newComment, setNewComment] = useState(''); // 새 댓글 입력을 위한 상태
    const [error, setError] = useState<string | null>(null);
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPost(Number(id));
                setPost(data);
                const commentsData = await getCommentsByPostId(Number(id)); // 해당 포스트의 댓글을 가져옴
                setComments(commentsData);
            } catch (error) {
                setError('포스트를 불러오는 데 실패했습니다.');
            }
        };

        fetchPost();
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!post) {
        return <div>로딩 중...</div>;
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

    const getStatusButtonText = (status: string | null | undefined): string => {
        switch (status) {
            case 'OPEN':
                return '모집중';
            case 'CLOSED':
                return '모집완료';
            default:
                return '';
        }
    };

    // 날짜 포맷팅
    const getPostDate = (createDate: string | null | undefined): string | string => {
        return createDate ? createDate.substring(0, 10) : "시간 정보 없음";
    }

    // 좋아요 버튼 핸들러
    const handleLikeClick = () => {
        setLiked(!liked);
    };

    const handleAddComment = async () => {
        try {
            const newCommentData = await addComment({
                userId: 1, // 실제 사용자 ID로 변경해야 함
                postId: Number(id),
                comment: newComment,
            });
            setComments([...comments, newCommentData]); // 댓글 목록 상태 업데이트
            setNewComment(''); // 댓글 입력 후 입력창 초기화
        } catch (error) {
            console.error('댓글 추가 오류:', error);
            // 오류 처리
        }
    };

    return (
        <Container>
            <BackButton onClick={() => navigate('/')}>
                <FaArrowLeft style={{ marginRight: '0.5vh' }} />
            </BackButton>
            <PostContainer>
                <Title>{post.title}</Title>
                <UserName>{post.user.name || "알 수 없는 사용자"}</UserName>
                <InfoContainer>
                    <InfoItem>
                        작성일 <BoldDate>{getPostDate(post.createdDate)}</BoldDate>
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
                <EditorWrapper>
                    <MDEditor.Markdown source={post.content} style={{ fontSize: '40px', lineHeight: '1.6' }} />
                </EditorWrapper>
            </PostContainer>
            {post.status && (
                <StatusButton>
                    {getStatusButtonText(post.status)}
                </StatusButton>
            )}
            <HeartButton onClick={handleLikeClick} isLiked={liked}>
                <FaHeart style={{ marginRight: '0.5vh' }} />
            </HeartButton>
            <CommentSection>
                <CommentInput
                    placeholder="댓글을 입력하세요..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <CommentButton onClick={handleAddComment}>댓글 달기</CommentButton>
                {comments.map((comment) => (
                    <CommentItem key={comment.id}>
                        <CommentContent>{comment.comment}</CommentContent>
                        <CommentActions>
                            <CommentAction>Delete</CommentAction>
                            <CommentAction>Edit</CommentAction>
                        </CommentActions>
                    </CommentItem>
                ))}
            </CommentSection>
        </Container>
    );
};

export default PostView;
