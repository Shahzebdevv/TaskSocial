import React from "react";

export default function LandingPage({ onGetStarted }) {
  return (
    <div style={{ padding: "10px 0" }}>
      {/* Brutalist Main Entry Card */}
      <div className="brutalist-card" style={{ marginBottom: "50px" }}>
        <h2 className="section-title" style={{ marginBottom: "12px" }}>
          Public accountability for your daily objectives.
        </h2>
        <p
          className="section-desc"
          style={{ marginBottom: "30px", maxWidth: "650px" }}
        >
          A minimal open-source tool built to help you track consistency. Sign
          in to declare your daily tasks to a live database feed, toggle your
          progress states, and see what other creators are executing in
          real-time.
        </p>
        <button onClick={onGetStarted} className="action-btn">
          Open Your Public Feed →
        </button>
      </div>

      {/* Core Platform Capabilities Section */}
      <div style={{ marginBottom: "60px" }}>
        <h3
          style={{
            fontSize: "0.9rem",
            fontWeight: "700",
            color: "#9095aa",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            marginBottom: "25px",
          }}
        >
          Platform Mechanics
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "30px",
          }}
        >
          <div>
            <h4
              style={{
                fontSize: "1.1rem",
                fontWeight: "700",
                marginBottom: "8px",
                color: "#fff",
              }}
            >
              🚀 Secure Session Entry
            </h4>
            <p
              style={{
                color: "#9095aa",
                fontSize: "0.9rem",
                lineHeight: "1.5",
              }}
            >
              Register a customized handle. Accounts feature token
              authentication stored securely inside HttpOnly browser cookies.
            </p>
          </div>

          <div>
            <h4
              style={{
                fontSize: "1.1rem",
                fontWeight: "700",
                marginBottom: "8px",
                color: "#fff",
              }}
            >
              📝 Live Feed Routing
            </h4>
            <p
              style={{
                color: "#9090aa",
                fontSize: "0.9rem",
                lineHeight: "1.5",
              }}
            >
              Publish tasks straight into a public MongoDB data stream linked
              dynamically directly to your account identity handle.
            </p>
          </div>

          <div>
            <h4
              style={{
                fontSize: "1.1rem",
                fontWeight: "700",
                marginBottom: "8px",
                color: "#fff",
              }}
            >
              🔄 Full CRUD Operations
            </h4>
            <p
              style={{
                color: "#9095aa",
                fontSize: "0.9rem",
                lineHeight: "1.5",
              }}
            >
              Update your execution states or completely delete your entries
              with immediate reactive caching via TanStack Query.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
