import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        login(response.data.user);
        navigate("/");
      }
    } catch (error) {
      console.log(error, "error connecting with axios");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="name">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
              required
            />
          </div>
          <div>
            <button
              className="w-full bg-teal-600 text-white py-2"
              type="submit"
            >
              Login
            </button>
          </div>
          <p className="text-center">
            Don't Have Account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
