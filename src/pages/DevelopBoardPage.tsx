import React from 'react';
import Board from '../components/board/Board';

const StudyPostsPage: React.FC = () => {
    return (
        <div style={{ width: '95%' }}>
            <h1>개발자 게시물</h1>
            <Board category="개발자" />
        </div>
    );
};

export default StudyPostsPage;
