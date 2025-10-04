import { Axios } from "../../lib/api";
import type { IResponse, IUser } from "../../types";
import { useEffect, useState } from "react";
import { Image } from "../../lib/helpers/image.tsx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Search = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (!text) {
      return setUsers([]);
    }
    handleSearch();
  }, [text]);

  const handleSearch = async () => {
    const { data } = await Axios.get<IResponse<IUser[]>>(`search/${text}`);
    setUsers(data.payload);
  };

  // Variants for staggered animation
  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black flex flex-col items-center p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-8">
        Search for a friend...
      </h3>

      {/* Search Bar */}
      <div className="flex w-full max-w-xl gap-3 mb-8">
        <input
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-5 py-3 rounded-2xl border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          type="text"
          placeholder="Type a name..."
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-semibold shadow-lg hover:bg-indigo-700 transform transition duration-300 hover:-translate-y-1"
        >
          Search
        </button>
      </div>

      <p className="text-gray-300 mb-6 text-lg">
        {users.length} user{users.length !== 1 ? "s" : ""} found
      </p>

      {/* Users List */}
      <motion.div
        className="grid gap-6 w-full max-w-3xl"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {users.map((user) => (
          <motion.div
            key={user.id}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            className="rounded-2xl shadow-lg hover:shadow-2xl transition-transform"
          >
            <Link
              to={`/profile/${user.id}`}
              className="flex items-center gap-6 p-5 bg-gray-800 rounded-2xl"
            >
              <Image
                src={user.picture || ""}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-indigo-500 shadow-md object-cover"
              />
              <div className="flex-1">
                <b className="block text-xl md:text-2xl text-white">
                  {user.name}
                </b>
                <span className="text-gray-400 text-sm md:text-base">
                  {user.surname}
                </span>
              </div>
              <span className="text-indigo-400 font-semibold hover:underline">
                Go to Profile
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
