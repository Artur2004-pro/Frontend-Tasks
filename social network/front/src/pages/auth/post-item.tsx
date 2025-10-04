import { Heart, MessageSquare, Trash2 } from "lucide-react";
import type { IPropsIpost, IResponse } from "../../types";
import React, { useState } from "react";
import { Image } from "../../lib/helpers/image";
import { Axios } from "../../lib/api";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const PostItem: React.FC<IPropsIpost> = ({
  post,
  user,
  onHandleDelete,
}) => {
  const [like, setLike] = useState<number>(post.likes.length);
  const [isLiked, setIsLiked] = useState<boolean>(
    post.likes.some((u) => u.id === user.id)
  );

  const handleLike = async () => {
    const { data } = await Axios.post<IResponse<string>>(
      `/posts/react/${post.id}`
    );
    if (data.payload === "liked") {
      setLike(like + 1);
      setIsLiked(true);
    } else {
      setLike(like - 1);
      setIsLiked(false);
    }
  };

  return (
    <motion.div
      className="w-full bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Cover image */}
      {post.picture && (
        <motion.img
          src={"http://localhost:4002" + post.picture}
          alt="Post cover"
          className="w-full h-72 md:h-80 object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
      )}

      <div className="p-6 md:p-8 text-gray-100">
        {/* User */}
        <div className="flex items-center gap-4 mb-6">
          <Image
            src={user.picture}
            className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-indigo-500 shadow-lg"
          />
          <div>
            <p className="font-bold text-lg md:text-xl text-white">
              {user.name} {user.surname}
            </p>
            <p className="text-sm md:text-base text-gray-400">@{user.login}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-gray-700 pt-4 mt-4">
          {/* Like */}
          <motion.button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-300 ${
              isLiked
                ? "text-red-500 bg-red-500/20 shadow-md"
                : "text-gray-400 hover:text-pink-500 hover:bg-pink-500/20 shadow-sm"
            }`}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Heart className={`w-6 h-6 ${isLiked ? "fill-red-500" : ""}`} />
            <span className="text-sm md:text-base font-medium">{like}</span>
          </motion.button>

          {/* Comment */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={`/profile/add/comment/${post.id}`}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl text-gray-400 hover:text-indigo-400 hover:bg-indigo-500/20 transition shadow-sm"
            >
              <MessageSquare className="w-6 h-6" />
              <span className="text-sm md:text-base font-medium">
                {post.comments.length}
              </span>
            </Link>
          </motion.div>

          {/* Delete */}
          <motion.button
            onClick={() => onHandleDelete(post.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl text-gray-400 hover:text-red-500 hover:bg-red-500/20 transition shadow-sm"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
          >
            <Trash2 className="w-6 h-6" />
            <span className="text-sm md:text-base font-medium">Delete</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
