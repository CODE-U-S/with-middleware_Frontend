import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        Color : {
            backgroundColor : string;
            textColor : string;
            sideColor : string;
        }
    }
}