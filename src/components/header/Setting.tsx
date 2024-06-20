import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {getUserInfo} from '../../api/header/api_Setting';
import {User} from '../../api/types';

const Container = styled.div`
    display: flex;
    padding-bottom: 50px;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormContainer = styled.div`
    width: 60%;
    margin-top: 2vh;
`;

const EditInfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const P = styled.p`
    margin-bottom: 7px;
`;

const Input = styled.input`
    padding: 1.4vmin;
    margin-bottom: 2vmin;
    width: 25vw;
    border: 1px solid #888;
    border-radius: 5px;
`;

const TextCountSpanContainer = styled.div`
    position: absolute;
    font-size: 0.75rem;
    margin: -18px 0 0 22vw;
    color: ${props => props.theme.Color.gray};
`;

const EditImageContainer = styled.div`
    text-align: center;
`;

const EditButton  = styled.button`
    position: absolute;
    margin-top: -5vh;
    margin-left: -8vh;
    padding: 0.4vh 1.5vh 0.4vh 1.5vh;
    border: 1px solid ${props => props.theme.Color.gray};
    border-radius: 5px;
    background-color: white;
    cursor: pointer;
`;

const ButtonsContainer = styled.div`
    text-align: end;
`;

const SaveButton  = styled.button`
    padding: 0.6vw 0 0.6vw 0;
    margin-right: 10px;
    border-radius: 5px;
    border: 0;
    background-color: ${props => props.theme.Color.primaryColor};
    color: white;
    font-weight: bold;
    font-size: 0.9rem;
    width: 6.5vw;
    cursor: pointer;
`;

const PolicySpanContainer = styled.div`
    padding: 2vh;
    border: 1px solid gray;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.07);
    color: #555;
    font-size: 11pt;
`;

const AgreeSpanContainer = styled.div`
    margin: 2vh 0;
    font-size: 11.5pt;
`;

const DeleteAccountButton = styled.button`
    padding: 1vh 1.8vh 1vh 1.8vh;
    margin-bottom: 1vh;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    background-color: rgba(255, 0, 0, 0.7);
    color: white;
`;

const TextArea = styled.textarea`
    padding: 1.4vmin;
    margin-bottom: 2vmin;
    width: 25vw;
    border: 1px solid #888;
    border-radius: 5px;
    resize: none;
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
    border-top: 4px dotted #999;
    margin: 3vh 0 5vh 0;
`;

const ProfileImage = styled.div`
    width: 15vh;
    height: 15vh;
    border-radius: 50%;
    background-color: #ddd;
    margin-bottom: 2vh;
    background-image: url('http://localhost:8080/1.png');
    background-size: cover;
    background-position: center;
`;

const Setting: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [nickname, setNickname] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [checkPassword, setCheckPassword] = useState<string>('');
    const [agreeDeletePolicy, setAgreeDeletePolicy] = useState<boolean>(false);
    const [bioLength, setBioLength] = useState<number>(0);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userId = 1;
                const userData = await getUserInfo(userId);
                setUser(userData);

                if (userData.description) {
                    setBio(userData.description);
                    setBioLength(userData.description.length);
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
        setBioLength(inputBio.length);
    };

    const handleDeleteAccount = () => {
        if (agreeDeletePolicy) {
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
                <h2>계정 관리</h2>
                <EditInfoContainer>
                    <div>
                        <div>
                            <P>닉네임</P>
                            <Input
                                type="text"
                                value={nickname || user.name || ''}
                                onChange={(e) => setNickname(e.target.value)}
                                className="DefaultInput"
                                placeholder="닉네임 입력"
                            />
                        </div>
                        <div>
                            <P>한줄 소개</P>
                            <div>
                                <TextCountSpanContainer>
                                    <span>{bioLength}/255</span>
                                </TextCountSpanContainer>
                                <TextArea
                                    value={bio}
                                    onChange={handleBioChange}
                                    placeholder="한줄 소개 입력"
                                    maxLength={255}
                                />
                            </div>
                        </div>
                    </div>
                    <EditImageContainer>
                        <div>
                            <label>프로필 사진</label>
                        </div>
                        <ProfileImage/>
                        <EditButton>수정</EditButton>
                    </EditImageContainer>
                </EditInfoContainer>
                <ButtonsContainer>
                    <SaveButton type="submit">저장</SaveButton>
                </ButtonsContainer>
                <DottedDivider/>
                <div>
                    <div>
                        <P>이메일 정보</P>
                        <Input
                            type="email"
                            value={email || user.email || ''}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="이메일 입력"
                        />
                    </div>
                    <ButtonsContainer>
                        <SaveButton type="submit">저장</SaveButton>
                    </ButtonsContainer>
                </div>
                <Divider/>
                <div>
                    <div>
                        <P>현재 비밀번호</P>
                        <Input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="현재 비밀번호 입력"
                        />
                        <P>새 비밀번호</P>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="새 비밀번호 입력"
                        />
                        <P>비밀번호 확인</P>
                        <Input
                            type="password"
                            value={checkPassword}
                            onChange={(e) => setCheckPassword(e.target.value)}
                            placeholder="새 비밀번호 확인"
                        />
                    </div>
                    <ButtonsContainer>
                        <SaveButton type="submit">저장</SaveButton>
                    </ButtonsContainer>
                </div>
                <Divider/>
                <div>
                    <P>계정삭제</P>
                    <PolicySpanContainer>
                        회원 탈퇴일로부터 계정과 닉네임을 포함한 계정 정보(아이디/이메일/닉네임)는 개인정보 처리방침에 따라 60일간 보관(잠김)되며, 60일 경과된 후에는 모든 개인 정보는
                        완전히 삭제되며 더 이상 복구할 수 없게 됩니다.
                    </PolicySpanContainer>
                    <AgreeSpanContainer>
                            <input
                                type="checkbox"
                                checked={agreeDeletePolicy}
                                onChange={() => setAgreeDeletePolicy(!agreeDeletePolicy)}
                            />
                                <span>
                                    계정 삭제에 관한 정책을 읽고 이에 동의합니다.
                                </span>
                    </AgreeSpanContainer>
                    <DeleteAccountButton onClick={handleDeleteAccount}>회원 탈퇴</DeleteAccountButton>
                </div>
                <ButtonsContainer>
                    <SaveButton type="submit">저장</SaveButton>
                </ButtonsContainer>
            </FormContainer>
        </Container>
    );

};

export default Setting;
