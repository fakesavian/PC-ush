import { AlertTriangleIcon, ClockIcon, RefreshCwIcon } from "lucide-react";
import { UpcomingCharge, formatCurrency } from "@/polymet/data/wallet-data";

interface UpcomingChargesProps {
  charges: UpcomingCharge[];
  onRecommit?: (chargeId: string) => void;
}

export default function UpcomingCharges({
  charges,
  onRecommit,
}: UpcomingChargesProps) {
  if (charges.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-green-800">
            No upcoming charges - you're on track!
          </span>
        </div>
      </div>
    );
  }

  const formatTimeUntilDue = (dueDate: string): string => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffHours = Math.ceil(
      (due.getTime() - now.getTime()) / (1000 * 60 * 60)
    );

    if (diffHours < 0) return "Overdue";
    if (diffHours < 24) return `${diffHours}h remaining`;

    const diffDays = Math.ceil(diffHours / 24);
    return `${diffDays}d remaining`;
  };

  const getUrgencyColor = (dueDate: string): string => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffHours = (due.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (diffHours < 0) return "text-red-600 bg-red-50 border-red-200";
    if (diffHours < 24) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-yellow-600 bg-yellow-50 border-yellow-200";
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangleIcon size={16} className="text-orange-500" />

        <h3 className="font-semibold text-gray-900">Upcoming Charges</h3>
        <span className="text-sm text-gray-500">({charges.length})</span>
      </div>

      {charges.map((charge) => (
        <div
          key={charge.id}
          className={`border rounded-lg p-4 ${getUrgencyColor(charge.dueDate)}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-gray-900">
                  {charge.goalTitle}
                </h4>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                  {charge.promiseType}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <ClockIcon size={14} />

                  <span>{formatTimeUntilDue(charge.dueDate)}</span>
                </div>
                <div className="font-semibold">
                  -{formatCurrency(charge.amount)}
                </div>
              </div>
            </div>

            {charge.canRecommit && onRecommit && (
              <button
                onClick={() => onRecommit(charge.id)}
                className="flex items-center gap-1 px-3 py-1 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <RefreshCwIcon size={14} />
                Recommit
              </button>
            )}
          </div>
        </div>
      ))}

      <div className="text-xs text-gray-500 text-center pt-2">
        Charges will be processed automatically at deadline
      </div>
    </div>
  );
}
