import React from "react";
import Login from "./Login";
import Todo from "./Todo";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
function App() {
  const authentication = localStorage.getItem("secret_mission");
  return (
    <>
      <BrowserRouter>
        <Routes>
          {authentication ? (
            <>
              <Route path="/todo" element={<Todo />} />
              <Route path="*" e element={<Navigate to={"/todo"} />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login />} />
              <Route path="*" e element={<Navigate to={"/"} />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
