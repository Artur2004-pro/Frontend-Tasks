import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../lib/api";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { IResponse, UpdatePasswordUser } from "../../types";
import axios from "axios";
import { motion } from "framer-motion";

export const UpdatePassworduser = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordUser>();

  const onSubmit: SubmitHandler<UpdatePasswordUser> = async (data) => {
    try {
      await Axios.patch("/update/password", data);
      setError("");
      reset();
      navigate("/profile/succses-update/login|password");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data as IResponse;
        setError(serverError.message);
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
        {/* Title */}
        <motion.h1
          className="text-4xl font-extrabold mb-6 text-center text-indigo-400"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
        >
          🔒 Update Password
        </motion.h1>

        {/* Error */}
        {error && (
          <motion.div
            className="bg-red-500 text-white p-4 rounded-xl mb-6 shadow-md text-center"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            key={error}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <label className="block text-sm font-medium mb-2">
              Old Password
            </label>
            <input
              type="password"
              {...register("oldPassword", {
                required: "Old password is required",
              })}
              placeholder="Enter old password"
              className={`w-full p-4 rounded-xl bg-gray-700 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                errors.oldPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-600"
              }`}
            />
            {errors.oldPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.oldPassword.message}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <label className="block text-sm font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
              placeholder="Enter new password"
              className={`w-full p-4 rounded-xl bg-gray-700 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                errors.newPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-600"
              }`}
            />
            {errors.newPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.newPassword.message}
              </p>
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
