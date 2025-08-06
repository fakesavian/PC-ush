import { useEffect, useState } from "react";
import {
  getCurrentPetEvolution,
  PetEvolution,
} from "@/polymet/data/stage-tracks-data";

interface ProgressCelebrationProps {
  isVisible: boolean;
  progress: number;
  stageColor: string;
  onComplete: () => void;
}

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocity: { x: number; y: number };
}

export default function ProgressCelebration({
  isVisible,
  progress,
  stageColor,
  onComplete,
}: ProgressCelebrationProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [showPetGrowth, setShowPetGrowth] = useState(false);
  const currentPet = getCurrentPetEvolution(progress);

  useEffect(() => {
    if (!isVisible) return;

    // Generate confetti pieces
    const pieces: ConfettiPiece[] = [];
    const colors = [stageColor, "#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1"];

    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        velocity: {
          x: (Math.random() - 0.5) * 4,
          y: Math.random() * 3 + 2,
        },
      });
    }

    setConfetti(pieces);
    setShowPetGrowth(true);

    // Animate confetti
    const animateConfetti = () => {
      setConfetti((prevConfetti) =>
        prevConfetti
          .map((piece) => ({
            ...piece,
            x: piece.x + piece.velocity.x,
            y: piece.y + piece.velocity.y,
            rotation: piece.rotation + 5,
            velocity: {
              ...piece.velocity,
              y: piece.velocity.y + 0.1, // gravity
            },
          }))
          .filter((piece) => piece.y < window.innerHeight + 50)
      );
    };

    const interval = setInterval(animateConfetti, 16);

    // Auto-complete after animation
    const timeout = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isVisible, stageColor, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 opacity-80"
          style={{
            left: piece.x,
            top: piece.y,
            backgroundColor: piece.color,
            width: piece.size,
            height: piece.size,
            transform: `rotate(${piece.rotation}deg)`,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
          }}
        />
      ))}

      {/* Pet Growth Animation */}
      {showPetGrowth && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="bg-white rounded-2xl p-8 shadow-2xl border-4 animate-bounce"
            style={{ borderColor: stageColor }}
          >
            <div className="text-center space-y-4">
              <div className="text-6xl animate-pulse">{currentPet.emoji}</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {currentPet.name} Evolved!
                </h3>
                <p className="text-sm text-gray-600 max-w-xs">
                  {currentPet.description}
                </p>
              </div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold text-sm"
                style={{ backgroundColor: stageColor }}
              >
                <span>Progress: {progress}%</span>
                <div className="w-2 h-2 bg-white rounded-full animate-ping" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
