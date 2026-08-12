import React, { useState } from "react";
import { useAuthStore } from "./store/useAuthStore.js";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import TaskFeed from "./components/TaskFeed.jsx";
import LandingPage from "./components/LandingPage.jsx";
import "./index.css";

function App() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [showLogin, setShowLogin] = useState(true);
  const [started, setStarted] = useState(false);

  return (
    <div
      className="app-container"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* STRUCTURED NAVIGATION BAR */}
      <nav className="app-header" style={{ padding: "25px 0" }}>
        <h1 className="brand-title" onClick={() => setStarted(false)}>
          TaskSocial 🚀
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => {
                  setStarted(true);
                  setShowLogin(true);
                }}
                className="secondary-btn"
                style={{ border: "none" }}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setStarted(true);
                  setShowLogin(false);
                }}
                className="action-btn"
                style={{ padding: "8px 16px", fontSize: "0.85rem" }}
              >
                Get Started
              </button>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span style={{ color: "#9095aa", fontSize: "0.9rem" }}>
                Welcome,{" "}
                <strong style={{ color: "#fff" }}>@{user?.username}</strong>
              </span>
              <button
                onClick={() => {
                  logout();
                  setStarted(false);
                }}
                className="secondary-btn"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* MAIN DATA VIEWPORTS ROUTER */}
      <main style={{ flex: 1 }}>
        {isAuthenticated ? (
          <TaskFeed />
        ) : !started ? (
          <LandingPage onGetStarted={() => setStarted(true)} />
        ) : (
          <div
            className="brutalist-card"
            style={{
              maxWidth: "450px",
              margin: "40px auto",
              textAlign: "center",
            }}
          >
            {showLogin ? <Login /> : <Register />}

            <button
              onClick={() => setShowLogin(!showLogin)}
              style={{
                background: "none",
                border: "none",
                color: "#9095aa",
                textDecoration: "underline",
                cursor: "pointer",
                marginTop: "20px",
                fontSize: "0.9rem",
              }}
            >
              {showLogin
                ? "Don't have an account? Register here"
                : "Already have an account? Login here"}
            </button>
          </div>
        )}
      </main>

      {/* CUSTOM HUMAN-CENTRIC FOOTER */}
      <footer
        style={{
          marginTop: "80px",
          borderTop: "1px solid #232631",
          padding: "25px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.85rem",
          color: "#52586e",
          lineHeight: "1.4",
        }}
      >
        <div>
          <span>© {new Date().getFullYear()} TaskSocial.</span>
        </div>
        {/* FIXED: Replaced technical labels stack with your custom signature links */}
        <div style={{ textAlign: "right" }}>
          <p style={{ color: "#9095aa", fontWeight: "500" }}>
            Built and maintained by Mohammad Shahzeb Alam.
          </p>
          <p style={{ color: "#52586e", fontSize: "0.8rem", marginTop: "2px" }}>
            Always learning. Always contributing.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
