import { useRef, useState } from "react";
import { Axios } from "../../lib/api";
import type { IContext, IResponse } from "../../types";
import { useOutletContext } from "react-router-dom";
import defPic from "../../../public/def.jpg";
import { motion } from "framer-motion";

export const ImagePicker = () => {
  const pickInp = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState("");
  const { account, setAccount } = useOutletContext<IContext>();

  const handlePreview = () => {
    if (pickInp.current?.files) {
      const file = pickInp.current.files[0];
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (pickInp.current?.files) {
      const file = pickInp.current.files[0];
      const form = new FormData();
      form.append("picture", file);
      Axios.patch<IResponse<string>>("/profile/upload", form).then(
        (response) => {
          setAccount({
            ...account,
            picture: response.data.payload,
          });
          // navigate("/profile");
          setPreview('');
        }
      );
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        onChange={handlePreview}
        className="hidden"
        type="file"
        ref={pickInp}
      />

      <motion.img
        onClick={() => pickInp.current?.click()}
        src={
          preview
            ? preview
            : account.picture
            ? "http://localhost:4002" + account.picture
            : defPic
        }
        alt="profile"
        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover cursor-pointer border-4 border-gray-800 shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 hover:ring-4 hover:ring-indigo-500"
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300 }}
      />

      {preview && (
        <motion.div
          className="flex gap-4 mt-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.button
            onClick={handleUpload}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Upload
          </motion.button>

          <motion.button
            onClick={() => setPreview("")}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-xl shadow-md hover:bg-red-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};
