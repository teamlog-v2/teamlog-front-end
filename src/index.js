import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import PostFormPage from './pages/PostFormPage';
// import ProjectPage from './pages/ProjectPage';
// import App from './App';
import Project from './project-management/project';

const UserContext = React.createContext({ userId: 'unknown' }); // 기본값이 설정됨, provider로 전달하고 싶은 값을 지정할 수 있다.

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#C16AF5',
    },
    secondary: {
      main: '#E0BAF7',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ userId: 'migu554' }}>
        <UserContext.Consumer>
          {(user) => (
            <Project user={user} />
          )}
        </UserContext.Consumer>
        {/* <App /> */}
      </UserContext.Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
