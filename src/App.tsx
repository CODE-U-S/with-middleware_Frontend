import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyles';
import { Theme } from './styles/theme';
import './App.css';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Post from "./components/board/Post";
import StudyBoard from "./pages/StudyBoardPage";

const LayoutContainer = styled.div`
    display: flex;
    height: calc(100% - 80px); /* 화면 전체 높이에서 헤더 높이(80px)를 뺀 높이 설정 */
    margin-top: 80px; /* 헤더의 높이만큼 여백 추가 */
`;

const Content = styled.div`
    flex: 1; /* 남은 모든 공간을 차지함 */
    display: flex;
    justify-content: center; /* 수평 중앙 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
    background-color: #EFEFEF;
    height: 100%; /* 부모의 높이를 100% 차지 */
    padding: 20px; /* 내부 여백 추가 */

`;

const App: React.FC = () => {
    return (
        <ThemeProvider theme={Theme}>
            <Router>
                <GlobalStyle />
                <div className="app">
                    <Header />
                    <LayoutContainer>
                        <Sidebar />
                        <Content>
                            <Routes>
                                <Route path="/" element={<Post />} />
                                <Route path="/post" element={<Post />} />
                                <Route path="/board" element={<StudyBoard />} />
                            </Routes>
                        </Content>
                    </LayoutContainer>
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;
