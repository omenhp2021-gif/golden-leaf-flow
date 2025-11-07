import { ReactNode, useState } from "react";

interface ProductCardWithLeavesProps {
  children: ReactNode;
  index: number;
}

export const ProductCardWithLeaves = ({ children, index }: ProductCardWithLeavesProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const leaves = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: (i * 360) / 8,
    delay: i * 0.05,
    distance: 60 + Math.random() * 40,
  }));

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Swirling Tea Leaves */}
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className={`absolute top-1/2 left-1/2 pointer-events-none transition-all duration-700 ease-out ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
          style={{
            transform: isHovered
              ? `translate(-50%, -50%) rotate(${leaf.angle}deg) translateY(-${leaf.distance}px) rotate(${leaf.angle * 2}deg)`
              : "translate(-50%, -50%) rotate(0deg) translateY(0) rotate(0deg)",
            transitionDelay: `${leaf.delay}s`,
          }}
        >
          <svg
            width="16"
            height="22"
            viewBox="0 0 16 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg animate-pulse"
            style={{ animationDelay: `${leaf.delay}s` }}
          >
            <path
              d="M8 1C8 1 2 5 2 10C2 12.5 4 15 8 18C12 15 14 12.5 14 10C14 5 8 1 8 1Z"
              fill="hsl(var(--tea-green))"
              fillOpacity="0.8"
            />
            <path
              d="M8 1C8 1 5 3.5 5 7C5 8.5 6 10 8 11.5"
              stroke="hsl(var(--tea-green))"
              strokeWidth="0.5"
              strokeOpacity="0.9"
            />
          </svg>
        </div>
      ))}

      {/* Product Card */}
      {children}
    </div>
  );
};
