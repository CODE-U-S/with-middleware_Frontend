import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';
import { options } from './options';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 1px;
    margin-left: -70px;
    align-items: flex-end; /* 버튼 컨테이너의 align-items를 flex-end로 설정 */
`;

interface ButtonProps {
    isSelected?: boolean;
}

const Button = styled.button<ButtonProps>`
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    background-color: ${props => props.color || "#007BFF"};
    color: white;
    cursor: pointer;
    border-radius: 10px 10px 0 0;
    transform: scale(${props => props.isSelected ? 1.2 : 1});
    transform-origin: bottom; /* 버튼의 transform-origin을 bottom으로 설정 */
    transition: transform 0.3s ease;
    position: relative; /* 위치 상대적으로 설정 */
    z-index: ${props => props.isSelected ? 1 : 0}; /* 선택된 버튼을 앞으로 가져옴 */

    &:hover {
        background-color: #007BFF;
    }
`;

const PostContainer = styled.div`
    background-color: white;
    padding: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
`;

const TitleInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 30px;
    border: none;
    border-radius: 0;
    outline: none;
`;

const MarkdownEditorContainer = styled.div`
    margin-top: 20px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #ccc;
`;

const StyledMDEditor = styled(MDEditor)`
    border-radius: 30px;
`;

const DropdownContainer = styled.div`
    width: 100%;
    margin-bottom: 10px;
`;

const Dropdown = styled.select`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background-color: #f0f0f0;
    outline: none;
`;

const Option = styled.option``;

const Post: React.FC = () => {
    const [value, setValue] = useState<string | undefined>("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>('teamProject');
    const [categoryOptions, setCategoryOptions] = useState<string[]>([]);

    useEffect(() => {
        if (selectedCategory !== null && options[selectedCategory]) {
            setCategoryOptions(options[selectedCategory]);
        }
    }, [selectedCategory]);

    useEffect(() => {
        setSelectedCategory('teamProject'); // 페이지 로드 시 '팀프로젝트'를 선택
    }, []);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <PageContainer>
            <ButtonContainer>
                <Button color="#AAD8FF" isSelected={selectedCategory === 'teamProject'} onClick={() => setSelectedCategory('teamProject')}>팀프로젝트</Button>
                <Button color="#77B5FE" isSelected={selectedCategory === 'developer'} onClick={() => setSelectedCategory('developer')}>개발자</Button>
                <Button color="#6CACE4" isSelected={selectedCategory === 'designer'} onClick={() => setSelectedCategory('designer')}>디자이너</Button>
                <Button color="#4682B4" isSelected={selectedCategory === null} onClick={() => setSelectedCategory(null)}>스터디</Button>
            </ButtonContainer>
            <PostContainer>
                <TitleInput type="text" placeholder="제목을 입력하세요" />
                {selectedCategory !== null && categoryOptions.length > 0 && (
                    <DropdownContainer>
                        <Dropdown onChange={handleCategoryChange} value={selectedCategory}>
                            <Option value="" disabled>분야를 선택하세요</Option>
                            {categoryOptions.map((option: string, index: number) => (
                                <Option key={index} value={option}>{option}</Option>
                            ))}
                        </Dropdown>
                    </DropdownContainer>
                )}
                <MarkdownEditorContainer>
                    <StyledMDEditor
                        value={value}
                        onChange={setValue}
                        height={400}
                    />
                </MarkdownEditorContainer>
            </PostContainer>
        </PageContainer>
    );
};

export default Post;
