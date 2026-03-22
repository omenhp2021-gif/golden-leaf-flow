import { useEffect, useState } from "react";

interface FallingLeaf {
  id: number;
  startX: number;
  duration: number;
  delay: number;
  size: number;
  rotation: number;
  swing: number;
}

export const TeaLeafRain = () => {
  const [leaves, setLeaves] = useState<FallingLeaf[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Generate falling tea leaves
    const newLeaves: FallingLeaf[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      duration: 8 + Math.random() * 6,
      delay: Math.random() * 8,
      size: 0.6 + Math.random() * 0.7,
      rotation: Math.random() * 360,
      swing: 20 + Math.random() * 40,
    }));
    setLeaves(newLeaves);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Increase leaf count based on scroll to create more rain effect
  const activeLeaves = Math.min(leaves.length, Math.floor(8 + scrollY / 200));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {leaves.slice(0, activeLeaves).map((leaf) => (
        <div
          key={leaf.id}
          className="absolute -top-16 will-change-transform"
          style={{
            left: `${leaf.startX}%`,
            animation: `fall ${leaf.duration}s linear infinite, swing ${leaf.duration * 0.5}s ease-in-out infinite`,
            animationDelay: `${leaf.delay}s`,
            transform: `scale(${leaf.size}) rotate(${leaf.rotation}deg)`,
            opacity: 0.4 + (scrollY / 2000) * 0.3,
          }}
        >
          <svg
            width="20"
            height="28"
            viewBox="0 0 20 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-md"
          >
            <path
              d="M10 1C10 1 3 6 3 13C3 16 5 19 10 23C15 19 17 16 17 13C17 6 10 1 10 1Z"
              fill="hsl(var(--tea-green))"
              fillOpacity="0.7"
            />
            <path
              d="M10 1C10 1 7 4 7 9C7 11 8 13 10 15"
              stroke="hsl(var(--tea-green))"
              strokeWidth="0.5"
              strokeOpacity="0.9"
            />
          </svg>
        </div>
      ))}

      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(calc(100vh + 100px)) rotate(360deg);
          }
        }

        @keyframes swing {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(${leaves[0]?.swing || 30}px);
          }
        }
      `}</style>
    </div>
  );
};
