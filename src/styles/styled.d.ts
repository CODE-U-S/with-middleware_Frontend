import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        Color : {
            primaryColor : string;
            gray : string;
            backgroundColor : string;
            textColor : string;
            sideColor : string;
        }
    }
    
}