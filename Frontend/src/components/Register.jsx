import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// 1. Defined validation constraints
const registerSchema = z.object({
  username: z.string().min(1, "Username is required").max(30),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Register = () => {
  // 2. Initialized the react-hook-form controller engine
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  // The 'data' argument automatically holds { username, email, password } matching your inputs!
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
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username</label>
          <input {...register("username")} />
          {errors.username && (
            <p style={{ color: "red" }}>{errors.username.message}</p>
          )}
        </div>

        <div>
          <label>Email</label>
          <input {...register("email")} />

          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>Password</label>
          <input {...register("password")} type="password" />

          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;
