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

const TextAreaContainer = styled.div`
    display: flex; /* Ensure TextArea and CharacterCount are in the same flex container */
    align-items: flex-start; /* Align items to the start */
    width: 100%;
`;

const TextArea = styled.textarea`
    flex: 1;
    height: 10vh;
    padding: 1vh;
    font-size: 2vh;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
    max-width: 50%; 
`;

const CharacterCount = styled.span`
    font-size: 1.5vh;
    color: #666;
    margin-left: 1vh; /* Add some margin for separation */
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

const Divider = styled.hr`
    width: 100%;
    border: none;
    border-top: 2px solid #ddd;
    margin: 2vh 0;
`;

const DottedDivider = styled.hr`
    width: 100%;
    border: none;
    border-top: 4px dotted #999; /* Increased thickness and darker color */
    margin: 2vh 0;
`;

const InfoBox = styled.div`
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 1.5vh;
    background-color: #f5f5f5;
    margin-bottom: 2vh;
    font-size: 1.8vh;
`;

const CheckBoxContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1vh;
`;

const CheckBox = styled.input`
    margin-right: 1vh;
`;

const PolicyText = styled.span`
    font-size: 1.8vh;
`;

const DeleteButton = styled.button`
    background-color: #EA949D;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 1vh 2vh;
    font-size: 2vh;
    cursor: pointer;
    transition: background-color 0.3s ease;
`;

const SectionGroup = styled.div`
    margin: 10vh 0;
`;

const Setting: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [nickname, setNickname] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [agreeDeletePolicy, setAgreeDeletePolicy] = useState<boolean>(false);
    const [bioLength, setBioLength] = useState<number>(0); // State to track bio length

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userId = 1; // 예시로 사용자 ID를 1로 지정
                const userData = await getUserInfo(userId);
                setUser(userData);

                // 한 줄 소개가 비어있을 경우 기본 값 설정
                if (userData.description) {
                    setBio(userData.description);
                    setBioLength(userData.description.length); // Initialize length
                }
            } catch (error) {
                console.error('유저 정보를 불러오는 데 실패했습니다.', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputBio = e.target.value;
        setBio(inputBio);
        setBioLength(inputBio.length); // Update bio length
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('전송할 데이터:', { nickname, bio, email, password });
        // 서버에 데이터 전송 등의 추가 작업 수행
    };

    const handleDeleteAccount = () => {
        if (agreeDeletePolicy) {
            // 여기에 계정 삭제 처리 로직 추가
            console.log('계정 삭제 요청');
        } else {
            alert('계정 삭제 정책에 동의해 주세요.');
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <FormContainer>
                <h1>프로필 설정</h1>
                <form onSubmit={handleSubmit}>
                    <SectionGroup>
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
                            <TextAreaContainer>
                                <TextArea
                                    value={bio}
                                    onChange={handleBioChange}
                                    placeholder="한줄 소개 입력"
                                    maxLength={255} // Limit to 255 characters
                                />
                                <CharacterCount>
                                    {bioLength}/255
                                </CharacterCount>
                            </TextAreaContainer>
                        </FormGroup>
                    </SectionGroup>
                    <DottedDivider />
                    <SectionGroup>
                        <FormGroup>
                            <Label>이메일 정보</Label>
                            <Input
                                type="email"
                                value={email || user.email || ''}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="이메일 입력"
                            />
                        </FormGroup>
                    </SectionGroup>
                    <Divider />
                    <SectionGroup>
                        <FormGroup>
                            <Label>새 비밀번호</Label>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="새 비밀번호 입력"
                            />
                        </FormGroup>
                    </SectionGroup>
                    <Divider />
                    <SectionGroup>
                        <Label>계정삭제</Label>
                        <InfoBox>
                            회원 탈퇴일로부터 계정과 닉네임을 포함한 계정 정보(아이디/이메일/닉네임)는 개인정보 처리방침에 따라 60일간 보관(잠김)되며, 60일 경과된 후에는 모든 개인 정보는 완전히 삭제되며 더 이상 복구할 수 없게 됩니다.
                        </InfoBox>
                        <CheckBoxContainer>
                            <CheckBox
                                type="checkbox"
                                checked={agreeDeletePolicy}
                                onChange={() => setAgreeDeletePolicy(!agreeDeletePolicy)}
                            />
                            <PolicyText>
                                계정 삭제에 관한 정책을 읽고 이에 동의합니다.
                            </PolicyText>
                        </CheckBoxContainer>
                        <DeleteButton onClick={handleDeleteAccount}>회원 탈퇴</DeleteButton>
                    </SectionGroup>
                    <Divider />
                    <Button type="submit">저장</Button>
                </form>
            </FormContainer>
        </Container>
    );
};

export default Setting;
