import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "sonner";
import {
  STAGE_TRACKS_DATA,
  getOverallProgress,
  getCurrentPetEvolution,
} from "@/polymet/data/stage-tracks-data";
import { REFLECTION_ENTRIES } from "@/polymet/data/reflection-entries";

// Interfaces
interface GrowthMetrics {
  streak: number; // days
  reflections: number; // total
  stagesCompleted: number; // 0-5
  habitsFulfilled: number; // weekly %
  lastActivity: Date | null;
  growthScore: number; // 0-100
}

type VisualState = "seed" | "sprout" | "bud" | "bloom" | "wilted";
type AnimationState = "idle" | "spark" | "wilt";
type Size = "sm" | "md" | "lg";

interface GrowthVisualProps {
  size?: Size;
  className?: string;
  onClick?: () => void;
}

// Custom hooks
const useGrowthMetrics = (): GrowthMetrics => {
  return useMemo(() => {
    const overallProgress = getOverallProgress();
    const completedStages = STAGE_TRACKS_DATA.filter(
      (stage) => stage.completedAt
    ).length;

    // Calculate reflection streak
    const sortedReflections = REFLECTION_ENTRIES.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    let streak = 0;
    let currentDate = new Date();

    for (const reflection of sortedReflections) {
      const reflectionDate = new Date(reflection.createdAt);
      const daysDiff = Math.floor(
        (currentDate.getTime() - reflectionDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      if (daysDiff <= streak + 1) {
        streak++;
        currentDate = reflectionDate;
      } else {
        break;
      }
    }

    // Calculate habits fulfilled (based on stage progress)
    const activeStages = STAGE_TRACKS_DATA.filter((stage) => stage.isUnlocked);
    const avgStageProgress =
      activeStages.length > 0
        ? activeStages.reduce((sum, stage) => sum + stage.progress, 0) /
          activeStages.length
        : 0;

    const lastActivity =
      sortedReflections.length > 0
        ? new Date(sortedReflections[0].createdAt)
        : null;

    // Growth score calculation
    const growthScore = Math.min(
      100,
      Math.round(
        overallProgress * 0.4 +
          Math.min(streak * 5, 30) +
          avgStageProgress * 0.3 +
          REFLECTION_ENTRIES.length * 2
      )
    );

    return {
      streak,
      reflections: REFLECTION_ENTRIES.length,
      stagesCompleted: completedStages,
      habitsFulfilled: avgStageProgress,
      lastActivity,
      growthScore,
    };
  }, []);
};

const useAnimationState = (metrics: GrowthMetrics) => {
  const [animationState, setAnimationState] = useState<AnimationState>("idle");
  const [lastScore, setLastScore] = useState(metrics.growthScore);

  useEffect(() => {
    // Check for level up (spark animation)
    if (
      metrics.growthScore > lastScore &&
      metrics.growthScore - lastScore >= 5
    ) {
      setAnimationState("spark");
      setTimeout(() => setAnimationState("idle"), 200);
    }

    // Check for inactivity (wilt animation)
    if (metrics.lastActivity) {
      const daysSinceActivity = Math.floor(
        (Date.now() - metrics.lastActivity.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceActivity >= 3 && animationState !== "wilt") {
        setAnimationState("wilt");
        setTimeout(() => setAnimationState("idle"), 1000);
      }
    }

    setLastScore(metrics.growthScore);
  }, [metrics.growthScore, metrics.lastActivity, lastScore, animationState]);

  return animationState;
};

const getVisualState = (score: number): VisualState => {
  if (score >= 80) return "bloom";
  if (score >= 50) return "bud";
  if (score >= 20) return "sprout";
  return "seed";
};

const getSizeConfig = (size: Size) => {
  const configs = {
    sm: { width: 40, height: 40, strokeWidth: 1.5 },
    md: { width: 60, height: 60, strokeWidth: 2 },
    lg: { width: 80, height: 80, strokeWidth: 2.5 },
  };
  return configs[size];
};

// Memoized SVG components
const SeedSVG = ({ size, isWilted }: { size: number; isWilted: boolean }) => (
  <g>
    <circle
      cx={size / 2}
      cy={size / 2 + 5}
      r={size / 8}
      fill={isWilted ? "#8B5CF6" : "#10B981"}
      opacity={isWilted ? 0.6 : 1}
    />

    <path
      d={`M${size / 2} ${size / 2 + 5} Q${size / 2 + 3} ${size / 2 - 2} ${size / 2 + 1} ${size / 2 - 8}`}
      stroke={isWilted ? "#A855F7" : "#059669"}
      strokeWidth="1.5"
      fill="none"
      opacity={isWilted ? 0.6 : 1}
    />
  </g>
);

const SproutSVG = ({ size, isWilted }: { size: number; isWilted: boolean }) => (
  <g>
    <rect
      x={size / 2 - 1}
      y={size / 2}
      width="2"
      height={size / 4}
      fill={isWilted ? "#8B5CF6" : "#10B981"}
      opacity={isWilted ? 0.6 : 1}
    />

    <ellipse
      cx={size / 2 - 4}
      cy={size / 2 - 2}
      rx="3"
      ry="6"
      fill={isWilted ? "#A855F7" : "#34D399"}
      opacity={isWilted ? 0.6 : 1}
    />

    <ellipse
      cx={size / 2 + 4}
      cy={size / 2 - 2}
      rx="3"
      ry="6"
      fill={isWilted ? "#A855F7" : "#34D399"}
      opacity={isWilted ? 0.6 : 1}
    />
  </g>
);

const BudSVG = ({ size, isWilted }: { size: number; isWilted: boolean }) => (
  <g>
    <rect
      x={size / 2 - 1}
      y={size / 2 + 5}
      width="2"
      height={size / 3}
      fill={isWilted ? "#8B5CF6" : "#059669"}
      opacity={isWilted ? 0.6 : 1}
    />

    <circle
      cx={size / 2}
      cy={size / 2 - 5}
      r={size / 6}
      fill={isWilted ? "#C084FC" : "#F59E0B"}
      opacity={isWilted ? 0.6 : 1}
    />

    <path
      d={`M${size / 2 - 8} ${size / 2} Q${size / 2 - 12} ${size / 2 - 8} ${size / 2 - 6} ${size / 2 - 12}`}
      stroke={isWilted ? "#A855F7" : "#10B981"}
      strokeWidth="2"
      fill="none"
      opacity={isWilted ? 0.6 : 1}
    />

    <path
      d={`M${size / 2 + 8} ${size / 2} Q${size / 2 + 12} ${size / 2 - 8} ${size / 2 + 6} ${size / 2 - 12}`}
      stroke={isWilted ? "#A855F7" : "#10B981"}
      strokeWidth="2"
      fill="none"
      opacity={isWilted ? 0.6 : 1}
    />
  </g>
);

const BloomSVG = ({ size, isWilted }: { size: number; isWilted: boolean }) => (
  <g>
    <rect
      x={size / 2 - 1}
      y={size / 2 + 8}
      width="2"
      height={size / 2.5}
      fill={isWilted ? "#8B5CF6" : "#059669"}
      opacity={isWilted ? 0.6 : 1}
    />

    {/* Petals */}
    {[0, 72, 144, 216, 288].map((angle, i) => (
      <ellipse
        key={i}
        cx={size / 2 + Math.cos((angle * Math.PI) / 180) * 8}
        cy={size / 2 - 5 + Math.sin((angle * Math.PI) / 180) * 8}
        rx="4"
        ry="8"
        fill={isWilted ? "#C084FC" : "#F472B6"}
        opacity={isWilted ? 0.6 : 1}
        transform={`rotate(${angle} ${size / 2} ${size / 2 - 5})`}
      />
    ))}
    <circle
      cx={size / 2}
      cy={size / 2 - 5}
      r={size / 12}
      fill={isWilted ? "#FDE047" : "#FEF08A"}
      opacity={isWilted ? 0.6 : 1}
    />

    {/* Leaves */}
    <path
      d={`M${size / 2 - 10} ${size / 2 + 2} Q${size / 2 - 15} ${size / 2 - 5} ${size / 2 - 8} ${size / 2 - 10}`}
      stroke={isWilted ? "#A855F7" : "#10B981"}
      strokeWidth="2"
      fill={isWilted ? "#C084FC" : "#34D399"}
      opacity={isWilted ? 0.6 : 1}
    />

    <path
      d={`M${size / 2 + 10} ${size / 2 + 2} Q${size / 2 + 15} ${size / 2 - 5} ${size / 2 + 8} ${size / 2 - 10}`}
      stroke={isWilted ? "#A855F7" : "#10B981"}
      strokeWidth="2"
      fill={isWilted ? "#C084FC" : "#34D399"}
      opacity={isWilted ? 0.6 : 1}
    />
  </g>
);

export default function GrowthVisual({
  size = "md",
  className = "",
  onClick,
}: GrowthVisualProps) {
  const metrics = useGrowthMetrics();
  const animationState = useAnimationState(metrics);
  const visualState = getVisualState(metrics.growthScore);
  const sizeConfig = getSizeConfig(size);
  const isWilted =
    animationState === "wilt" ||
    (metrics.lastActivity &&
      Math.floor(
        (Date.now() - metrics.lastActivity.getTime()) / (1000 * 60 * 60 * 24)
      ) >= 3);

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    } else {
      const messages = {
        seed: `🌱 Just getting started! You have ${metrics.reflections} reflections.`,
        sprout: `🌿 Growing strong! ${metrics.streak}-day streak going!`,
        bud: `🌺 Beautiful progress! ${metrics.stagesCompleted} stages completed.`,
        bloom: `🌸 You're flourishing! ${metrics.growthScore}% growth achieved!`,
        wilted: `💧 Your plant needs attention. Time for some reflection!`,
      };

      toast.success(messages[isWilted ? "wilted" : visualState]);
    }
  }, [onClick, metrics, visualState, isWilted]);

  const renderPlant = useMemo(() => {
    const components = {
      seed: SeedSVG,
      sprout: SproutSVG,
      bud: BudSVG,
      bloom: BloomSVG,
    };

    const Component = components[visualState];
    return <Component size={sizeConfig.width} isWilted={isWilted} />;
  }, [visualState, sizeConfig.width, isWilted]);

  return (
    <div
      className={`relative cursor-pointer transition-transform hover:scale-110 ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Growth companion: ${visualState} stage, ${metrics.growthScore}% progress`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <svg
        width={sizeConfig.width}
        height={sizeConfig.height}
        viewBox={`0 0 ${sizeConfig.width} ${sizeConfig.height}`}
        className={`transition-all duration-300 ${
          animationState === "spark" ? "drop-shadow-lg filter" : ""
        }`}
        style={{
          filter:
            animationState === "spark"
              ? "drop-shadow(0 0 8px rgba(34, 197, 94, 0.6))"
              : undefined,
        }}
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient
            id="growth-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#a3e635" />

            <stop offset="50%" stopColor="#10b981" />

            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />

            <feMerge>
              <feMergeNode in="coloredBlur" />

              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {renderPlant}

        {/* Spark animation overlay */}
        {animationState === "spark" && (
          <g className="animate-ping">
            <circle
              cx={sizeConfig.width / 2}
              cy={sizeConfig.height / 2 - 5}
              r="3"
              fill="#FEF08A"
              opacity="0.8"
            />
          </g>
        )}

        {/* Growth particles for bloom state */}
        {visualState === "bloom" && !isWilted && (
          <g>
            {[...Array(3)].map((_, i) => (
              <circle
                key={i}
                cx={sizeConfig.width / 2 + (i - 1) * 15}
                cy={sizeConfig.height / 4 + Math.sin(Date.now() / 1000 + i) * 3}
                r="1"
                fill="#FEF08A"
                opacity="0.6"
                className="animate-pulse"
              />
            ))}
          </g>
        )}
      </svg>

      {/* Progress indicator */}
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-lime-400 via-emerald-500 to-teal-500 transition-all duration-500"
          style={{ width: `${metrics.growthScore}%` }}
        />
      </div>
    </div>
  );
}
