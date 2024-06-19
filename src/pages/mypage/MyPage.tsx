import React, {useEffect, useState} from "react";
import userProfilePic from '../../assets/user/프사.jpeg';
import styled from "styled-components";

const PageLabel = styled.label`
    cursor: pointer;
`;

const MyPage: React.FC = () => {
    const [userName, setUserName] = useState("rlawlgus");
    const [userEmail, setUserEmail] = useState("rlawlgus@e-mirim.hs.kr");
    const [page, setPage] = useState(0);
    const HandlePage = (m: number) => {
        setPage(m);
    }

    // userName, userEmail 불러오기
    useEffect(() => {
        const fetchUserInfo = async () => {

        }
    }, []);

    // myPosts 불러오기
    useEffect(() => {

    }, []);

    return (
        <div>
            <div>
                <h2>마이페이지</h2>
                <div>
                    <img src={userProfilePic} alt="user profile"/>
                </div>
                <div>
                    {userName}
                </div>
                <div>
                    {userEmail}
                </div>
            </div>
            <hr/>
            <div>
                <PageLabel>
                    내 게시물
                    <input type="radio" name="post" id="my-post" onClick={() => {
                        HandlePage(0);
                    }}/>
                </PageLabel>
                <PageLabel>
                    찜한 게시물
                    <input type="radio" name="post" id="like-post" onClick={() => {
                        HandlePage(1);
                    }}/>
                </PageLabel>
            </div>
            <div>
                {page === 1 ? (
                    <h2>찜한 게시물</h2>
                ) : (
                    <h2>내 게시물</h2>
                )}
            </div>
        </div>
    )
};

export default MyPage;