import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Axios } from "../../lib/api.ts";
import { useState } from "react";
import axios from "axios";
import type { AuthUser, IResponse } from "../../types.ts";
import { motion } from "framer-motion";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthUser>();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin: SubmitHandler<AuthUser> = async (data) => {
    try {
      const res = await Axios.post("/login", data);
      console.log("Login success:", res.data);
      setError("");
      reset();
      navigate("/profile");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as IResponse;
        setError(errorResponse.message);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="bg-gray-850/70 backdrop-blur-md border border-gray-700 rounded-3xl shadow-2xl w-full max-w-lg p-10 md:p-12 flex flex-col items-center"
        variants={itemVariants}
      >
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-white mb-8"
          variants={itemVariants}
        >
          Welcome Back
        </motion.h1>

        {error && (
          <motion.p
            className="text-red-400 mb-4 text-center"
            animate={{ scale: [1, 1.05, 1], opacity: [0, 1, 1] }}
            transition={{ duration: 0.6 }}
          >
            {error}
          </motion.p>
        )}

        <motion.form
          className="w-full space-y-6"
          onSubmit={handleSubmit(handleLogin)}
          variants={containerVariants}
        >
          {/* Login */}
          <motion.div className="flex flex-col gap-1" variants={itemVariants}>
            {errors.login && (
              <p className="text-red-400 text-sm">{errors.login.message}</p>
            )}
            <label className="text-gray-300 font-medium">Login</label>
            <input
              {...register("login", { required: "Please enter login" })}
              type="text"
              placeholder="Enter your login"
              className="w-full px-5 py-3 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-inner"
            />
          </motion.div>

          {/* Password */}
          <motion.div className="flex flex-col gap-1" variants={itemVariants}>
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
            <label className="text-gray-300 font-medium">Password</label>
            <input
              {...register("password", { required: "Please enter password" })}
              type="password"
              placeholder="Enter your password"
              className="w-full px-5 py-3 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-inner"
            />
          </motion.div>

          {/* Submit */}
          <motion.button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold text-lg shadow-lg transition transform hover:scale-[1.02]"
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
            Log In
          </motion.button>
        </motion.form>

        <motion.p
          className="text-gray-400 text-sm text-center mt-6"
          variants={itemVariants}
        >
          Don’t have an account?{" "}
          <Link to="/" className="text-indigo-400 hover:underline">
            Sign up
          </Link>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};
