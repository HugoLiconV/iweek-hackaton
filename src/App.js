import React from "react";
import "./App.css";
import ActionsBottomBar from "./components/ActionsBottomBar";
import { Router } from "@reach/router";
import Home from "./pages/Home";
import Profile from "./pages/Profiile";
import CreateBusiness from "./pages/CreateBusiness";
import BusinessDetails from "./pages/BusinessDetails";

function App() {
  return (
    <>
      <Router>
        <Home path="/" />
        <Profile path="/profile" />
        <BusinessDetails path="/business/:id" />
        <CreateBusiness path="/create-business" />
      </Router>
      <ActionsBottomBar />
    </>
  );
}

export default App;

