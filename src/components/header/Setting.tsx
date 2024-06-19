import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getUserInfo } from '../../api/header/api_Setting';
import { User } from '../../api/types';

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
    border-radius: 8px;
    background: ${props => props.theme.Color.backgroundColor};
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
    const [user, setUser] = useState<User | null>(null);
    const [nickname, setNickname] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userId = 1; // 예시로 사용자 ID를 1로 지정
                const userData = await getUserInfo(userId);
                setUser(userData);

                // 한 줄 소개가 비어있을 경우 기본 값 설정
                if (userData.description) {
                    setBio(userData.description);
                }
            } catch (error) {
                console.error('유저 정보를 불러오는 데 실패했습니다.', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('전송할 데이터:', { nickname, bio, email, password });
        // 서버에 데이터 전송 등의 추가 작업 수행
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <FormContainer>
                <h1>프로필 설정</h1>
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>닉네임</Label>
                        <Input
                            type="text"
                            value={nickname || user.name || ''}
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
                            value={email || user.email || ''}
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
