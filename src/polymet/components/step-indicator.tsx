import React from "react";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export default function StepIndicator({
  steps,
  currentStep,
  className,
}: StepIndicatorProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <React.Fragment key={index}>
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                    {
                      "bg-sky-500 text-white": isCompleted || isCurrent,
                      "bg-gray-200 text-gray-500": !isCompleted && !isCurrent,
                    }
                  )}
                >
                  {isCompleted ? <CheckIcon className="h-4 w-4" /> : index + 1}
                </div>
                <span
                  className={cn("mt-2 text-xs", {
                    "font-medium text-sky-600": isCurrent,
                    "font-medium text-gray-900": isCompleted,
                    "text-gray-500": !isCompleted && !isCurrent,
                  })}
                >
                  {step}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn("h-0.5 flex-1", {
                    "bg-sky-500": index < currentStep,
                    "bg-gray-200": index >= currentStep,
                  })}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
