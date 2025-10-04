import { useEffect, useState } from "react";
import { Axios } from "../../lib/api";
import type { IContext, IReqUser, IResponse, User } from "../../types";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Image } from "../../lib/helpers/image";
import { motion } from "framer-motion";

export const Followers = () => {
  const navigate = useNavigate();
  const { setReqCount, reqCount } = useOutletContext<IContext>();
  const [followers, setFollowers] = useState<User[]>([]);
  const [requestes, setRequestes] = useState<IReqUser[]>([]);

  useEffect(() => {
    getFollowers();
    getRequestes();
  }, []);

  const getRequestes = async () => {
    try {
      const { data } = await Axios.get<IResponse<IReqUser[]>>("/requests");
      setRequestes(data.payload);
    } catch (error) {
      console.error(error);
    }
  };

  const getFollowers = async () => {
    try {
      const { data } = await Axios.get<IResponse<User[]>>("/followers");
      setFollowers(data.payload);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAccept = async (id: number) => {
    try {
      await Axios.patch(`/requests/accept/${id}`);
      setReqCount(reqCount - 1);
      const i = requestes.findIndex((u) => u.id == id);
      setFollowers([...followers, requestes[i].user]);
      setRequestes(requestes.filter((req) => req.id != id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecline = async (id: number) => {
    try {
      await Axios.patch(`/requests/decline/${id}`);
      setReqCount(reqCount - 1);
      setRequestes(requestes.filter((r) => r.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetAccount = (id: number) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black p-10 flex flex-col items-center">
      {/* Requests Section */}
      {requestes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl mx-auto mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Requests</h2>
          <div className="flex flex-col gap-5">
            {requestes.map((req, idx) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-4 p-5 bg-gray-800/90 rounded-2xl shadow-lg cursor-pointer 
                           hover:bg-gray-700 transition-all duration-300"
              >
                <Image
                  src={req.user.picture || ""}
                  alt={`${req.user.name} ${req.user.surname}`}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-600 shadow-md"
                />
                <p className="text-white text-lg font-semibold flex-1">
                  {req.user.name} {req.user.surname}
                </p>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleAccept(req.id)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium shadow-md"
                >
                  Accept
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDecline(req.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium shadow-md"
                >
                  Decline
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-white mb-6"
      >
        Followers
      </motion.h2>

      {followers.length > 0 ? (
        <div className="w-full max-w-2xl flex flex-col gap-4">
          {followers.map((user, idx) => (
            <motion.div
              key={user.id}
              onClick={() => handleGetAccount(user.id)}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-4 p-5 bg-gray-800/90 rounded-2xl shadow-lg cursor-pointer 
                         hover:bg-gray-700 transition-all duration-300"
            >
              <Image
                src={user.picture || ""}
                alt={`${user.name} ${user.surname}`}
                className="w-14 h-14 rounded-full object-cover border-2 border-gray-600 shadow-md"
              />
              <p className="text-white text-lg font-semibold">
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
          No Followers
        </motion.p>
      )}
    </div>
  );
};
