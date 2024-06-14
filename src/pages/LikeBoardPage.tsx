import React from "react";
import Board from "../components/board/Board.tsx";

const LikeBoardPage: React.FC = () => {
    return (
        <div>
            <h1>찜한 게시물</h1>
            <Board category="찜한게시물" />
        </div>
    )
}

export default LikeBoardPage;