import React from 'react';
import styled, { ThemeProvider, DefaultTheme } from 'styled-components'; // DefaultTheme import 추가
import { Link } from 'react-router-dom';
import { FaPen, FaUsers, FaCode } from 'react-icons/fa';
import { Theme } from '../styles/theme'; // 테마 가져오기

const SidebarContainer = styled.div<{ theme: DefaultTheme }>`
    width: 20%;
    height: 100vh; /* 화면 전체 높이 */
    background-color: ${props => props.theme.Color.sideColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Profile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
`;

const ProfileImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 10px;
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
    background-color: #282c34;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #61dafb;
    }
`;

const Sidebar: React.FC = () => {
    return (
        <ThemeProvider theme={Theme}>
            <SidebarContainer>
                <Profile>
                    <ProfileImage src="https://via.placeholder.com/80" alt="Profile" />
                    <ProfileName>김선희</ProfileName>
                </Profile>
                <ButtonContainer>
                    <Button to="/post">
                        <FaPen />
                        글쓰기
                    </Button>
                    <Button to="/board">
                        <FaUsers />
                        팀프로젝트
                    </Button>
                    <Button to="/board">
                        <FaCode />
                        개발자
                    </Button>
                </ButtonContainer>
            </SidebarContainer>
        </ThemeProvider>
    );
}

export default Sidebar;
