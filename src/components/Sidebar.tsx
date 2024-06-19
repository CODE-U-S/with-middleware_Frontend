import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider, DefaultTheme } from 'styled-components'; // DefaultTheme import 추가
import { Link, useLocation } from 'react-router-dom';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaPen, FaUsers, FaCode, FaPalette, FaBookOpen, FaHeart } from 'react-icons/fa';
import { GoChevronRight } from "react-icons/go";
import { Theme } from '../styles/theme';
import { User } from '../api/types';
import { getUser, userProfilePic } from '../api/sidebar/api_getUser';

const SidebarContainer = styled.div<{ theme: DefaultTheme }>`
    min-height: 100vh;
    background-color: ${props => props.theme.Color.sideColor};
    flex-direction: column;
    padding: 20px;
    &.collapse {
        width: 80px;
    }
    &.default {
        width: 250px;
    }
`;

const Profile = styled.div`
    display: flex;
    flex-direction: row;
    height: 10vh;
    align-items: center;
    margin-top: 20px;
`;

const ProfileImage = styled.img`
    border-radius: 50%;
    &.collapse {
        width: 100%;
    }
    &.default {
        width: 70px;
        left: 27px;
    }
`;

const ProfileName = styled.div`
    font-size: 15px;
    font-weight: bold;
`;

const ProfileText = styled.div`
    margin-left: 15px;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const LinkMyPageIcon = styled(Link)`
    color: ${props => props.theme.Color.gray};
    cursor: pointer;
`

const ProfileLink = styled.div`
    display: flex;
    flex-direction: row;
`;

const ProfileEmail = styled.div`
    margin-top: 5px;
    font-size: 10px;
    color: gray;
`;

const ButtonContainer = styled.div`
    width: 100%;
    margin-top: 70px;
`;

const Button = styled(Link) <{ isSelected: boolean }>`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: ${props => props.isSelected ? '#EDF1F8' : props => props.theme.Color.sideColor};
    color: ${props => props.isSelected ? '#196CE9' : '#A0B2C1'};
    font-weight: ${props => props.isSelected ? 'bold' : 'none'};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        // background-color: #EDF1F8;
        box-shadow: 0 0 10px #EEE;
        color: #196CE9;
        font-weight: bold;
    }
    `;

const AngleArrow = styled.div`
    cursor: pointer;
    text-align: center;
    
    &.default {
        margin-left: 190px;
    }
`;

const Sidebar: React.FC = () => {
    const [user, setUser] = useState<User>();
    const [isCollapse, setIsCollapse] = useState(false);
    const [selectedButton, setSelectedButton] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUser(1);
                setUser(data);
            } catch (error) {
                console.error('유저를 불러오는 데 실패했습니다.');
            }
        };

        fetchUserData();
    });

    useEffect(() => {
        setSelectedButton(location.pathname);
    }, [location]);

    const HandleCollapse = () => {
        setIsCollapse(isCollapse => !isCollapse);
    }


    return (
        <ThemeProvider theme={Theme}>
            <SidebarContainer className={isCollapse ? 'collapse' : 'default'}>
                <AngleArrow className={isCollapse ? 'collapse' : 'default'} onClick={HandleCollapse}>
                    {isCollapse ? (
                        <div>
                            <FaAngleDoubleRight />
                        </div>
                    ) : (
                        <div>
                            <FaAngleDoubleLeft />
                        </div>
                    )}
                </AngleArrow>
                <Profile>
                    {user && (
                        <ProfileImage src={userProfilePic(user.id)} alt="Profile" className={isCollapse ? 'collapse' : 'default'} />
                    )}
                    {!isCollapse && user && (
                        <ProfileText>
                            <ProfileLink>
                                <ProfileName>{user.name}</ProfileName>
                                <LinkMyPageIcon to="/mypage"><GoChevronRight /></LinkMyPageIcon>
                            </ProfileLink>
                            <ProfileEmail>{user.email}</ProfileEmail>
                        </ProfileText>
                    )}
                </Profile>
                <ButtonContainer>
                    <Button to="/post" isSelected={selectedButton === '/post'}>
                        <FaPen />
                        {isCollapse ? '' : '글쓰기'}
                    </Button>
                    <Button to="/" isSelected={selectedButton === '/'}>
                        <FaUsers />
                        {isCollapse ? '' : '팀프로젝트'}
                    </Button>
                    <Button to="/developers" isSelected={selectedButton === '/developers'}>
                        <FaCode />
                        {isCollapse ? '' : '개발자'}
                    </Button>
                    <Button to="/designs" isSelected={selectedButton === '/designs'}>
                        <FaPalette />
                        {isCollapse ? '' : '디자이너'}
                    </Button>
                    <Button to="/study" isSelected={selectedButton === '/study'}>
                        <FaBookOpen />
                        {isCollapse ? '' : '스터디'}
                    </Button>
                    <Button to="/like" isSelected={selectedButton === '/like'}>
                        <FaHeart />
                        {isCollapse ? '' : '찜한 게시물'}
                    </Button>
                    <Button to="/recent" isSelected={selectedButton === '/recent'}>
                        <FaCode />
                        {isCollapse ? '' : '최근 본 게시물'}
                    </Button>
                </ButtonContainer>
            </SidebarContainer>
        </ThemeProvider>
    );
}

export default Sidebar;