import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import Loading from "./features/loading";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <Loading />
      </header>
    </div>
  );
}

export default App;
