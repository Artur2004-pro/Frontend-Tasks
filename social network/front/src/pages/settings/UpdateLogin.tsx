import { useForm, type SubmitHandler } from "react-hook-form";
import type { UpdateLoginUser, IResponse } from "../../types.ts";
import { Axios } from "../../lib/api.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export const UpdateLogin = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateLoginUser>();

  const onSubmit: SubmitHandler<UpdateLoginUser> = async (data) => {
    try {
      await Axios.patch("/update/login", data);
      setError("");
      reset();
      navigate("/profile/succses-update/login|password");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data as IResponse;
        setError(errorResponse.message);
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-full max-w-md bg-gray-800 rounded-3xl shadow-2xl p-10 text-gray-100"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.h1
          className="text-4xl font-extrabold mb-6 text-center text-indigo-400"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
        >
          🔑 Update Login
        </motion.h1>

        {error && (
          <motion.div
            className="bg-red-500 text-white p-4 rounded-xl mb-6 shadow-md"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            key={error}
          >
            {error}
          </motion.div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <label className="block text-sm font-medium mb-2">New Login</label>
            <input
              type="text"
              {...register("newLogin", { required: "Login is required" })}
              placeholder="Enter new login"
              className={`w-full p-4 rounded-xl bg-gray-700 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                errors.newLogin ? "border-red-500 focus:ring-red-500" : "border-gray-600"
              }`}
            />
            {errors.newLogin && (
              <p className="text-red-400 text-sm mt-1">{errors.newLogin.message}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
              className="w-full p-4 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 px-5 py-3 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Save Changes
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};
