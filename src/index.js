import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import PostFormPage from './PostFormPage';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root'),
// );

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
