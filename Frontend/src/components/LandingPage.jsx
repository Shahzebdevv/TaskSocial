import React from "react";

const features = [
  {
    icon: "🎯",
    title: "Make goals visible",
    text: "Turn the things you want to finish into public accountability tasks.",
  },
  {
    icon: "⚡",
    title: "Track progress",
    text: "Create tasks, update their status, and keep your progress moving.",
  },
  {
    icon: "🌐",
    title: "See the community",
    text: "Explore what other people are working on through the shared feed.",
  },
];

export default function LandingPage({ onGetStarted }) {
  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.badge}>
          <span style={styles.badgeDot} />
          Open-source accountability app
        </div>

        <h1 style={styles.title}>
          Put your goals
          <br />
          <span style={styles.accent}>out in the open.</span>
        </h1>

        <p style={styles.description}>
          TaskSocial helps you turn daily objectives into public commitments.
          Create a task, track your progress, and see what other people are
          working toward.
        </p>

        <div style={styles.actions}>
          <button onClick={onGetStarted} style={styles.primaryButton}>
            Get started <span>→</span>
          </button>
          <span style={styles.actionHint}>Build consistency in public.</span>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div>
            <p style={styles.kicker}>How it works</p>
            <h2 style={styles.sectionTitle}>Simple by design.</h2>
          </div>
          <p style={styles.sectionDescription}>
            The core idea is simple: make the work visible, then keep showing
            up.
          </p>
        </div>

        <div style={styles.featureGrid}>
          {features.map((feature) => (
            <article key={feature.title} style={styles.featureCard}>
              <div style={styles.icon}>{feature.icon}</div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureText}>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={styles.bottomCard}>
        <div>
          <p style={styles.kicker}>Your next task</p>
          <h2 style={styles.bottomTitle}>What are you working on today?</h2>
        </div>
        <button onClick={onGetStarted} style={styles.secondaryButton}>
          Create a task →
        </button>
      </section>
    </main>
  );
}

const styles = {
  page: {
    maxWidth: "960px",
    margin: "0 auto",
    padding: "56px 20px 80px",
    boxSizing: "border-box",
  },
  hero: {
    padding: "64px 56px",
    border: "1px solid #263247",
    borderRadius: "20px",
    background:
      "radial-gradient(circle at 80% 10%, rgba(37,99,235,0.18), transparent 34%), #111827",
    boxShadow: "0 30px 80px rgba(0,0,0,0.22)",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "9px",
    padding: "7px 11px",
    border: "1px solid #263247",
    borderRadius: "999px",
    background: "#0f172a",
    color: "#93c5fd",
    fontSize: "0.78rem",
    fontWeight: "700",
    marginBottom: "24px",
  },
  badgeDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#3b82f6",
    display: "inline-block",
  },
  title: {
    margin: 0,
    color: "#f9fafb",
    fontSize: "clamp(2.7rem, 7vw, 5rem)",
    lineHeight: "0.98",
    letterSpacing: "-0.045em",
    maxWidth: "760px",
  },
  accent: { color: "#60a5fa" },
  description: {
    maxWidth: "650px",
    margin: "26px 0 30px",
    color: "#9ca3af",
    fontSize: "1.05rem",
    lineHeight: "1.75",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
  },
  primaryButton: {
    border: "none",
    borderRadius: "9px",
    padding: "13px 18px",
    background: "#2563eb",
    color: "#fff",
    fontWeight: "700",
    fontSize: "0.92rem",
    cursor: "pointer",
  },
  actionHint: { color: "#6b7280", fontSize: "0.82rem" },
  section: { padding: "72px 0 0" },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    gap: "30px",
    marginBottom: "24px",
  },
  kicker: {
    margin: "0 0 7px",
    color: "#60a5fa",
    fontSize: "0.75rem",
    fontWeight: "800",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  sectionTitle: { margin: 0, color: "#f9fafb", fontSize: "1.8rem" },
  sectionDescription: {
    maxWidth: "420px",
    margin: 0,
    color: "#6b7280",
    fontSize: "0.9rem",
    lineHeight: "1.6",
    textAlign: "right",
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "14px",
  },
  featureCard: {
    padding: "24px",
    border: "1px solid #263247",
    borderRadius: "14px",
    background: "#0f172a",
  },
  icon: { fontSize: "1.35rem", marginBottom: "20px" },
  featureTitle: { margin: "0 0 8px", color: "#f9fafb", fontSize: "1rem" },
  featureText: {
    margin: 0,
    color: "#8993a7",
    fontSize: "0.88rem",
    lineHeight: "1.6",
  },
  bottomCard: {
    marginTop: "14px",
    padding: "28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
    border: "1px solid #263247",
    borderRadius: "14px",
    background: "#111827",
  },
  bottomTitle: { margin: 0, color: "#f9fafb", fontSize: "1.2rem" },
  secondaryButton: {
    border: "1px solid #374151",
    borderRadius: "9px",
    padding: "11px 15px",
    background: "#1f2937",
    color: "#f9fafb",
    fontWeight: "700",
    cursor: "pointer",
  },
};
