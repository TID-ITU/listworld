import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {signUp, signIn, createList,addUserToList, removeUserFromList} from './API/api'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

