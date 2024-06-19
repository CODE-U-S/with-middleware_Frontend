import React, {useEffect, useState} from "react";
import userProfilePic from '../../assets/user/프사.jpeg';
import styled from "styled-components";
import {getUser} from "../../api/sidebar/api_getUser.ts";
import {useParams} from "react-router-dom";

const MyPageContainer = styled.div`
    width: 90%;
    height: 100%;
`;

const ProfileImage = styled.img`
    border-radius: 50%;
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.2);
    width: 17vmin;
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
    const {id: userId} = useParams();

    const [userName, setUserName] = useState<string>();
    const [userEmail, setUserEmail] = useState<string>();
    const [page, setPage] = useState(0);

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
    },[userId]);

    // myPosts 불러오기
    useEffect(() => {

    }, [userId]);

    return (
        <MyPageContainer>
            <UserProfileContainer>
                <div>
                    <ProfileImage src={userProfilePic} alt="user profile"/>
                </div>
                <UserInfoContainer>
                    <UserNameContainer>
                        {userName}
                    </UserNameContainer>
                    <UserEmailContainer>
                        {userEmail}
                    </UserEmailContainer>
                </UserInfoContainer>
            </UserProfileContainer>
            <hr/>
            <LabelContainer>
                <PageLabel>
                    <PostOptionP className={page === 0 ? 'check' : ''}> 내 게시물 </PostOptionP>
                    <PageInput type="radio" name="post" id="my-post" onClick={() => {
                        HandlePage(0);
                    }}/>
                </PageLabel>
                <PageLabel>
                    <PostOptionP className={page === 1 ? 'check' : ''}> 찜한 게시물 </PostOptionP>
                    <PageInput type="radio" name="post" id="like-post" onClick={() => {
                        HandlePage(1);
                    }}/>
                </PageLabel>
            </LabelContainer>
            <div>
                {page === 1 ? (
                    <div>
                        <h2>찜한 게시물</h2>
                    </div>
                ) : (
                    <div>
                        <h2>내 게시물</h2>
                    </div>
                )}
            </div>
        </MyPageContainer>
    )
};

export default MyPage;