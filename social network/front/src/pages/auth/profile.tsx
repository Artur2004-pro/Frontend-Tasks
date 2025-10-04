import { useNavigate, useOutletContext, Link } from "react-router-dom";
import type { IContext } from "../../types";
import { Axios } from "../../lib/api";
import defPic from "../../../public/def.jpg";
import { LogOut, Edit } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export const Profile = () => {
  const { account } = useOutletContext<IContext>();
  const navigate = useNavigate();
  const [viewerOpen, setViewerOpen] = useState(false);

  const pickPath = account?.picture
    ? "http://localhost:4002" + account.picture
    : defPic;

  const handleLogout = async () => {
    try {
      await Axios.post("/logout");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePicterViewer = () => {
    setViewerOpen(true);
  };

  if (!account) return null;

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20 px-4 md:px-12 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* subtle animated blob behind the card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/30 via-fuchsia-600/20 to-cyan-500/20 rounded-full filter blur-3xl opacity-40 animate-[pulse_6s_ease-in-out_infinite]"></div>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Cover + card */}
        <div
          style={{
            backgroundImage: account.cover
              ? `url(http://localhost:4002${account.cover})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="bg-gray-900/80 backdrop-blur-lg border border-gray-700/60 rounded-4xl shadow-2xl p-10 md:p-16 flex flex-col md:flex-row items-center gap-12"
        >
          {/* Avatar */}
          <motion.div
            className="flex-shrink-0 relative"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img
              onClick={handlePicterViewer}
              src={pickPath}
              alt={`${account.name} ${account.surname}`}
              className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover ring-6 ring-indigo-500/50 shadow-2xl cursor-pointer"
              whileHover={{ scale: 1.07 }}
              transition={{ duration: 0.4 }}
            />
            <span className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-green-400 ring-2 ring-gray-900 shadow-lg"></span>
          </motion.div>

          {/* Main info */}
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              {account.name} {account.surname}
            </h1>
            <p className="mt-2 text-indigo-300 font-medium text-lg">
              @{account.name.toLowerCase()}
            </p>

            {/* Followers/Following */}
            <div className="mt-8 grid grid-cols-2 gap-6 md:inline-flex md:space-x-8 md:items-center">
              <motion.button
                onClick={() => navigate("/profile/followers")}
                className="flex-1 bg-gray-700/60 hover:bg-indigo-600/30 transition transform hover:-translate-y-1 rounded-xl p-6 md:p-7 shadow-inner backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-3xl md:text-4xl font-bold text-white">
                  {account.followers.length}
                </p>
                <p className="text-base md:text-lg text-gray-300">Followers</p>
              </motion.button>

              <motion.button
                onClick={() => navigate("/profile/following")}
                className="flex-1 bg-gray-700/60 hover:bg-indigo-600/30 transition transform hover:-translate-y-1 rounded-xl p-6 md:p-7 shadow-inner backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-3xl md:text-4xl font-bold text-white">
                  {account.following.length}
                </p>
                <p className="text-base md:text-lg text-gray-300">Following</p>
              </motion.button>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to={"/profile/setings"}
                  className="inline-flex items-center gap-4 px-8 py-4 rounded-3xl bg-gradient-to-r from-indigo-600 to-fuchsia-500 hover:from-indigo-700 hover:to-fuchsia-600 text-white font-semibold shadow-xl transform transition duration-300 hover:-translate-y-1 text-lg"
                >
                  <Edit className="w-6 h-6" />
                  Edit Profile
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-4 px-8 py-4 rounded-3xl bg-gray-700/70 hover:bg-gray-600 text-white font-semibold shadow-lg transform transition duration-300 hover:-translate-y-1 text-lg"
                >
                  <LogOut className="w-6 h-6" />
                  Logout
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Fullscreen Picture Viewer */}
      {viewerOpen && (
        <div
          onClick={() => setViewerOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
        >
          <img
            src={
              account.picture
                ? pickPath
                : defPic
            }
            alt={`${account.name} ${account.surname}`}
            className="max-h-[50vh] max-w-[50vw] rounded-2xl shadow-2xl object-contain"
          />
        </div>
      )}
    </motion.div>
  );
};
