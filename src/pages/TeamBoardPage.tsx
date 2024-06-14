import React from 'react';
import Board from '../components/board/Board';

const StudyPostsPage: React.FC = () => {
    return (
        <div>
            <h1>팀프로젝트 게시물</h1>
            <Board category="팀프로젝트" />
        </div>
    );
};

export default StudyPostsPage;
