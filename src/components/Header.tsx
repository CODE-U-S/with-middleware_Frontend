import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {Link, useNavigate} from "react-router-dom";

// 헤더 컨테이너 스타일
const HeaderContainer = styled.header`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 12px;
    background-color: white;
    box-shadow: 0 10px 25px rgb(0, 0, 0, 0.1);
    z-index: 10;
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
    cursor: pointer;
`;

const SearchInput = styled.input`
    margin-right: -1rem;
    border: none;
    display: block;
    border-bottom: 1px solid ${props => props.theme.Color.gray};

    &::placeholder {
        color: #BEBEBE;
        font-size: 11pt;
    }

    &:focus {
        outline: none;
    }

    @media screen and (max-width: 600px) {
        width: 7vmax;
    }
    @media screen and (min-width: 600px) and (max-width: 1020px) {
        width: 17vmax;
    }
    @media screen and (min-width: 1020px) {
        width: 15vmax;
    }
`;

// Header 컴포넌트
const Header: React.FC = () => {
    const [isClickedSearch, setIsClickedSearch] = useState(false);
    const [searchText, setSearchText] = useState<string>('');
    const searchInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();  // Navigate 선언

    const HandleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchText(e.target.value);
    }

    // 검색 아이콘 클릭 여부 판단 함수
    const HandleSearchbar = () => {
        if (isClickedSearch)
            setIsClickedSearch(false);
        else
            setIsClickedSearch(true);
    }

    const HandleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            navigate(`/post/search/${searchText}`);
            HandleSearchbar();
        }
    }
    
    // 검색 아이콘
    const SearchIcon = () => {
        return (
            <Icon
                src="/src/assets/header/search_icon.svg"
                alt="검색 아이콘"
                className="icon-search"
                onClick={() => {
                    HandleSearchbar();
                    setSearchText("");  // 검색어 초기화: 검색 후 다시 검색 시 공백일 때 이전 검색어로 검색되는 현상 막음
                }}
            />
        );
    }
    // 유저 아이콘
    const UserIcon = () => {
        return <Icon src="/src/assets/header/user_icon.svg" alt="유저 아이콘" className="icon-user"/>;
    }
    // 알람 아이콘
    const AlarmIcon = () => {
        return <Icon src="/src/assets/header/alarm_icon.svg" alt="알람 아이콘" className="icon-alarm"/>;
    }

    // useEffect 사용 - 검색창 생성 후 검색창이 아닌 다른 곳을 클릭할 경우 검색창이 사라짐
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent): void => {
            if(searchInputRef.current && !searchInputRef.current.contains(e.target as Node)) {
                setIsClickedSearch(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [searchText]);

    return (
        <HeaderContainer ref={searchInputRef}>
            {/* 왼쪽 로고 이미지 */}
            <Link to='/'>
                <LogoImage src="/src/assets/header/Logo.svg" alt="로고"/>
            </Link>

            {/* 오른쪽 아이콘 */}
            <IconsContainer>
                {isClickedSearch ? (
                    <>
                        <SearchInput
                            type="text"
                            name="search_text"
                            placeholder="검색어를 입력하세요"
                            autoFocus   // 검색 아이콘 클릭 시 자동으로 검색창 커서 깜빡임
                            onChange={HandleSearchKeyword}
                            onKeyDown={HandleEnter}
                        />
                        <Link to={`/post/search/${searchText}`}>
                            {/* 검색 아이콘 */}
                            <SearchIcon />
                        </Link>
                    </>
                ) : (
                    <SearchIcon />
                )}
                <Link to={`/mypage`}>
                    <UserIcon />
                </Link>
                <AlarmIcon />
            </IconsContainer>
        </HeaderContainer>
    );
};

export default Header;