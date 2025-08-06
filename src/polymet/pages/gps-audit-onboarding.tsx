import React, { useState } from "react";
import { Link } from "react-router-dom";
import GradientBackground from "@/polymet/components/gradient-background";
import AppButton from "@/polymet/components/app-button";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "lucide-react";

interface AuditQuestion {
  id: string;
  title: string;
  placeholder: string;
  icon: React.ReactNode;
}

const auditQuestions: AuditQuestion[] = [
  {
    id: "current-state",
    title: "Where are you right now?",
    placeholder:
      "Describe your current situation, habits, and mindset. Be honest about where you're starting from...",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-5 h-5"
      >
        <circle cx="12" cy="12" r="10" />

        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: "desired-destination",
    title: "Where do you want to be?",
    placeholder:
      "Paint a vivid picture of your ideal future. What does success look like to you?",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-5 h-5"
      >
        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
      </svg>
    ),
  },
  {
    id: "obstacles",
    title: "What's holding you back?",
    placeholder:
      "Identify the barriers, fears, and challenges that have prevented you from reaching your goals...",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-5 h-5"
      >
        <path d="M12 9v4" />

        <path d="m12 17 .01 0" />

        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
      </svg>
    ),
  },
  {
    id: "commitment-level",
    title: "How committed are you?",
    placeholder:
      "Rate your commitment level and explain what you're willing to sacrifice or change to achieve your goals...",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-5 h-5"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

export default function GpsAuditOnboarding() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [currentStep] = useState(1);
  const totalSteps = 4;

  const handleCardToggle = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleResponseChange = (questionId: string, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const completedResponses = Object.keys(responses).filter(
    (key) => responses[key].trim().length > 0
  ).length;
  const progressPercentage = (completedResponses / auditQuestions.length) * 100;

  return (
    <GradientBackground variant="blue" className="flex flex-col min-h-full">
      {/* Sticky Progress Bar */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200/50 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500">
            {completedResponses}/{auditQuestions.length} completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-sky-500 to-indigo-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
          Start Your Journey: The GPS Audit
        </h1>
        <p className="mt-2 text-gray-600 leading-relaxed">
          Before we map your path to success, let's understand where you are and
          where you want to go.
        </p>
      </div>

      {/* Audit Questions */}
      <div className="flex-1 px-4 space-y-3">
        {auditQuestions.map((question, index) => {
          const isExpanded = expandedCard === question.id;
          const hasResponse = responses[question.id]?.trim().length > 0;

          return (
            <div
              key={question.id}
              className={`bg-white/80 backdrop-blur-sm rounded-xl border transition-all duration-300 ${
                isExpanded
                  ? "border-sky-300 shadow-lg"
                  : hasResponse
                    ? "border-green-200 shadow-sm"
                    : "border-gray-200 shadow-sm hover:border-gray-300"
              }`}
            >
              <button
                onClick={() => handleCardToggle(question.id)}
                className="w-full p-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-inset rounded-xl"
                style={{ minHeight: "44px" }}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      hasResponse
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {question.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {question.title}
                    </h3>
                    {hasResponse && (
                      <p className="text-sm text-green-600 mt-1">
                        Response saved
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-gray-400">
                  {isExpanded ? (
                    <ChevronUpIcon size={20} />
                  ) : (
                    <ChevronDownIcon size={20} />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4">
                  <textarea
                    value={responses[question.id] || ""}
                    onChange={(e) =>
                      handleResponseChange(question.id, e.target.value)
                    }
                    placeholder={question.placeholder}
                    className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    rows={8}
                    style={{ minHeight: "70vh" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Motivational Quote */}
      <div className="px-4 py-4">
        <blockquote className="text-center">
          <p className="text-gray-600 italic opacity-80 text-sm leading-relaxed">
            "The journey of a thousand miles begins with a single step. Your GPS
            Audit is that first step toward the life you've always wanted."
          </p>
        </blockquote>
      </div>

      {/* Footer Navigation */}
      <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm border-t border-gray-200/50 px-4 py-4">
        <div className="flex justify-between space-x-3">
          <AppButton
            variant="outline"
            icon={<ArrowLeftIcon size={18} />}
            className="flex-1 bg-transparent"
            style={{ minHeight: "44px" }}
          >
            Previous
          </AppButton>

          <Link to="/goal-creation" className="flex-1">
            <AppButton
              variant="primary"
              icon={<ArrowRightIcon size={18} />}
              iconPosition="right"
              fullWidth
              disabled={completedResponses === 0}
              style={{ minHeight: "44px" }}
            >
              {completedResponses === auditQuestions.length
                ? "Complete Audit"
                : "Continue"}
            </AppButton>
          </Link>
        </div>
      </div>
    </GradientBackground>
  );
}
