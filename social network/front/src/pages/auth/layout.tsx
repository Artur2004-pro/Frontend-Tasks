import { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import type { IResponse, IUser, IReqUser } from "../../types";
import { Axios } from "../../lib/api";
import { motion } from "framer-motion";

export const Layout = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState<IUser | null>(null);
  const [reqCount, setReqCount] = useState<number>(0);

  useEffect(() => {
    Axios.get<IResponse>("/verify")
      .then((response) => {
        setAccount(response.data.payload as IUser);
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });

    handleRequests();
  }, [navigate]);

  const handleRequests = async () => {
    const { data } = await Axios.get<IResponse<IReqUser[]>>("requests");
    setReqCount(data.payload.length);
  };

  // Variants for navbar links animation
  const navVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    account && (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
        {/* Navbar */}
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
          className="sticky top-0 z-50 bg-gray-800/80 backdrop-blur-md px-10 py-5 flex gap-10 shadow-xl border-b border-gray-700"
        >
          {[
            { to: "", label: "Profile" },
            { to: "/profile/search", label: "Search" },
            { to: "/profile/posts", label: "Posts" },
            { to: "/profile/setings", label: "Settings" },
            { to: "/profile/followers", label: "Followers", badge: reqCount },
            { to: "/profile/following", label: "Following" },
          ].map(({ to, label, badge }, i) => (
            <motion.div
              key={to}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={navVariants}
            >
              <NavLink
                to={to}
                end
                className={({ isActive }) =>
                  `relative group text-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "text-indigo-400"
                      : "text-gray-300 hover:text-indigo-300"
                  }`
                }
              >
                {label}
                {/* underline animation */}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>

                {/* badge for requests */}
                {badge ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                      delay: 0.3,
                    }}
                    className="absolute -top-2 -right-3 bg-red-500 text-xs px-2 py-0.5 rounded-full shadow-md"
                  >
                    {badge}
                  </motion.span>
                ) : null}
              </NavLink>
            </motion.div>
          ))}
        </motion.nav>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 md:p-12"
        >
          <Outlet context={{ account, setAccount, reqCount, setReqCount }} />
        </motion.div>
      </div>
    )
  );
};
