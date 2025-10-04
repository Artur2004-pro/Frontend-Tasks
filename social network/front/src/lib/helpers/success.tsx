import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
        navigate("/profile")
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 text-center max-w-md w-full">
        <FaCheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4 animate-bounce" />
        <h1 className="text-3xl font-bold text-white mb-2">Success!</h1>
        <p className="text-gray-400 mb-6">
          Your action was completed successfully. Redirecting...
        </p>
        <div className="w-full bg-green-600 h-2 rounded-full overflow-hidden">
          <div className="h-2 bg-green-400 animate-[progress_1.5s_linear_forwards]" />
        </div>
      </div>
    </div>
  );
};
