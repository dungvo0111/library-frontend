import React, { useState } from "react";
import axios from "axios";

import "./App.scss";
//Context API
import ThemeContext, { themes } from "./context";
import Routes from "./Routes";

axios.defaults.baseURL = "https://backend-library.herokuapp.com/api/v1";

function App() {
  const [context, setContext] = useState({
    theme: themes.primary,
    switchTheme: (code: string) => {
      setContext((current) => ({
        ...current,
        theme:
          code === themes.primary.code
            ? themes.primary
            : code === themes.secondary.code
            ? themes.secondary
            : themes.third,
      }));
    },
  });
  return (
    <>
      <ThemeContext.Provider value={context}>
        <Routes />
      </ThemeContext.Provider>
    </>
  );
}

export default App;
