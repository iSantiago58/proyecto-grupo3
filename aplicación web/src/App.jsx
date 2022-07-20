import React from "react";
import styled from "styled-components";

//react component
import { AppRouter } from "./routers/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { GlobalStateProvider } from "Hooks/GlobalHook";

const AppLayout = styled.div`
  margin: 0;
  padding: 0;
  height: 100vh;
`;

function App() {
  return (
    <GlobalStateProvider>
      <AppLayout>
        <BrowserRouter>
          <AppRouter></AppRouter>
        </BrowserRouter>
      </AppLayout>
    </GlobalStateProvider>
  );
}

export default App;
