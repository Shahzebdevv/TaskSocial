import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  backgroundColor: "#1f2937",
  border: "1px solid #374151",
  borderRadius: "6px",
  color: "white",
  marginTop: "5px",
  marginBottom: "5px",
};

export default function Login() {
  const { setAuth } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/login",
        data,
        {
          withCredentials: true,
        },
      );
      setAuth(response.data.user);
      alert("Login Successful!");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px", fontSize: "1.5rem" }}>Welcome Back</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontSize: "0.85rem", color: "#9ca3af" }}>
            Email Address
          </label>
          <input
            {...register("email")}
            style={inputStyle}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p
              style={{ color: "#f87171", fontSize: "0.8rem", marginTop: "2px" }}
            >
              {errors.email.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "0.85rem", color: "#9ca3af" }}>
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            style={inputStyle}
            placeholder="••••••••"
          />
          {errors.password && (
            <p
              style={{ color: "#f87171", fontSize: "0.8rem", marginTop: "2px" }}
            >
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
