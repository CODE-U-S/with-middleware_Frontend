import React from 'react';
import styled from 'styled-components';


const PostContainer = styled.div`
  background-color: white;
  padding: 30px;
  margin-bottom: 0px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 30px;
  border: none;
  border-radius: 0;
  outline: none; /* 포커스 시 테두리 제거 */
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Post: React.FC = () => {
    return (
        <PostContainer>
            <TitleInput type="text" placeholder="제목을 입력하세요" />
            <ContentTextarea placeholder="내용을 입력하세요" />
        </PostContainer>
    );
};

export default Post;
