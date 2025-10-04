import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

export const UpdateStatus = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/profile");
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-gray-800 rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center text-gray-100"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 12,
            delay: 0.2,
          }}
        >
          <CheckCircle className="w-24 h-24 text-green-400" />
        </motion.div>

        <motion.h1
          className="text-4xl font-extrabold mb-4 text-green-400"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 150, delay: 0.3 }}
        >
          ✅ Successful!
        </motion.h1>

        <motion.p
          className="text-lg text-gray-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Your changes have been saved successfully.
        </motion.p>

        <motion.div
          className="mt-6 flex justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150, delay: 0.6 }}
        >
          <div className="w-16 h-1 bg-green-400 rounded-full animate-ping"></div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
