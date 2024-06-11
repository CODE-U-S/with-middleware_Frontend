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



const LayoutContainer = styled.div`
    display: flex;
    height: 100vh; /* 화면 전체 높이를 차지하도록 설정 */
`;

const Content = styled.div`
    flex: 1; /* 남은 모든 공간을 차지함 */
    display: flex;
    justify-content: center; /* 수평 중앙 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
     /* 내용이 많을 경우 스크롤이 가능하도록 설정 */
    background-color: #EFEFEF;
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
                                {/*<Route path="/post" element={<Post />} />*/}
                            </Routes>
                        </Content>
                    </LayoutContainer>
                </div>
            </Router>
        </ThemeProvider>

    );
};

export default App;