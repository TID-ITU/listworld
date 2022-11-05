import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeParse } from  '@parse/react';
import {signUp, signIn, createList,addUserToList, removeUserFromList} from './API/api'

initializeParse(
  "kiasnewapp.b4a.io", 
  "yQQzmBNtqIXWZ3hXkpzDbT5TEX8CxQ6MTBps5XAV", 
  "35JNgEsLV9wyypSnL8Qfg2sUCo4b0DLIy2ugTiUJ"
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

