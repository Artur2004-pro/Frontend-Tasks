import { useEffect, useState } from "react";
import { PostItem } from "./post-item";
import { Link, useOutletContext } from "react-router-dom";
import type { IPost, IResponse, IContext } from "../../types";
import { Axios } from "../../lib/api";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

export const Posts = () => {
  const { account } = useOutletContext<IContext>();
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    handleGetPosts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      Axios.delete(`/posts/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleGetPosts = async () => {
    const { data } = await Axios.get<IResponse<IPost[]>>("/posts");
    setPosts(data.payload);
  };

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-4 md:gap-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">
          Posts
        </h1>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/profile/add"
            className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-2xl shadow-lg font-semibold transition transform"
          >
            <Plus className="w-5 h-5" />
            Add Post
          </Link>
        </motion.div>
      </motion.div>

      {/* Posts List */}
      <motion.div
        className="max-w-5xl mx-auto flex flex-col gap-8"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {posts.length > 0 ? (
          posts.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <PostItem post={post} user={account} onHandleDelete={handleDelete} />
            </motion.div>
          ))
        ) : (
          <motion.div
            className="text-center text-gray-400 text-lg p-6 bg-gray-800 rounded-2xl shadow-inner animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No posts yet 😔
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};
