import React, {useState} from 'react';
import styled, { ThemeProvider, DefaultTheme } from 'styled-components'; // DefaultTheme import 추가
import { Link } from 'react-router-dom';
import {FaAngleDoubleLeft, FaAngleDoubleRight, FaPen, FaUsers, FaCode, FaPalette, FaBookOpen, FaHeart} from 'react-icons/fa';
import { Theme } from '../styles/theme';

const SidebarContainer = styled.div<{ theme: DefaultTheme }>`
    min-height: 100vh;
    background-color: ${props => props.theme.Color.sideColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 17px;
    &.collapse {
        width: 70px;
    }
    &.default {
        width: 195px;
    }
`;

const Profile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 40px;
`;

const ProfileImage = styled.img`
    border-radius: 50%;
    &.collapse {
        width: 37px;
    }
    &.default {    
        width: 100px;
        margin-bottom: 10px;
    }
`;

const ProfileName = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

const ButtonContainer = styled.div`
    width: 100%;
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
    
    &.default {
        margin-left: 120px;
    }
`;

const Sidebar: React.FC = () => {
    const [isCollapse, setIsCollapse] = useState(false);
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
                            <FaAngleDoubleLeft  />
                        </div>
                    )}
                </AngleArrow>
                <Profile>
                    <ProfileImage src="https://via.placeholder.com/80" alt="Profile" className={isCollapse ? 'collapse' : 'default'} />
                    <ProfileName>{isCollapse ? '' : '김선희'}</ProfileName>
                </Profile>
                <ButtonContainer>
                    <Button to="/post">
                        <FaPen />
                        {isCollapse ? '' : '글쓰기'}
                    </Button>
                    <Button to="/">
                        <FaUsers />
                        {isCollapse ? '' : '팀프로젝트'}
                    </Button>
                    <Button to="/developers">
                        <FaCode />
                        {isCollapse ? '' : '개발자'}
                    </Button>
                    <Button to="/designs">
                        <FaPalette />
                        {isCollapse ? '' : '디자이너'}
                    </Button>
                    <Button to="/study">
                        <FaBookOpen />
                        {isCollapse ? '' : '스터디'}
                    </Button>
                    <Button to="/like">
                        <FaHeart />
                        {isCollapse ? '' : '찜한 게시물'}
                    </Button>
                    <Button to="/recent">
                        <FaCode />
                        {isCollapse ? '' : '최근 본 게시물'}
                    </Button>
                </ButtonContainer>
            </SidebarContainer>
        </ThemeProvider>
    );
}

export default Sidebar;
