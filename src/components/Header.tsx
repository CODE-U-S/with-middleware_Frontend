import React from 'react';
import styled from 'styled-components';

// 헤더 컨테이너 스타일
const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10px;
    background-color: white;
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
`;

// 로고 이미지 스타일
const LogoImage = styled.img`
    width: 200px;
    margin-left: 20px;
`;

// 아이콘 컨테이너 스타일
const IconsContainer = styled.div`
    display: flex;
    gap: 1.5rem;
    margin-right: 20px;
`;

// 아이콘 스타일
const Icon = styled.img`
    width: 20px;
    height: 20px;
`;

// Header 컴포넌트
const Header: React.FC = () => {
    return (
        <HeaderContainer>
            {/* 왼쪽 로고 이미지 */}
            <LogoImage src="/src/assets/header/Logo.svg" alt="로고" />

            {/* 오른쪽 아이콘 */}
            <IconsContainer>
                <Icon src="/src/assets/header/search_icon.svg" alt="검색 아이콘" />
                <Icon src="/src/assets/header/user_icon.svg" alt="유저 아이콘" />
                <Icon src="/src/assets/header/alarm_icon.svg" alt="알람 아이콘" />
            </IconsContainer>
        </HeaderContainer>
    );
};

export default Header;
