import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  padding: 20px;
  background-color: #EFEFEF;
  overflow-y: auto;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Content = styled.div`
  line-height: 1.6;
  color: #333333;
`;

const CodeBlock = styled.pre`
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto;
  code {
    font-family: 'Courier New', Courier, monospace;
  }
`;

const MainContent: React.FC = () => {
    return (
        <MainContainer>
            <Title>React + TypeScript + Vite</Title>
            <Content>
                <p><b>앙</b> 기모링~~~^^* 안녕하세요 반갑습니다.</p>
                <p>This template provides <b>WITHMIDDLEWARE</b> minimal setup to get React working in Vite with HMR and some ESLint rules.</p>
                <p>Currently, two official plugins are available:</p>
                <ul>
                    <li>
                        <a href="https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md" target="_blank" rel="noopener noreferrer">
                            @vitejs/plugin-react
                        </a> uses <a href="https://babeljs.io/" target="_blank" rel="noopener noreferrer">Babel</a> for Fast Refresh
                    </li>
                    <li>
                        <a href="https://github.com/vitejs/vite-plugin-react-swc" target="_blank" rel="noopener noreferrer">
                            @vitejs/plugin-react-swc
                        </a> uses <a href="https://swc.rs/" target="_blank" rel="noopener noreferrer">SWC</a> for Fast Refresh
                    </li>
                </ul>
                <h2>Expanding the ESLint configuration</h2>
                <p>
                    If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:
                </p>
                <p>Configure the top-level <code>parserOptions</code> property like this:</p>
                <CodeBlock>
                    <code>
                        {`export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}`}
                    </code>
                </CodeBlock>
                <p>
                    Replace <code>plugin:@typescript-eslint/recommended</code> to <code>plugin:@typescript-eslint/recommended-type-checked</code> or <code>plugin:@typescript-eslint/strict-type-checked</code>
                </p>
                <p>Optionally add <code>plugin:@typescript-eslint/stylistic-type-checked</code></p>
                <p>
                    Install <a href="https://github.com/jsx-eslint/eslint-plugin-react" target="_blank" rel="noopener noreferrer">eslint-plugin-react</a> and add <code>plugin:react/recommended</code> &amp; <code>plugin:react/jsx-runtime</code> to the <code>extends</code> list
                </p>
            </Content>
        </MainContainer>
    );
}

export default MainContent;
