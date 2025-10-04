import { useRef, useState } from "react";
import defPostImg from "../../../public/default-post.png";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../lib/api";
import type { IResponse, IPost } from "../../types";
import { motion } from "framer-motion";

export const AddPost = () => {
  const pickInp = useRef<HTMLInputElement | null>(null);
  const [content, setContent] = useState<string>("");
  const [err, setErr] = useState<string>("");
  const [fErr, setFErr] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const navigate = useNavigate();

  const handlePreview = () => {
    if (pickInp.current?.files && pickInp.current.files.length > 0) {
      const file = pickInp.current.files[0];
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const verify = () => {
    let valid = true;
    if (!content.trim()) {
      setErr("Enter Post Description!");
      valid = false;
    }
    if (!pickInp.current?.files || pickInp.current.files.length === 0) {
      setFErr("Upload File!");
      valid = false;
    }
    return valid;
  };

  const handleSave = async () => {
    if (!verify()) return;
    setErr("");
    setFErr("");

    if (pickInp.current?.files && pickInp.current.files.length > 0) {
      const file = pickInp.current.files[0];
      const form = new FormData();
      form.append("photo", file);
      form.append("content", content);

      try {
        await Axios.post<IResponse<IPost>>("/posts", form);
        navigate("/profile/posts");
      } catch (e: any) {
        setFErr(e?.response?.data?.message || "Upload failed");
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full max-w-4xl bg-gray-800/90 backdrop-blur-lg border border-gray-700 rounded-3xl shadow-2xl overflow-hidden"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        whileHover={{ scale: 1.01 }}
      >
        <div className="p-8 md:p-12">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Add Post
          </motion.h1>

          <input
            onChange={handlePreview}
            ref={pickInp}
            className="hidden"
            type="file"
            accept="image/*"
          />

          <motion.div
            className="flex flex-col md:flex-row items-start md:items-center gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {/* Image Picker */}
            <motion.button
              type="button"
              onClick={() => pickInp.current?.click()}
              className="group relative w-full md:w-64 h-64 md:h-72 rounded-3xl overflow-hidden border-2 border-dashed border-gray-600 hover:border-indigo-500 shadow-2xl"
              aria-label="Upload post image"
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <img
                src={preview ? preview : defPostImg}
                alt="Post preview"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end justify-center p-4 pointer-events-none">
                <span className="text-sm md:text-base text-gray-300 bg-black/40 px-3 py-1 rounded-md">
                  Click to select image
                </span>
              </div>
            </motion.button>

            {/* Description + Buttons */}
            <motion.div
              className="flex-1 w-full flex flex-col"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <label className="block text-base md:text-lg text-gray-300 mb-3">
                Description
              </label>
              <motion.textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="w-full resize-none bg-gray-900 text-gray-100 placeholder-gray-500 border border-gray-700 rounded-2xl p-5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-inner text-lg"
                placeholder="Write something about your post..."
                whileFocus={{ scale: 1.01 }}
              />

              {/* Error messages */}
              <div className="mt-5 flex flex-col gap-3">
                {fErr && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-base text-red-400 bg-red-950/20 border border-red-700 rounded-2xl px-5 py-3"
                  >
                    {fErr}
                  </motion.div>
                )}
                {err && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-base text-yellow-300 bg-yellow-950/10 border border-yellow-800 rounded-2xl px-5 py-3"
                  >
                    {err}
                  </motion.div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap gap-5">
                <motion.button
                  onClick={handleSave}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-3xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-2xl transition text-lg"
                >
                  Save
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setPreview("");
                    if (pickInp.current) pickInp.current.value = "";
                    setContent("");
                    setErr("");
                    setFErr("");
                  }}
                  className="px-7 py-4 rounded-3xl border border-gray-600 text-gray-200 hover:bg-gray-800 transition shadow-lg text-lg"
                >
                  Reset
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          <motion.p
            className="mt-8 text-sm md:text-base text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Supported formats: JPG, PNG. Max file size depends on server.
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};
