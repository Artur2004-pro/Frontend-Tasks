import { useEffect, useState } from "react";
import { Axios } from "../../lib/api";
import { Image } from "../../lib/helpers/image";
import type { IResponse, User } from "../../types";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Following = () => {
  const navigate = useNavigate();
  const [following, setFollowing] = useState<User[]>([]);

  useEffect(() => {
    getFollowing();
  }, []);

  const getFollowing = async () => {
    try {
      const { data } = await Axios.get<IResponse<User[]>>("/following");
      setFollowing(data.payload);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGetAccount = (id: number) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black p-10 flex flex-col items-center">
      {/* Title with animation */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-white mb-8"
      >
        Followings
      </motion.h1>

      {following.length > 0 ? (
        <div className="w-full max-w-2xl flex flex-col gap-5">
          {following.map((user, idx) => (
            <motion.div
              key={user.id}
              onClick={() => handleGetAccount(user.id)}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-5 p-5 bg-gray-800/90 rounded-2xl shadow-lg cursor-pointer 
                         hover:bg-gray-700 transition-all duration-300"
            >
              <Image
                src={user.picture || ""}
                alt={`${user.name} ${user.surname}`}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-600 shadow-md"
              />
              <p className="text-white text-lg md:text-xl font-semibold">
                {user.name} {user.surname}
              </p>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-center text-lg mt-6"
        >
          No Followings
        </motion.p>
      )}
    </div>
  );
};
