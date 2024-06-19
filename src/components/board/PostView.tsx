import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getPost, addComment, getCommentsByPostId, getCommentCountByPostId, updateComment, deleteComment, addLike, cancelLike, getLikePosts,/* getUserImage*/ } from '../../api/board/api_PostView';
import { Post as PostType, Comment, Like as LikeType } from '../../api/types.ts';
import MDEditor from '@uiw/react-md-editor';
import { FaArrowLeft, FaHeart, FaShare } from 'react-icons/fa';
import { ViewButton } from './ViewButton.ts';
import Modal from '../modal/Modal';
import { userProfilePic } from '../../api/sidebar/api_getUser';

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
    padding: 5vh 40vh;
    padding-bottom: 10vh;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex: 1;
`;

const Title = styled.h1`
    font-size: 5vh;
    margin-bottom: 3vh;
`;

const UserName = styled.div`
    font-size: 2.5vh;
    color: #196CE9; 
    font-weight: bold; 
    margin-bottom: 1vh;
`;

const InfoContainer = styled.div`
    display: flex;
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

const BackButton = styled(ViewButton)`
    position: fixed;
    top: 25vh;
    left: 30vh;
`;

const StatusButton = styled(ViewButton)`
    position: fixed;
    top: 35vh;
    right: 10vh;
    background: ${props => props.theme.Color.primaryColor};
    color: white;
    font-size: 1.4vh;
    width: 9vh;
    height: 4vh;
    display: flex;
    justify-content: center; /* Center content horizontally */
    align-items: center; /* Center content vertically */
`;

const HeartButton = styled(ViewButton)<{ isLiked: boolean }>`
    position: fixed;
    top: 40vh;
    right: 10vh;
    background: #fff;
    color: ${({ isLiked }) => (isLiked ? '#DB4455' : '#ccc')};
    width: 8.8vh;
    height: 3.8vh;
    display: flex;
    justify-content: center; /* Center content horizontally */
    align-items: center; /* Center content vertically */
    

    span {
        color: ${({ isLiked }) => (isLiked ? '#000000' : '#A0B2C1')};
    }
`;

const ShareButton = styled(ViewButton)`
    position: fixed;
    top: 45vh;
    right: 10vh;
    width: 8.8vh;
    height: 3.8vh;
    display: flex;
    justify-content: center; 
    align-items: center;
    font-size: 1.4vh;
`;

const AlertBubble = styled.div<{ show: boolean }>`
    position: fixed;
    top: 41vh;
    right: 9.3vh;
    background-color: rgba(199, 199, 199, 0.9);
    border-radius: 6px;
    padding: 1vh 1vh;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-size: 1.2vh;
    font-weight: bold;
    z-index: 999;
    display: ${({ show }) => (show ? 'block' : 'none')};
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
    min-height: 50vh;
    background-color: #f9f9f9;
    padding: 2vh 40vh;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    flex-grow: 1
`;

const CommentCount = styled.div`
    font-size: 2vh;
    font-weight: bold;
    margin-bottom: 2vh;
    color: #333;
    span {
        color: #196CE9;
    }
`;

const CommentInputWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 1vh;
`;

const CommentInput = styled.textarea`
    width: calc(100% - 6vh);
    padding: 2vh;
    border: 1px solid #ddd;
    border-radius: 30px;
    font-size: 2vh;
    resize: none;
`;

const ProfilePicture = styled.img`
    width: 6vh;
    height: 6vh;
    border-radius: 50%;
    margin-right: 1vh;
`;

const CommentButton = styled.button`
    padding: 1vh 2vh;
    background-color: #196CE9;
    color: white;
    border: none;
    border-radius: 1vh;
    cursor: pointer;
    font-size: 2vh;
    margin-bottom: 3vh;
    transition: background-color 0.3s ease;
    margin-left: auto;
    &:hover {
        background-color: #145bbd; /* 호버 시 배경색 변경 */
    }
`;

const CommentItem = styled.div`
    background-color: white;
    padding: 3vh;
    margin-bottom: 4vh;
    border: 1px solid #ddd;
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
`;

const CommentHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 2vh;
`;

const CommentUserName = styled.div`
    font-size: 2vh;
    font-weight: bold;
    color: #333;
`;

const CommentTime = styled.div`
    font-size: 1.5vh;
    color: #888;
    margin-right: auto;
    padding: 1vh;
`;

const CommentContent = styled.div`
    font-size: 2.5vh;
    margin-bottom: 2vh;
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
    margin-left: 2vh; /* 마진 크기 증가 */

    &:hover {
        text-decoration: underline;
    }
`;

const PostView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<PostType | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentCount, setCommentCount] = useState(0);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [editedComment, setEditedComment] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState<number | null>(null);
    const [initialLoad, setInitialLoad] = useState(true);
    const [likeCount, setLikeCount] = useState<number>(0);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const data = await getPost(Number(id));
                setPost(data);
                const commentsData = await getCommentsByPostId(Number(id));
                setComments(commentsData);
                const commentCountData = await getCommentCountByPostId(Number(id));
                setCommentCount(commentCountData);
            } catch (error) {
                setError('포스트를 불러오는 데 실패했습니다.');
            }
        };
    
        fetchPostData();
    }, [id]);
    
    useEffect(() => {
        const fetchLikeData = async () => {
            if (!post) return;
    
            try {
                const likes = await getLikePosts(Number(id));
                const userId = post.user.id;
                const userHasLiked = likes.some((like: LikeType) => like.user.id === userId);
                setLiked(userHasLiked);
                setLikeCount(likes.length);
                setInitialLoad(false); // 최초 데이터 로드 후 상태 변경
            } catch (error) {
                console.error('like 불러오기 실패');
                setInitialLoad(false); // 에러 발생 시에도 상태 변경
            }
        };
    
        if (initialLoad) {
            fetchLikeData();
        }
    }, [post, id, initialLoad]);
    

    if (error) {
        return <div>{error}</div>;
    }

    if (!post) {
        return <div>로딩 중...</div>;
    }

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

    const getPostDate = (createDate: string | null | undefined): string | string => {
        return createDate ? createDate.substring(0, 10) : "시간 정보 없음";
    }

    const handleLikeClick = () => {
        if(!liked){
            addLike(post.user.id, post.id);
            setLiked(true);
            setLikeCount(likeCount + 1);
        }else{
            cancelLike(post.user.id, post.id);
            setLiked(false);
            setLikeCount(likeCount - 1);
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 1500);
    };


    const getTimeDifference = (dateString: string): string => {
        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now.getTime() - date.getTime();
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);

        if (diffMin < 1) {
            return `방금 전`;
        } else if (diffMin < 60) {
            return `${diffMin}분 전`;
        } else if (diffHour < 24) {
            return `${diffHour}시간 전`;
        } else {
            return `${diffDay}일 전`;
        }
    }

    const handleAddComment = async () => {
        try {
            const newCommentData = await addComment({
                userId: 1, // 예시로 사용자 ID를 1로 지정
                postId: Number(id),
                comment: newComment,
            });

            // Assume you want to use newCommentData for something
            console.log('New Comment Data:', newCommentData);

            // 댓글 추가 후 새로운 댓글 목록을 가져오기
            const updatedComments = await getCommentsByPostId(Number(id));
            setComments(updatedComments);

            // 댓글 개수도 업데이트
            setCommentCount(commentCount + 1);

            // 입력 창 초기화
            setNewComment('');
        } catch (error) {
            console.error('댓글 추가 오류:', error);
        }
    };



    // 댓글 수정 누르면 수정 기능
    const handleEditComment = (commentId: number, currentContent: string) => {
        setEditingCommentId(commentId);
        setEditedComment(currentContent);
    };


    const handleUpdateComment = async (commentId: number) => {
        try {
            // 댓글 수정 API 호출
            await updateComment(commentId, editedComment);

            // 수정된 댓글을 comments 상태에 반영
            const updatedComments = comments.map(comment =>
                comment.id === commentId ? { ...comment, comment: editedComment } : comment
            );
            setComments(updatedComments);

            setEditingCommentId(null); // 수정 모드 종료
        } catch (error) {
            console.error('댓글 업데이트 오류:', error);
        }
    };

    const handleDeleteComment = async () => {
        if (commentToDelete) {
            try {
                await deleteComment(commentToDelete);
                const updatedComments = comments.filter(comment => comment.id !== commentToDelete);
                setComments(updatedComments);
                setCommentCount(commentCount - 1);
                setShowModal(false); // Close modal after deletion
            } catch (error) {
                console.error('댓글 삭제 오류:', error);
            }
        }
    };

    return (
        <Container>
            <BackButton onClick={() => navigate(-1)}>
                <FaArrowLeft style={{marginRight: '0.5vh'}}/>
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
                <Divider/>
                <EditorWrapper>
                    <MDEditor.Markdown source={post.content} style={{fontSize: '40px', lineHeight: '1.6'}}/>
                </EditorWrapper>
            </PostContainer>
            {post.status && (
                <StatusButton>
                    {getStatusButtonText(post.status)}
                </StatusButton>
            )}
            <HeartButton onClick={handleLikeClick} isLiked={liked}>
                <FaHeart style={{ marginRight: '0.5vh' }} />
                <span>{likeCount}</span>
            </HeartButton>
            <ShareButton onClick={handleShare}>
                <FaShare style={{ marginRight: '0.5vh' }} />
                공유
            </ShareButton>
            <AlertBubble show={showAlert}>링크 복사 완료!</AlertBubble>
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDeleteComment}
                isConfirm={false}
                message="이 댓글을 삭제하시겠습니까?" // 모달에 표시할 메시지
            />
            <CommentSection>
                <CommentCount>댓글 <span>{commentCount}</span></CommentCount>
                <CommentInputWrapper>
                    <ProfilePicture src={userProfilePic(post.user.id)} alt="프로필 사진"/>
                    <CommentInput
                        placeholder="댓글을 작성해보세요."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                </CommentInputWrapper>
                <CommentButton onClick={handleAddComment}>등록</CommentButton>
                {comments.map((comment) => (
                    <CommentItem key={comment.id}>
                        <CommentHeader>
                            <ProfilePicture src={userProfilePic(post.user.id)} alt="프로필 사진"/>
                            <CommentUserName>{comment.user.name}</CommentUserName>
                            <CommentTime>{getTimeDifference(comment.createdDate || '')}</CommentTime>
                        </CommentHeader>
                        {editingCommentId === comment.id ? (
                            <>
                                <CommentInput
                                    value={editedComment}
                                    onChange={(e) => setEditedComment(e.target.value)}
                                />
                                <CommentActions>
                                    <CommentActions>
                                        <CommentAction onClick={() => setEditingCommentId(null)}>취소</CommentAction>
                                        <CommentAction
                                            onClick={() => handleUpdateComment(comment.id)}>저장</CommentAction>
                                    </CommentActions>

                                </CommentActions>
                            </>
                        ) : (
                            <>
                                <CommentContent>{comment.comment}</CommentContent>
                                <CommentActions>
                                    <CommentAction
                                        onClick={() => handleEditComment(comment.id, comment.comment)}>수정</CommentAction>
                                    <CommentAction onClick={() => {
                                        setCommentToDelete(comment.id);
                                        setShowModal(true);
                                    }}>삭제</CommentAction>
                                </CommentActions>
                            </>
                        )}
                    </CommentItem>
                ))}

            </CommentSection>
        </Container>
    );
};

export default PostView;