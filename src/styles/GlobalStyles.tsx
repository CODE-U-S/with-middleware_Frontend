import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'S-CoreDream-3Light';
        src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    * {
        box-sizing: border-box;
        font-family: S-CoreDream-3Light, sans-serif;  /* 전체 폰트 적용 */
    }

    body {
        padding-top: 73px;
        width: auto;
        height: 100%;
        background: ${(props) => props.theme.Color.backgroundColor};
        color: ${(props) => props.theme.Color.textColor};
    }
`;