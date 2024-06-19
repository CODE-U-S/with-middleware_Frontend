import React from 'react';
import Board from '../components/board/Board';
import styled from 'styled-components';

const TitleContainer = styled.div`
    position: relative;
    left: 10vh;
    top: 4.5vh; 
`;

const PageTitle = styled.h1`
    font-size: 2.5em;
    text-align: left;
    margin-bottom: 3vh;
    color: #333;
`;

const DesignPostsPage: React.FC = () => {
    return (
        <div style={{ width: '95%', paddingTop: '3vh' }}>
            <TitleContainer>
                <PageTitle>디자인 게시물</PageTitle>
            </TitleContainer>
            <Board category="디자이너" />
        </div>
    );
};

export default DesignPostsPage;
