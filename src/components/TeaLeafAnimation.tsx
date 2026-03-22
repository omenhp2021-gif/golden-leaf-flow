import { useEffect, useRef, useState } from "react";

interface Leaf {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  duration: number;
  delay: number;
}

export const TeaLeafAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate random tea leaves
    const newLeaves: Leaf[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 5,
    }));
    setLeaves(newLeaves);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden opacity-30"
    >
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute transition-transform duration-1000 ease-out"
          style={{
            left: `${leaf.x}%`,
            top: `${leaf.y}%`,
            transform: `translate(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * 20}px) rotate(${leaf.rotation}deg) scale(${leaf.scale})`,
            animation: `float ${leaf.duration}s infinite ease-in-out`,
            animationDelay: `${leaf.delay}s`,
          }}
        >
          <svg
            width="24"
            height="32"
            viewBox="0 0 24 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-sm"
          >
            <path
              d="M12 2C12 2 4 8 4 16C4 20 6 24 12 28C18 24 20 20 20 16C20 8 12 2 12 2Z"
              fill="hsl(var(--tea-green))"
              fillOpacity="0.6"
            />
            <path
              d="M12 2C12 2 8 6 8 12C8 14 9 16 12 18"
              stroke="hsl(var(--tea-green))"
              strokeWidth="0.5"
              strokeOpacity="0.8"
            />
          </svg>
        </div>
      ))}
      
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) rotate(5deg);
          }
          50% {
            transform: translateY(-8px) rotate(-3deg);
          }
          75% {
            transform: translateY(-20px) rotate(4deg);
          }
        }
      `}</style>
    </div>
  );
};
