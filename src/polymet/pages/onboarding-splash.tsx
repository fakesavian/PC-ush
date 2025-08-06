import React from "react";
import { Link } from "react-router-dom";
import GradientBackground from "@/polymet/components/gradient-background";
import AppButton from "@/polymet/components/app-button";
import TierCard from "@/polymet/components/tier-card";
import { ArrowRightIcon } from "lucide-react";

export default function OnboardingSplash() {
  return (
    <GradientBackground variant="blue" className="flex flex-col">
      {/* Hero Section */}
      <div className="mt-8 text-center">
        <div className="mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 p-5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-full w-full text-white"
          >
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">Pocket Coach</h1>
        <p className="mx-auto mt-3 max-w-xs text-gray-600">
          Your personal accountability partner for achieving your goals
        </p>
      </div>

      {/* Features */}
      <div className="mt-10 px-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur-sm">
            <div className="mb-2 rounded-full bg-sky-100 p-2 w-10 h-10 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-sky-600"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />

                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-900">
              Set Clear Goals
            </h3>
            <p className="mt-1 text-xs text-gray-600">
              Define actionable steps to achieve your dreams
            </p>
          </div>

          <div className="rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur-sm">
            <div className="mb-2 rounded-full bg-teal-100 p-2 w-10 h-10 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-teal-600"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-900">
              Stay Motivated
            </h3>
            <p className="mt-1 text-xs text-gray-600">
              Get daily reminders and encouragement
            </p>
          </div>

          <div className="rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur-sm">
            <div className="mb-2 rounded-full bg-amber-100 p-2 w-10 h-10 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-amber-600"
              >
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-900">
              Financial Stake
            </h3>
            <p className="mt-1 text-xs text-gray-600">
              Put money on the line to ensure commitment
            </p>
          </div>

          <div className="rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur-sm">
            <div className="mb-2 rounded-full bg-purple-100 p-2 w-10 h-10 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-purple-600"
              >
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-900">Earn Rewards</h3>
            <p className="mt-1 text-xs text-gray-600">
              Unlock badges and level up as you progress
            </p>
          </div>
        </div>
      </div>

      {/* Tier Selection */}
      <div className="mt-10 px-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Choose Your Plan
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Select the level of accountability you need
        </p>

        <div className="mt-4 space-y-4">
          <TierCard
            title="Starter"
            description="Basic accountability"
            price="$5/week"
            features={[
              "Weekly check-ins",
              "Basic goal tracking",
              "Community support",
            ]}
          />

          <TierCard
            title="Pro Coach"
            description="Serious commitment"
            price="$15/week"
            features={[
              "Daily check-ins",
              "Advanced goal tracking",
              "Personal coach",
              "Priority support",
            ]}
            recommended={true}
          />
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="mt-auto px-4 py-6 space-y-3">
        <Link to="/gps-audit">
          <AppButton
            variant="primary"
            fullWidth
            icon={<ArrowRightIcon size={18} />}
            iconPosition="right"
          >
            Start GPS Audit
          </AppButton>
        </Link>

        <Link to="/goal-creation">
          <AppButton variant="outline" fullWidth className="bg-white/50">
            Skip to Goal Creation
          </AppButton>
        </Link>
      </div>
    </GradientBackground>
  );
}
