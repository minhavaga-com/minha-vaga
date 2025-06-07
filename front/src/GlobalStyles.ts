import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#4A90E2',
    primaryDark: '#357ABD',
    secondary: '#E8E8E3',
    secondaryDark: '#D1D1C6',
    background: '#F8F7F4',
    textDark: '#333333',
    textLight: '#4F4F4F',
    white: '#FFFFFF',
    success: '#50C878',
    lightGray: '#DBDBD4',
  },
  shadows: {
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  }
};

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #FFFFFF;
  }
`;
