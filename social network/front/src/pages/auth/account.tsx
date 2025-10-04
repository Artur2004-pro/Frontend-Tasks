import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Axios } from "../../lib/api";
import type { IAccountInfo, IContext, IResponse } from "../../types";
import { Image } from "../../lib/helpers/image";
import { motion } from "framer-motion";
import defImg from "../../../public/def.jpg";

export const Account = () => {
  const [count, setCount] = useState<number>(0);
  const [btnText, setBtnText] = useState<
    "follow" | "unfollow" | "requested" | "blocked"
  >("follow");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { account: myProfile } = useOutletContext<IContext>();
  if (myProfile.id == Number(id)) {
    navigate("/profile");
  }
  const [account, setAccount] = useState<IAccountInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [block, setBlock] = useState<string>("block");

  // --- Նոր state profile picture viewer-ի համար ---
  const [viewerOpen, setViewerOpen] = useState(false);

  useEffect(() => {
    handleGetAccount();
  }, [id]);

  const handleGetAccount = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.get<IResponse<IAccountInfo>>(
        `/account/${id}`
      );
      setAccount(data.payload);
      setCount(data.payload?.followers?.length | 0);
      if (data.payload.connection.didIBlock) {
        setBtnText("blocked");
        setBlock("unblock");
      } else if (data.payload.connection.requested) {
        setBtnText("requested");
      } else {
        setBtnText(data.payload.connection.following ? "unfollow" : "follow");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- Avatar viewer handler ---
  const handlePicterViewer = () => {
    setViewerOpen(true);
  };

  const handleBlock = async () => {
    if (!id) return;
    try {
      const { data } = await Axios.post<IResponse>(`/block/${id}`);
      setBtnText(data.message === "unblocked" ? "follow" : "blocked");
      setBlock(data.message === "unblocked" ? "block" : "unblock");
    } catch (err) {
      console.error(err);
    }
  };

  const handleFollow = async () => {
    if (!id) return;
    try {
      const { data } = await Axios.post<IResponse>(`/account/follow/${id}`);
      if (data.message === "following") {
        setBtnText("unfollow");
        setCount(count + 1);
      } else if (data.message === "unfollowed") {
        setCount(count - 1);
        setBtnText("follow");
      } else if (data.message === "requested") setBtnText("requested");
      else if (data.message === "cancelled") setBtnText("follow");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-400 animate-pulse">
        Loading...
      </div>
    );
  }

  if (!account) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-400">
        No account found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-gray-800/90 backdrop-blur-md border border-gray-700 rounded-3xl shadow-2xl w-full max-w-2xl p-8 flex flex-col items-center text-center"
      >
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
          className="relative mb-6 cursor-pointer"
          onClick={handlePicterViewer}
        >
          <Image
            src={account.picture || ""}
            alt={`${account.name} ${account.surname}`}
            size="lg"
            className="border-indigo-500"
          />
          <span className="absolute bottom-3 right-3 w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-400 ring-2 ring-gray-900 animate-pulse"></span>
        </motion.div>

        {/* Username */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-extrabold text-white mb-2"
        >
          {account.name} {account.surname}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-indigo-300 font-medium mb-4"
        >
          @{account.name.toLowerCase()}
        </motion.p>

        {/* Followers & Following */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-12 mb-6"
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white">{count}</span>
            <span className="text-gray-400 text-sm">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white">
              {account.following?.length || 0}
            </span>
            <span className="text-gray-400 text-sm">Following</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full flex flex-col md:flex-row gap-4 mb-6"
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleFollow}
            disabled={btnText === "blocked"}
            className={`flex-1 py-3 rounded-full font-semibold shadow-lg transition duration-300 ${
              btnText === "follow"
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : btnText === "unfollow"
                ? "bg-red-600 hover:bg-red-700 text-white"
                : btnText === "requested"
                ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                : "bg-gray-700 text-gray-300 cursor-not-allowed"
            }`}
          >
            {btnText}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleBlock}
            className="flex-1 py-3 rounded-full font-semibold shadow-lg transition duration-300 bg-gray-700 hover:bg-gray-600 text-white"
          >
            {block}
          </motion.button>
        </motion.div>

        {/* Posts Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="w-full mt-6 flex flex-col gap-6"
        >
          {account.isPrivate &&
          (account.connection.blockedMe || account.connection.requested) ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 bg-gray-700 rounded-2xl text-gray-300 text-center shadow-inner"
            >
              🔒 This account is private. You cannot see the posts.
            </motion.div>
          ) : account.posts?.length > 0 ? (
            account.posts.map((post, i) => (
              <motion.div
                key={post.id}
                onClick={() => navigate(`/profile/posts/${post.id}`)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="bg-gray-700 rounded-2xl p-5 shadow-lg cursor-pointer hover:scale-105 transition"
              >
                {post.picture && (
                  <img
                    src={`http://localhost:4002${post.picture}`}
                    alt=""
                    className="w-full h-auto rounded-xl mb-3 object-cover"
                  />
                )}
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 bg-gray-700 rounded-2xl text-gray-400 text-center shadow-inner"
            >
              No posts yet.
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* --- Fullscreen Profile Picture Viewer --- */}
      {viewerOpen && (
        <div
          onClick={() => setViewerOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
        >
          <img
            src={account.picture? "http://localhost:4002" + account.picture: defImg}
            alt={`${account.name} ${account.surname}`}
            className="max-h-[50vh] max-w-[50vw] rounded-2xl shadow-2xl object-contain"
          />
        </div>
      )}
    </div>
  );
};
