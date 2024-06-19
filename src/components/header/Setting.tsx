import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormContainer = styled.div`
    width: 60%;
    margin-top: 5vh;
`;

const FormGroup = styled.div`
    margin-bottom: 2vh;
`;

const Label = styled.label`
    font-size: 2.5vh;
    margin-bottom: 1vh;
`;

const Input = styled.input`
    width: 100%;
    padding: 1vh;
    font-size: 2vh;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 10vh;
    padding: 1vh;
    font-size: 2vh;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Button = styled.button`
    background-color: #196CE9;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 1vh 2vh;
    font-size: 2vh;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #145bbd;
    }
`;

const Setting: React.FC = () => {
    // 예시로 상태 관리를 위한 useState 사용
    const [profilePic, setProfilePic] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 예시: 설정 데이터를 서버에 전송하는 로직 작성
        console.log('전송할 데이터:', { profilePic, nickname, bio, email, password });
        // 추가적인 서버 요청 등 필요한 작업 수행
    };

    return (
        <Container>
            <FormContainer>
                <h1>프로필 설정</h1>
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>프로필 사진</Label>
                        <Input
                            type="text"
                            value={profilePic}
                            onChange={(e) => setProfilePic(e.target.value)}
                            placeholder="프로필 사진 URL 입력"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>닉네임</Label>
                        <Input
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="닉네임 입력"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>한줄 소개</Label>
                        <TextArea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="한줄 소개 입력"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>이메일 정보</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="이메일 입력"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>새 비밀번호</Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="새 비밀번호 입력"
                        />
                    </FormGroup>
                    <Button type="submit">저장</Button>
                </form>
            </FormContainer>
        </Container>
    );
};

export default Setting;
