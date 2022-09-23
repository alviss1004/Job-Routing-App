import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import JobDetailModal from "./components/JobDetailModal";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./auth/RequireAuth";
import LoginModal from "./components/LoginModal";
import Layout from "./pages/Layout";
import AuthProvider from "./auth/AuthProvider";

function App() {
  const location = useLocation();
  let state = location.state;
  return (
    <>
      <AuthProvider>
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
          <Route
            path="*"
            element={
              <main>
                <h1>PAGE NOT FOUND!</h1>
              </main>
            }
          />
        </Routes>
        {state?.backgroundLocation && (
          <Routes>
            <Route path="login" element={<LoginModal />} />
            <Route
              path="/job/:id"
              element={
                <RequireAuth>
                  <JobDetailModal />
                </RequireAuth>
              }
            />
          </Routes>
        )}
      </AuthProvider>
    </>
  );
}

export default App;
