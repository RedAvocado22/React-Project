import { createGlobalStyle } from "styled-components";
import { GlobalClasses } from "./GlobalClasses";
export const GlobalStyles = createGlobalStyle`
  ${GlobalClasses}
`;

declare module "styled-components" {
    export interface DefaultTheme {
        primary: string;
        secondary: string;
        grayDark: string;
        grayLight: string;
        tertiary: string;
        accent: string;
        grayF3: string;
        gray6B: string;
        gray23: string;
        gray4b: string;
        grayf1: string;
        gray80: string;
        black: string;
    }
}
