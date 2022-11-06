import React from "react";
import "./App.css";
import { initializeParse } from "@parse/react";
import { ChatSetup } from "./ChatSetup";

// Your Parse initialization configuration goes here
// Note the live query URL instead of the regular server url
// const PARSE_APPLICATION_ID = "3rR52azrwXcXVrp7R7zzV51eMeqTvURmNXomXusd";
// // const PARSE_SERVER_URL = "https://parseapi.back4app.com/";
// const PARSE_LIVE_QUERY_URL = "https://chatappexample.b4a.io/";
// const PARSE_JAVASCRIPT_KEY = "edKkiABgCJHJahP7LzZvtRZsfhvYRbowWlgutx8H";

const PARSE_APPLICATION_ID = "yQQzmBNtqIXWZ3hXkpzDbT5TEX8CxQ6MTBps5XAV"
const PARSE_JAVASCRIPT_KEY = "35JNgEsLV9wyypSnL8Qfg2sUCo4b0DLIy2ugTiUJ"
const PARSE_LIVE_QUERY_URL = 'https://kiasnewapp.b4a.io'

// Initialize parse using @parse/react instead of regular parse JS SDK
initializeParse(
  PARSE_LIVE_QUERY_URL,
  PARSE_APPLICATION_ID,
  PARSE_JAVASCRIPT_KEY
);

function App() {
  return (
    <div className="App">
      <ChatSetup />
    </div>
  );
}

export default App;