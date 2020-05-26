import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
   return (
      <div className="App">
         <Switch>
            <Route exact path="/" render={() => <Login />} />
            <Route path="/register" render={() => <Register />} />
            <Route render={() => <h1>404</h1>} />
         </Switch>
      </div>
   );
}

export default App;
