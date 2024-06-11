import React from 'react';
import styled from 'styled-components';
import { FaPen, FaUsers, FaCode } from 'react-icons/fa';

const SidebarContainer = styled.div`
  width: 20%;
  height: 100vh;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
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

const Button = styled.button`
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
        <SidebarContainer>
            <Profile>
                <ProfileImage src="https://via.placeholder.com/80" alt="Profile" />
                <ProfileName>김선희</ProfileName>
            </Profile>
            <ButtonContainer>
                <Button>
                    <FaPen />
                    글쓰기
                </Button>
                <Button>
                    <FaUsers />
                    팀프로젝트
                </Button>
                <Button>
                    <FaCode />
                    개발자
                </Button>
            </ButtonContainer>
        </SidebarContainer>
    );
}

export default Sidebar;
