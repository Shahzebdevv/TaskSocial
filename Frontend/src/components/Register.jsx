import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const registerSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(30, "Username must be 30 characters or less"),

  email: z.string().email("Enter a valid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

const styles = {
  container: {
    width: "100%",
    maxWidth: "430px",
    margin: "0 auto",
    padding: "12px 0",
    boxSizing: "border-box",
  },

  eyebrow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "14px",
    color: "#93c5fd",
    fontSize: "0.78rem",
    fontWeight: "700",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },

  title: {
    margin: "0",
    color: "#f9fafb",
    fontSize: "2rem",
    lineHeight: "1.15",
    textAlign: "center",
  },

  description: {
    maxWidth: "360px",
    margin: "12px auto 30px",
    color: "#9ca3af",
    fontSize: "0.9rem",
    lineHeight: "1.6",
    textAlign: "center",
  },

  field: {
    marginBottom: "18px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    color: "#e5e7eb",
    fontSize: "0.86rem",
    fontWeight: "600",
  },

  input: {
    width: "100%",
    height: "46px",
    padding: "0 14px",
    boxSizing: "border-box",
    background: "#1f2937",
    border: "1px solid #374151",
    borderRadius: "9px",
    color: "#f9fafb",
    fontSize: "0.9rem",
    outline: "none",
  },

  hint: {
    margin: "7px 0 0",
    color: "#6b7280",
    fontSize: "0.76rem",
  },

  error: {
    margin: "7px 0 0",
    color: "#fca5a5",
    fontSize: "0.78rem",
  },

  button: {
    width: "100%",
    height: "46px",
    marginTop: "4px",
    border: "none",
    borderRadius: "9px",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "0.9rem",
    fontWeight: "700",
    cursor: "pointer",
  },

  footer: {
    margin: "22px 0 0",
    paddingTop: "18px",
    borderTop: "1px solid #263247",
    color: "#6b7280",
    fontSize: "0.78rem",
    lineHeight: "1.5",
    textAlign: "center",
  },
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post(`${API_URL}/auth/register`, data, {
        withCredentials: true,
      });

      alert("Registration Successful!");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section style={styles.container}>
      <div style={styles.eyebrow}>
        <span>🚀</span>
        <span>Join TaskSocial</span>
      </div>

      <h1 style={styles.title}>Create your account</h1>

      <p style={styles.description}>
        Create an account, post your goals, and make your progress visible.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Username */}
        <div style={styles.field}>
          <label htmlFor="username" style={styles.label}>
            Username
          </label>

          <input
            id="username"
            {...register("username")}
            style={styles.input}
            placeholder="shahzeb"
            autoComplete="username"
          />

          {errors.username && (
            <p style={styles.error}>{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div style={styles.field}>
          <label htmlFor="email" style={styles.label}>
            Email address
          </label>

          <input
            id="email"
            {...register("email")}
            type="email"
            style={styles.input}
            placeholder="you@example.com"
            autoComplete="email"
          />

          {errors.email && <p style={styles.error}>{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div style={styles.field}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>

          <input
            id="password"
            {...register("password")}
            type="password"
            style={styles.input}
            placeholder="••••••••"
            autoComplete="new-password"
          />

          {errors.password ? (
            <p style={styles.error}>{errors.password.message}</p>
          ) : (
            <p style={styles.hint}>Use at least 6 characters.</p>
          )}
        </div>

        <button type="submit" style={styles.button}>
          Create account →
        </button>
      </form>

      <p style={styles.footer}>
        Your account is the starting point for sharing goals and tracking
        progress publicly.
      </p>
    </section>
  );
};

export default Register;
