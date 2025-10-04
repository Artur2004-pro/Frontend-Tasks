import { useState, useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Axios } from "../../lib/api";
import type { IContext, IResponse } from "../../types";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { motion } from "framer-motion";
import { ImagePicker } from "./image-picker";

export const Settings = () => {
  const { account, setAccount } = useOutletContext<IContext>();
  const [p, setP] = useState<number>(account.isPrivate);

  // Cover state
  const coverInput = useRef<HTMLInputElement | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>("");

  const handleConfig = async () => {
    const { data } = await Axios.patch<IResponse<number>>("/account/set");
    setP(data.payload);
  };

  // Cover handlers
  const handleCoverChange = () => {
    if (coverInput.current?.files) {
      const file = coverInput.current.files[0];
      const reader = new FileReader();
      reader.onload = () => setCoverPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCoverUpload = async () => {
    if (coverInput.current?.files) {
      const file = coverInput.current.files[0];
      const form = new FormData();
      form.append("cover", file);
      const { data } = await Axios.patch<IResponse<string>>(
        "/cover/upload",
        form
      );
      setAccount({ ...account, cover: data.payload });
      setCoverPreview("");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, duration: 0.4 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-900 flex flex-col items-center p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Cover Image */}
      <motion.div
        className="relative w-full max-w-5xl h-60 rounded-3xl overflow-hidden mb-28 cursor-pointer group"
        onClick={() => coverInput.current?.click()}
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
      >
        {/* Hidden file input */}
        <input
          type="file"
          ref={coverInput}
          className="hidden"
          onChange={handleCoverChange}
        />

        {/* Cover Image (server file or local preview) */}
        <div
          className="absolute inset-0 bg-gray-700 transition-all duration-500 group-hover:brightness-90"
          style={{
            backgroundImage: coverPreview
              ? `url(${coverPreview})` // local preview
              : account.cover
              ? `url(http://localhost:4002${account.cover})` // server cover
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* Profile Picture centered */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <ImagePicker />
        </div>
      </motion.div>

      {/* Upload button only for cover */}
      {coverPreview && (
        <motion.div className="flex gap-4 mb-10" variants={itemVariants}>
          <button
            onClick={handleCoverUpload}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            Upload Cover
          </button>
        </motion.div>
      )}

      {/* User info */}
      <motion.div className="text-center mb-10" variants={itemVariants}>
        <h2 className="text-2xl font-bold text-white">
          {account?.name} {account?.surname}
        </h2>
        <p className="text-gray-400">@{account?.login}</p>
      </motion.div>

      {/* Settings Links */}
      <motion.div
        className="flex flex-col gap-6 max-w-3xl w-full"
        variants={itemVariants}
      >
        <Link
          to="/profile/update-login"
          className="w-full px-6 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl shadow-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 font-medium text-white text-center transform hover:scale-105"
        >
          Update Login
        </Link>
        <Link
          to="/profile/update-password"
          className="w-full px-6 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl shadow-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 font-medium text-white text-center transform hover:scale-105"
        >
          Update Password
        </Link>
        <button
          onClick={handleConfig}
          className="w-full px-6 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl shadow-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 font-medium text-white flex items-center justify-center gap-3 transform hover:scale-105"
        >
          {p ? (
            <FaLock className="w-5 h-5" />
          ) : (
            <FaLockOpen className="w-5 h-5" />
          )}
          Configuration Account
        </button>
      </motion.div>
    </motion.div>
  );
};
