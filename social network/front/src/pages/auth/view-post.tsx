import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Axios } from "../../lib/api";
import type { IContext, IPost, IResponse, Icom } from "../../types";
import { Image } from "../../lib/helpers/image";
import { Trash2, Heart } from "lucide-react";
import { motion } from "framer-motion";

export const ViewPost = () => {
  const { account } = useOutletContext<IContext>();
  const { id } = useParams();
  const [text, setText] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const [post, setPost] = useState<IPost | null>(null);
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(true);

  useEffect(() => {
    getPost();
  }, [id]);

  const getPost = async () => {
    const { data } = await Axios.get<IResponse<IPost>>(`/posts/${id}`);
    setPost(data.payload);
    setLikes(data.payload.likes.length);
    setIsLiked(
      data.payload.likes.find((u) => u.id == account.id) ? true : false
    );
  };

  const handleAddCom = async () => {
    if (!text.length) {
      setErr("Please enter comment");
      return;
    }
    setErr("");
    const { data } = await Axios.post<IResponse<Icom>>(`posts/comment/${id}`, {
      text,
    });
    const com = {
      id: data.payload.id,
      content: data.payload.content,
      user: {
        id: data.payload.user.id,
        name: data.payload.user.name,
        picture: data.payload.user.picture,
        surname: data.payload.user.surname,
      },
    };
    if (post) setPost({ ...post, comments: [...post.comments, com] });
    setText("");
  };

  const handleDelete = async (cid: number) => {
    try {
      await Axios.delete(`/posts/comment/${cid}`);
      if (post) {
        setPost({
          ...post,
          comments: post.comments.filter((c) => c.id !== cid),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async (pid: number) => {
    try {
      const { data } = await Axios.post<IResponse<string>>(
        `/posts/react/${pid}`
      );
      if (data.payload == "liked") {
        setLikes(likes + 1);
        setIsLiked(true);
      } else {
        setLikes(likes - 1);
        setIsLiked(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Framer-motion variants for comments
  const commentsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="p-6 max-w-2xl mx-auto bg-gray-900 text-white rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {post && (
        <>
          <motion.h3
            className="text-2xl font-bold mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {post.title && post.title !== "undefined" && post.title}
          </motion.h3>

          <motion.img
            src={"http://localhost:4002" + post.picture}
            alt=""
            className="w-full rounded-xl shadow-lg mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Like Button */}
          <motion.button
            onClick={() => handleLike(post.id!)}
            className="flex items-center gap-2 mb-6"
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              className={`w-7 h-7 cursor-pointer transition-colors duration-300 ${
                isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
            <span className="text-gray-300">{likes}</span>
          </motion.button>

          {/* Comments */}
          {post.comments.length > 0 ? (
            <motion.div
              className="space-y-4"
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.1 }}
            >
              <h2 className="text-xl font-semibold mb-2">💬 Comments</h2>
              {post.comments.map((com) => (
                <motion.div
                  key={com.id}
                  className="flex items-start gap-3 bg-gray-800 p-3 rounded-lg shadow-md"
                  variants={commentsVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    src={com.user.picture}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <b className="block">{com.user.name}</b>
                    <p className="text-gray-300">{com.content}</p>
                  </div>
                  {com.user.id === account.id && (
                    <Trash2
                      onClick={() => handleDelete(com.id)}
                      className="text-red-400 cursor-pointer hover:text-red-600 transition"
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <p className="text-gray-500">No Comments</p>
          )}

          {/* Add Comment */}
          <motion.div
            className="mt-6 bg-gray-800 p-4 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-lg font-semibold mb-2">Add Comment</h3>
            {err.length > 0 && <p className="text-red-400 mb-2">{err}</p>}
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Write a comment..."
            />
            <button
              onClick={handleAddCom}
              className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-2 rounded-lg shadow-md"
            >
              Post Comment
            </button>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};
