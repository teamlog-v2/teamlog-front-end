import { createTheme, ThemeProvider } from '@mui/material/styles'; // Import from '@mui/material/styles'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const theme = createTheme({ // Use createTheme instead of createMuiTheme
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