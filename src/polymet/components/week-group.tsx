import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";
import {
  WeeklyTransactionGroup,
  formatCurrency,
  formatDateRange,
} from "@/polymet/data/wallet-data";
import TransactionCard from "@/polymet/components/transaction-card";

interface WeekGroupProps {
  group: WeeklyTransactionGroup;
  onRecommit?: (transactionId: string) => void;
  defaultExpanded?: boolean;
}

export default function WeekGroup({
  group,
  onRecommit,
  defaultExpanded = true,
}: WeekGroupProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const positiveTransactions = group.transactions.filter(
    (tx) => tx.amount >= 0
  );
  const negativeTransactions = group.transactions.filter((tx) => tx.amount < 0);

  return (
    <div className="bg-white/40 backdrop-blur-sm rounded-xl overflow-hidden">
      <button
        onClick={toggleExpanded}
        className="w-full p-4 flex items-center justify-between hover:bg-white/20 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div>
            <h3 className="font-semibold text-gray-900 text-left">
              {formatDateRange(group.weekStart, group.weekEnd)}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{group.transactions.length} transactions</span>
              {group.hasRecommitOpportunities && (
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                  Recommit Available
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`text-lg font-bold ${
              group.totalAmount >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {group.totalAmount >= 0 ? "+" : ""}
            {formatCurrency(group.totalAmount)}
          </div>

          {isExpanded ? (
            <ChevronUpIcon size={20} className="text-gray-400" />
          ) : (
            <ChevronDownIcon size={20} className="text-gray-400" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-3">
          {/* Summary Stats */}
          {(positiveTransactions.length > 0 ||
            negativeTransactions.length > 0) && (
            <div className="grid grid-cols-2 gap-4 p-3 bg-white/60 rounded-lg text-sm">
              <div>
                <div className="text-gray-600">Refunds Earned</div>
                <div className="font-semibold text-green-600">
                  +
                  {formatCurrency(
                    positiveTransactions.reduce((sum, tx) => sum + tx.amount, 0)
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {positiveTransactions.length} transactions
                </div>
              </div>
              <div>
                <div className="text-gray-600">Fees Charged</div>
                <div className="font-semibold text-red-600">
                  -
                  {formatCurrency(
                    Math.abs(
                      negativeTransactions.reduce(
                        (sum, tx) => sum + tx.amount,
                        0
                      )
                    )
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {negativeTransactions.length} transactions
                </div>
              </div>
            </div>
          )}

          {/* Transaction List */}
          <div className="space-y-3">
            {group.transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onRecommit={onRecommit}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
