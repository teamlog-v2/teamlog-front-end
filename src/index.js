import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import PostFormPage from './PostFormPage';
// import ProjectPage from './ProjectPage';
// import ModuleTest from './ModuleTest';

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
      <PostFormPage />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
