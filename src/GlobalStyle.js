import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

:root {
  --color-bg : #35C5F0
  --color-text : #2f3438
  --color-accent : #B46060
  --color-box : #FFBF9B
  --color-footer-bg #f7f9fa:
  }

  body {
    // max-width: 1200px;
    min-width: 800px;
    height: 100vh;
    margin: auto;
  }

  button, a {
    cursor: pointer;
  }
`;

export default GlobalStyle;
