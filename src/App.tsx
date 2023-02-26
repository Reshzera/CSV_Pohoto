import React from "react";
import { ThemeProvider } from "styled-components";
import AppsRoutes from "./routes";
import GlobalStyles from "./styles/GlobalStyles";
import Theme from "./styles/themes/default";
// import { Container } from './styles';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={Theme}>
      <AppsRoutes />
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default App;
