import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/admin/admin";
import Update from "./components/update/update"
import ChatApp from "./components/chatApp/chatApp"

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/update" element={<Update />} />
        <Route path="/chatApp" element={<ChatApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
