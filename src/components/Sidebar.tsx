import React, {useEffect, useState} from 'react';
import styled, {ThemeProvider, DefaultTheme} from 'styled-components'; // DefaultTheme import 추가
import {Link} from 'react-router-dom';
import {
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaPen,
    FaUsers,
    FaCode,
    FaPalette,
    FaBookOpen,
    FaHeart
} from 'react-icons/fa';
import {GoChevronRight} from "react-icons/go";
import {Theme} from '../styles/theme';
import {User} from '../api/types';
import {getUser, userProfilePic} from '../api/sidebar/api_getUser';

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
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
`;

const ProfileImage = styled.img`
    border-radius: 50%;
    position: absolute;

    &.collapse {
        width: 45px;
    }

    &.default {
        width: 70px;
        left: 27px;
    }
`;

const ProfileName = styled.div`
    margin-left: 60px;
    font-size: 15px;
    font-weight: bold;
    text-align: left;
`;

const LinkMyPageIcon = styled(Link)`
    position: relative;

    color: ${props => props.theme.Color.gray};
    cursor: pointer;
`

const ProfileEmail = styled.div`
    font-size: 10px;
    color: gray;
    margin: 12px 0 0 95px;
`;

const ButtonContainer = styled.div`
    width: 100%;
    margin-top: 70px;
`;

const Button = styled(Link)`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: ${props => props.theme.Color.textColor};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        background-color: #61dafb;
        color: ${props => props.theme.Color.textColor};
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

const UserNameContainer = styled.div`
    display: flex;
    margin-top: 7px;
`;

const Sidebar: React.FC = () => {
    const [user, setUser] = useState<User>();
    const [isCollapse, setIsCollapse] = useState(false);

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
    }, []);

    const HandleCollapse = () => {
        setIsCollapse(isCollapse => !isCollapse);
    }


    return (
        <ThemeProvider theme={Theme}>
            <SidebarContainer className={isCollapse ? 'collapse' : 'default'}>
                <AngleArrow className={isCollapse ? 'collapse' : 'default'} onClick={HandleCollapse}>
                    {isCollapse ? (
                        <div>
                            <FaAngleDoubleRight/>
                        </div>
                    ) : (
                        <div>
                            <FaAngleDoubleLeft/>
                        </div>
                    )}
                </AngleArrow>
                <Profile>
                    {!isCollapse && user && (
                        <>
                            <ProfileImage src={userProfilePic(user.id)} alt="Profile"
                                          className={isCollapse ? 'collapse' : 'default'}/>
                            <UserNameContainer>
                                <ProfileName>{user.name}</ProfileName>
                                <LinkMyPageIcon to="/user/1"><GoChevronRight/></LinkMyPageIcon>
                            </UserNameContainer>
                            <ProfileEmail>{user.email}</ProfileEmail>
                        </>
                    )}
                </Profile>
                <ButtonContainer>
                    <Button to="/post">
                        <FaPen/>
                        {isCollapse ? '' : '글쓰기'}
                    </Button>
                    <Button to="/">
                        <FaUsers/>
                        {isCollapse ? '' : '팀프로젝트'}
                    </Button>
                    <Button to="/developers">
                        <FaCode/>
                        {isCollapse ? '' : '개발자'}
                    </Button>
                    <Button to="/designs">
                        <FaPalette/>
                        {isCollapse ? '' : '디자이너'}
                    </Button>
                    <Button to="/study">
                        <FaBookOpen/>
                        {isCollapse ? '' : '스터디'}
                    </Button>
                    <Button to="/like">
                        <FaHeart/>
                        {isCollapse ? '' : '찜한 게시물'}
                    </Button>
                    <Button to="/recent">
                        <FaCode/>
                        {isCollapse ? '' : '최근 본 게시물'}
                    </Button>
                </ButtonContainer>
            </SidebarContainer>
        </ThemeProvider>
    );
}

export default Sidebar;