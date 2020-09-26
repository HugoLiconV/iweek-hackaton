import React from "react";
import "./App.css";
import ActionsBottomBar from "./components/ActionsBottomBar";
import { Router } from "@reach/router";
import Home from "./pages/Home";
import Profile from "./pages/Profiile";
import BusinessList from "./components/BusinessList";
import CreateBusiness from "./pages/CreateBusiness";

function App() {
  return (
    <>
      <Router>
        <Home path="/" />
        <Profile path="/profile" />
        <BusinessList path="/business/:id" />
        <CreateBusiness path="/create-business" />
      </Router>
      <ActionsBottomBar />
    </>
  );
}

export default App;
