import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Parse from 'parse';
import {signUp, signIn, createList,addUserToList, removeUserFromList} from './API/api'

Parse.initialize("yQQzmBNtqIXWZ3hXkpzDbT5TEX8CxQ6MTBps5XAV", "35JNgEsLV9wyypSnL8Qfg2sUCo4b0DLIy2ugTiUJ");
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
Parse.serverURL = PARSE_HOST_URL;

signIn("bjwe", "password")
// signUp("moop", "password", "moop@itu.dk")
// createList("testlist")
// addUserToList("moop", "testlist")
// removeUserFromList("moop", "testlist")
// getUser("moop")
// asdasd
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

