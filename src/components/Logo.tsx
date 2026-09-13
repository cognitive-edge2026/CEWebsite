import React from "react";
import logoImg from "../assets/images/cognitive_edge_logo.png";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "auto" | "light" | "dark";
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
}) => {
  const heightClasses = {
    sm: "h-11 sm:h-12 max-w-[210px]",
    md: "h-14 sm:h-16 max-w-[280px]",
    lg: "h-20 sm:h-24 max-w-[360px]",
  };

  return (
    <div
      id="cognitive-edge-logo"
      className={`inline-flex items-center select-none ${className}`}
    >
      <div className="relative group transition-transform duration-200">
        <img
          src={logoImg}
          alt="Cognitive Edge - Intelligence Beyond Reality"
          className={`w-auto ${heightClasses[size]} object-contain drop-shadow-xs dark:brightness-105`}
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};

