import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import JobDetailModal from "./components/JobDetailModal";
import HomePage from "./pages/HomePage";
import { useContext } from "react";
import AuthContext from "./auth/AuthContext";
import LoginModal from "./components/LoginModal";
import Layout from "./pages/Layout";

function App() {
  const location = useLocation();
  const auth = useContext(AuthContext);
  const state = location.state;
  return (
    <>
      <Routes
        location={
          location.state?.backgroundLocation
            ? location.state.backgroundLocation
            : location
        }
      >
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginModal />} />
        </Route>
        <Route
          path="*"
          element={
            <main>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
      {state && auth.user ? (
        <Routes>
          <Route path="/job/:id" element={<JobDetailModal />}></Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/job/:id" element={<LoginModal />}></Route>
        </Routes>
      )}
    </>
  );
}

export default App;
