import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { type IContext, type IComm, type IResponse } from "../../types";
import { Axios } from "../../lib/api";
import { Image } from "../../lib/helpers/image";
import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const PostComment = () => {
  const { id } = useParams();
  const [text, setText] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const [post, setPost] = useState<IComm | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    getPost();
  }, [id]);
  const { account } = useOutletContext<IContext>();
  const handleDelete = async (id: number) => {
    try {
      await Axios.delete(`/posts/comment/${id}`);
      if (post) {
        setPost({
          ...post,
          comments: post.comments.filter((com) => com.id !== id),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async () => {
    if (!text.trim().length) {
      setErr("Please add a comment 😅");
      return;
    }
    setErr("");
    try {
      const { data } = await Axios.post<IResponse<IComm["comments"][0]>>(
        `/posts/comment/${id}`,
        { text }
      );
      if (post) {
        setPost({ ...post, comments: [...post.comments, data.payload] });
      }
      setText("");
    } catch (e) {
      console.error(e);
      setErr("Something went wrong 😔");
    }
  };

  const getPost = async () => {
    const { data } = await Axios.get<IResponse<IComm>>(`/posts/${id}`);
    setPost(data.payload);
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {post ? (
        <motion.div
          className="bg-gray-800/90 backdrop-blur-lg border border-gray-700 rounded-3xl shadow-2xl w-full max-w-3xl p-8 md:p-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Post image */}
          <motion.img
            src={"http://localhost:4002" + post.picture}
            alt="Post cover"
            className="w-full rounded-2xl object-cover mb-8 shadow-xl"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          />

          {/* Error */}
          {err && (
            <motion.p
              className="text-red-400 text-base mb-4 font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {err}
            </motion.p>
          )}

          {/* Input */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <motion.input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-5 py-3 rounded-2xl bg-gray-900 text-white placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner text-lg transition"
              whileFocus={{ scale: 1.01 }}
            />
            <motion.button
              onClick={handleAdd}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-semibold shadow-lg"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
            >
              Add
            </motion.button>
          </div>

          {/* Comments */}
          <motion.div
            className="space-y-4 max-h-[60vh] overflow-y-auto pr-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <AnimatePresence>
              {post.comments.length > 0 ? (
                post.comments.map((com) => (
                  <motion.div
                    key={com.id}
                    className="flex items-start gap-4 bg-gray-700/60 p-4 rounded-2xl 
                               hover:bg-gray-700 transition-shadow shadow-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      onClick={() => navigate(`/profile/${com.user.id}`)}
                      src={com.user.picture}
                      alt={com.user.name}
                      size="md"
                      className="w-12 h-12 rounded-full object-cover border border-gray-600 shadow-md"
                    />
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-white">
                        {com.user.name} {com.user.surname}
                      </p>
                      {com.content !== "undefined" && (
                        <p className="text-gray-300 text-base">{com.content}</p>
                      )}
                    </div>
                    {account.id == com.user.id && (
                      <motion.button
                        onClick={() => handleDelete(com.id)}
                        className="text-red-400 hover:text-red-500 transition p-2 rounded-xl hover:bg-gray-700 shadow-sm"
                        title="Delete comment"
                        whileTap={{ scale: 0.85 }}
                      >
                        <Trash2 className="w-6 h-6" />
                      </motion.button>
                    )}
                  </motion.div>
                ))
              ) : (
                <motion.p
                  className="text-gray-400 text-center text-lg mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  No comments yet 😔
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="text-gray-400 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No content
        </motion.div>
      )}
    </motion.div>
  );
};
