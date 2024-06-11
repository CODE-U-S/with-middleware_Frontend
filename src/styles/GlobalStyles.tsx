// GlobalStyles.tsx

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    /* 한글 폰트 적용 */
    body {
        width: auto;
        height: 100%;
        background: ${(props) => props.theme.Color.backgroundColor};
        color: ${(props) => props.theme.Color.textColor};
        font-family: 'S-CoreDream-3Light', sans-serif;
        margin: 0;
        padding: 0;
        overflow: hidden; /* 페이지 스크롤바 제거 */
    }

    /* 영어 폰트 적용 */
    body, input, select, textarea {
        font-family: 'S-CoreDream-3Light', sans-serif;
    }
`;