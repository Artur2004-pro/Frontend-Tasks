import type { ImgHTMLAttributes } from "react";
import defImg from "../../../public/def.jpg";

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  size?: "sm" | "md" | "lg"; // փոքր, միջին, մեծ
  showStatus?: boolean;       // online indicator
};

export const Image: React.FC<ImageProps> = ({
  src,
  size = "md",
  showStatus = false,
  className = "",
  ...rest
}) => {
  src = src ? "http://localhost:4002" + src : defImg;

  // չափերը ըստ prop
  const sizeMap = {
    sm: "w-12 h-12",
    md: "w-24 h-24",
    lg: "w-48 h-48",
  };

  return (
    <div className="relative inline-block">
      <img
        src={src}
        alt=""
        {...rest}
        className={`${sizeMap[size]} rounded-full object-cover border-2 border-gray-700 shadow-lg transition-transform duration-500 hover:scale-105 ${className}`}
      />
      {showStatus && (
        <span className="absolute bottom-2 right-2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-400 ring-2 ring-gray-900 animate-pulse"></span>
      )}
    </div>
  );
};
