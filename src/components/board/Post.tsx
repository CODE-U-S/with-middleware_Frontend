import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { options } from './options';
import { createPost } from '../../api/board/api_Post.ts';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5vh;
    width: 100%;
    height: 100%;
`;

const ButtonContainer = styled.div`
    display: flex;
    align-items: flex-end;
    z-index: 1;
`;

interface ButtonProps {
    isSelected?: boolean;
}

const Button = styled.button<ButtonProps>`
    padding: 1vh 2vw;
    font-size: 2vh;
    border: none;
    background-color: ${props => props.color || "#007BFF"};
    color: white;
    cursor: pointer;
    border-radius: 1vh 1vh 0 0;
    transform: scale(${props => props.isSelected ? 1.2 : 1});
    transform-origin: bottom;
    transition: transform 0.3s ease, margin-left 0.3s ease, margin-right 0.3s ease;
    position: relative;
    z-index: ${props => props.isSelected ? 1 : 0};
    margin-left: ${props => props.isSelected ? '1vw' : '0'};
    margin-right: ${props => props.isSelected ? '1vw' : '0'};

    &:hover {
        background-color: #007BFF;
    }
`;

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: white;
    padding: 3vh;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius:  0 0 1vh 1vh;
`;

const TitleInput = styled.input`
    width: 100%;
    padding: 5vh;
    font-size: 4vh;
    border: none;
    border-radius: 0;
    outline: none;
`;

const MarkdownEditorContainer = styled.div`
    margin-top: 2vh;
    border-radius: 1vh;
    overflow: hidden;
    border: 0.1vh solid #ccc;
`;

const StyledMDEditor = styled(MDEditor)`
    border-radius: 3vh;
`;

const DropdownContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 1vh;
    padding: 1vh;
`;

const Dropdown = styled.select`
    width: 100%;
    padding: 1vh;
    font-size: 2vh;
    border: none;
    border-radius: 1vh;
    background-color: #f0f0f0;
    outline: none;
`;

const Option = styled.option``;

const SubmitButton = styled.button`
    padding: 1vh 5vw;
    font-size: 2vh;
    border: none;
    background-color: #007BFF;
    color: white;
    cursor: pointer;
    border-radius: 1vh;
    margin-top: 3vh;
    align-self: flex-end;
    font-weight: bold;
`;

const CategoryLabel = styled.p`
    width: 5%;
    font-size: 2.7vh;
    font-weight: bold;
    margin-right: 1vw;
`;

const Post: React.FC = () => {
    const [value, setValue] = useState<string | undefined>("");
    const [selectedButton, setSelectedButton] = useState<string | null>('teamProject');
    const [selectedCategory, setSelectedCategory] = useState<string | null>('teamProject');
    const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
    const [title, setTitle] = useState<string>("");
    const MIN_EDITOR_HEIGHT = 200;
    const [editorHeight, setEditorHeight] = useState(MIN_EDITOR_HEIGHT); // 초기 높이를 설정합니다.

    const viewerRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate(); // useNavigate 훅 사용

    useEffect(() => {
        if (selectedCategory !== null && options[selectedCategory]) {
            setCategoryOptions(options[selectedCategory]);
        }
    }, [selectedCategory]);

    useEffect(() => {
        setSelectedCategory('teamProject'); // 페이지 로드 시 '팀프로젝트'를 선택
    }, []);

    useEffect(() => {
        if (viewerRef.current) {
            const viewerHeight = viewerRef.current.scrollHeight;
            if (viewerHeight > MIN_EDITOR_HEIGHT) {
                setEditorHeight(viewerHeight); // 에디터 높이를 업데이트합니다.
            }
        }
    }, [value]);

    const handleButtonClick = (category: string | null) => {
        setSelectedButton(category);
        // 선택한 카테고리에 맞는 기본 값 설정
        if (category && options[category]) {
            setSelectedCategory(options[category][0]); // options 객체에서 첫 번째 값을 선택
        } else {
            setSelectedCategory(null); // 스터디의 경우 null로 설정
        }
    };

    useEffect(() => {
        if (selectedButton !== null && options[selectedButton]) {
            setCategoryOptions(options[selectedButton]);
            setSelectedCategory(options[selectedButton][0]); // options 객체에서 첫 번째 값을 선택
        }
    }, [selectedButton]);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const handleSubmission = async () => {
        let category;
        if (selectedButton === 'teamProject') {
            category = '팀프로젝트';
        } else if (selectedButton === 'developer') {
            category = '개발자';
        } else if (selectedButton === 'designer') {
            category = '디자이너';
        } else {
            category = '스터디';
        }

        const postData = {
            title,
            content: value || "",
            user: { id: 1, name: 'Example User' }, // 예시로 name 추가
            category: category,
            field: selectedCategory,
            status: 'OPEN' as 'OPEN' | 'CLOSED'
        };

        console.log("Request data:", postData);

        try {
            const response = await createPost(postData);
            console.log("Post created successfully:", response);

            // 등록 후에 새로운 포스트의 ID 값을 얻어옴
            const postId = response.id;

            // 얻어온 ID를 사용하여 페이지 이동
            navigate(`/post/${postId}`);
        } catch (error) {
            console.error("Failed to create post:", error);
        }
    };

    return (
        <PageContainer>
            <ButtonContainer>
                <Button color="#AAD8FF" isSelected={selectedButton === 'teamProject'} onClick={() => handleButtonClick('teamProject')}>팀프로젝트</Button>
                <Button color="#77B5FE" isSelected={selectedButton === 'developer'} onClick={() => handleButtonClick('developer')}>개발자</Button>
                <Button color="#6CACE4" isSelected={selectedButton === 'designer'} onClick={() => handleButtonClick('designer')}>디자이너</Button>
                <Button color="#4682B4" isSelected={selectedButton === null} onClick={() => handleButtonClick(null)}>스터디</Button>
            </ButtonContainer>
            <PostContainer>
                <TitleInput
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {selectedCategory !== null && categoryOptions.length > 0 && (
                    <DropdownContainer>
                        <CategoryLabel>분류 </CategoryLabel>
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
                        height={editorHeight + 100}
                        enableScroll={false}
                    />
                </MarkdownEditorContainer>
                <div ref={viewerRef} style={{ visibility: 'hidden', position: 'absolute', top: 0, left: 0 }}>
                    <MDEditor.Markdown source={value} rehypePlugins={[[rehypeSanitize]]} />
                </div>
                <SubmitButton onClick={handleSubmission}>등록</SubmitButton>
            </PostContainer>
        </PageContainer>
    );
};

export default Post;
