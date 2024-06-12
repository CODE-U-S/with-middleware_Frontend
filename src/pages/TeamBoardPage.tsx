import React from 'react';
import Board from '../components/board/Board';

const StudyPostsPage: React.FC = () => {
    return (
        <div>
            <h1>스터디 게시물</h1>
            <Board category="팀프로젝트" />
        </div>
    );
};

export default StudyPostsPage;
