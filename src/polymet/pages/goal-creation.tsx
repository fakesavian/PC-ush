import React, { useState } from "react";
import { Link } from "react-router-dom";
import GradientBackground from "@/polymet/components/gradient-background";
import AppButton from "@/polymet/components/app-button";
import GoalInput from "@/polymet/components/goal-input";
import StepIndicator from "@/polymet/components/step-indicator";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  TargetIcon,
  ClockIcon,
  AlertCircleIcon,
} from "lucide-react";

export default function GoalCreation() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["Goal", "Schedule", "Commitment", "Review"];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <GradientBackground variant="mint" className="flex flex-col">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="rounded-full p-2 text-gray-600 disabled:opacity-50"
        >
          <ArrowLeftIcon size={20} />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">
          Create Your Goal
        </h1>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>

      {/* Step Indicator */}
      <StepIndicator steps={steps} currentStep={currentStep} className="mb-8" />

      {/* Step Content */}
      <div className="flex-1">
        {currentStep === 0 && (
          <div className="space-y-6">
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center text-sky-600">
                <TargetIcon size={18} className="mr-2" />

                <span className="text-sm font-medium">Define Your Goal</span>
              </div>

              <GoalInput
                label="What do you want to achieve?"
                placeholder="e.g., Exercise 3 times per week"
                helperText="Be specific and measurable"
              />

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">
                  Why is this important to you?
                </label>
                <textarea
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white p-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500/20"
                  rows={3}
                  placeholder="e.g., To improve my health and energy levels"
                ></textarea>
                <p className="mt-1 text-xs text-gray-500">
                  Understanding your motivation helps with accountability
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center text-emerald-600">
                <TargetIcon size={18} className="mr-2" />

                <span className="text-sm font-medium">
                  Set Measurable Targets
                </span>
              </div>

              <GoalInput
                label="How will you measure success?"
                placeholder="e.g., Run 5km without stopping"
                helperText="Make it quantifiable"
              />

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Break it down into smaller steps
                </label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center rounded-lg border border-gray-200 bg-white p-3">
                    <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-700">
                      1
                    </span>
                    <input
                      type="text"
                      className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                      placeholder="First milestone"
                    />
                  </div>

                  <div className="flex items-center rounded-lg border border-gray-200 bg-white p-3">
                    <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-700">
                      2
                    </span>
                    <input
                      type="text"
                      className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                      placeholder="Second milestone"
                    />
                  </div>

                  <button className="flex w-full items-center justify-center rounded-lg border border-dashed border-gray-300 p-3 text-sm text-gray-500 hover:bg-gray-50">
                    + Add another milestone
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center text-purple-600">
                <CalendarIcon size={18} className="mr-2" />

                <span className="text-sm font-medium">Set Your Schedule</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <div className="mt-1 flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
                    <CalendarIcon size={16} className="mr-2 text-gray-400" />

                    <input
                      type="date"
                      className="flex-1 bg-transparent text-gray-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <div className="mt-1 flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
                    <CalendarIcon size={16} className="mr-2 text-gray-400" />

                    <input
                      type="date"
                      className="flex-1 bg-transparent text-gray-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center text-amber-600">
                <ClockIcon size={18} className="mr-2" />

                <span className="text-sm font-medium">Frequency</span>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  How often will you work on this goal?
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center rounded-lg border border-gray-200 p-3">
                    <input
                      type="radio"
                      id="daily"
                      name="frequency"
                      className="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-500"
                    />

                    <label
                      htmlFor="daily"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Daily
                    </label>
                  </div>

                  <div className="flex items-center rounded-lg border border-gray-200 p-3">
                    <input
                      type="radio"
                      id="weekly"
                      name="frequency"
                      className="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-500"
                    />

                    <label
                      htmlFor="weekly"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Weekly
                    </label>
                  </div>

                  <div className="flex items-center rounded-lg border border-gray-200 p-3">
                    <input
                      type="radio"
                      id="custom"
                      name="frequency"
                      className="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-500"
                    />

                    <label
                      htmlFor="custom"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Custom
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Select days
                  </label>
                  <div className="mt-2 flex justify-between">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                      <button
                        key={index}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-sm font-medium hover:bg-sky-50 hover:text-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center text-rose-600">
                <AlertCircleIcon size={18} className="mr-2" />

                <span className="text-sm font-medium">
                  Financial Commitment
                </span>
              </div>

              <p className="mb-4 text-sm text-gray-600">
                Set a financial stake to increase your accountability. You'll
                only be charged if you miss your goal.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Commitment Amount
                  </label>
                  <div className="mt-1 flex items-center rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
                    <span className="mr-2 text-gray-500">$</span>
                    <input
                      type="number"
                      className="flex-1 bg-transparent text-gray-900 focus:outline-none"
                      placeholder="25"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Recommended: $25 per week
                  </p>
                </div>

                <div className="rounded-lg bg-amber-50 p-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5 rounded-full bg-amber-100 p-1">
                      <AlertCircleIcon size={16} className="text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-amber-800">
                        How it works
                      </p>
                      <p className="mt-1 text-xs text-amber-700">
                        Your card will be authorized but not charged now. If you
                        miss your goal, the amount will be donated to charity.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Payment Method
                  </label>
                  <div className="mt-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3 h-10 w-10 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            •••• 4242
                          </p>
                          <p className="text-xs text-gray-500">Expires 12/25</p>
                        </div>
                      </div>
                      <input
                        type="radio"
                        name="payment"
                        defaultChecked
                        className="h-4 w-4 border-gray-300 text-sky-600 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <button className="mt-2 flex w-full items-center justify-center rounded-lg border border-dashed border-gray-300 p-3 text-sm text-gray-500 hover:bg-gray-50">
                    + Add new payment method
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                Review Your Goal
              </h3>

              <div className="space-y-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs font-medium uppercase text-gray-500">
                    Goal
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    Exercise 3 times per week
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs font-medium uppercase text-gray-500">
                    Schedule
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    3 times weekly (Mon, Wed, Fri)
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    June 15 - July 15, 2023
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs font-medium uppercase text-gray-500">
                    Financial Commitment
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    $25 per week
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-sky-50 p-4">
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5 rounded-full bg-sky-100 p-1">
                    <AlertCircleIcon size={16} className="text-sky-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-sky-800">
                      Accountability Check
                    </p>
                    <p className="mt-1 text-xs text-sky-700">
                      You'll need to check in after each scheduled session.
                      Missing check-ins may result in your commitment fee being
                      charged.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-auto px-4 py-6">
        {currentStep < steps.length - 1 ? (
          <AppButton
            variant="primary"
            fullWidth
            icon={<ArrowRightIcon size={18} />}
            iconPosition="right"
            onClick={handleNext}
          >
            Continue
          </AppButton>
        ) : (
          <Link to="/progress-dashboard">
            <AppButton variant="primary" fullWidth>
              Create Goal
            </AppButton>
          </Link>
        )}
      </div>
    </GradientBackground>
  );
}
