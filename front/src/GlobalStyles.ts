import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#4A90E2',
    primaryDark: '#357ABD',
    secondary: '#E8E8E3',
    secondaryDark: '#D1D1C6',
    background: '#F8F7F4',
    backgroundLight: '#E8E8E3',
    textDark: '#333333',
    textMedium: '#374151',
    textLight: '#4F4F4F',
    white: '#FFFFFF',
    grayLight: '#F3F4F6',
    success: '#50C878',
    lightGray: '#DBDBD4',
    footer: '#1F2973',
    footerText: '#E5E7EB',
  },
  shadows: {
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  fonts: {
    main: "'Readex Pro', sans-serif",
    fallback: "sans-serif"
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
    font-family: ${theme.fonts.main};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #FFFFFF;
  }

  h1, h2, h3, h4, h5, h6, p, span, div, a, button {
    font-family: ${theme.fonts.main};
  }
`;
