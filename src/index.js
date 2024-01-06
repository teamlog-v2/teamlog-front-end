// import { ThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';


const theme = createTheme({
  palette: {
    primary: {
      main: '#593875',
    },
    secondary: {
      main: '#593875',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('app'),
);
