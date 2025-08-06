import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircleIcon } from "lucide-react";

interface FeeReminderProps {
  amount: string;
  dueDate: string;
  isPaid?: boolean;
  className?: string;
}

export default function FeeReminder({
  amount,
  dueDate,
  isPaid = false,
  className,
}: FeeReminderProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-4",
        isPaid
          ? "bg-emerald-50 text-emerald-800"
          : "bg-amber-50 text-amber-800",
        className
      )}
    >
      <div className="flex items-start">
        <div
          className={cn(
            "mr-3 rounded-full p-1",
            isPaid ? "bg-emerald-200" : "bg-amber-200"
          )}
        >
          <AlertCircleIcon className="h-5 w-5" />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">
              {isPaid ? "Payment Successful" : "Commitment Fee Reminder"}
            </h3>
            <span className="text-sm font-semibold">{amount}</span>
          </div>

          <p className="mt-1 text-xs opacity-80">
            {isPaid ? `Paid on ${dueDate}` : `Due on ${dueDate}`}
          </p>

          {!isPaid && (
            <button
              className={cn(
                "mt-3 rounded-full bg-amber-200 px-4 py-1.5 text-xs font-medium text-amber-800 hover:bg-amber-300"
              )}
            >
              Pay Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
