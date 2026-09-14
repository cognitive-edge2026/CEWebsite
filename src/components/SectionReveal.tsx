import React, { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
  id?: string;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  className = "",
  id,
}) => {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
};
