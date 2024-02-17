import { ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
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

const authPopup = 'login';

// eslint-disable-next-line default-param-last
function reducer(state = authPopup, action) {
  state = action.type;

  return state;
}

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('app'),
);
