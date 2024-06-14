import React from "react";
import Board from "../components/board/Board.tsx";

const RecentBoardPage: React.FC = () => {
    return (
        <div>
            <h1>최근 본 게시물</h1>
            <Board category="최근게시물" />
        </div>
    )
}

export default RecentBoardPage;