// GlobalStyles.tsx

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    /* 한글 폰트 적용 */
    body {
        padding-top: 73px;
        width: auto;
        height: 100%;
        background: ${(props) => props.theme.Color.backgroundColor};
        color: ${(props) => props.theme.Color.textColor};
        font-family: 'S-CoreDream-3Light', sans-serif;
    }

    /* 영어 폰트 적용 */
    body, input, select, textarea {
        font-family: 'S-CoreDream-3Light', sans-serif;
    }
`;