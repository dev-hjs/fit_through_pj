import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
  max-width: 1200px;
  min-width: 800px;
  height: 100vh;
  margin: auto;
}
button, a {
  cursor: pointer;
}
`;

export default GlobalStyle;
