import {
  ExternalLinkIcon,
  RefreshCwIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "lucide-react";
import { Transaction, formatCurrency } from "@/polymet/data/wallet-data";

interface TransactionCardProps {
  transaction: Transaction;
  onRecommit?: (transactionId: string) => void;
}

export default function TransactionCard({
  transaction,
  onRecommit,
}: TransactionCardProps) {
  const isNegative = transaction.amount < 0;
  const canRecommit =
    isNegative && !transaction.recommitted && transaction.status === "charged";

  const getStatusIcon = () => {
    switch (transaction.status) {
      case "charged":
        return <XCircleIcon size={16} className="text-red-500" />;

      case "refunded":
        return <CheckCircleIcon size={16} className="text-green-500" />;

      case "pending":
        return (
          <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        );

      case "cancelled":
        return <XCircleIcon size={16} className="text-gray-400" />;

      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (transaction.status) {
      case "charged":
        return "Charged";
      case "refunded":
        return "Refunded";
      case "pending":
        return "Processing";
      case "cancelled":
        return "Cancelled";
      default:
        return transaction.status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-gray-900">
              {transaction.goalTitle}
            </h4>
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
              {transaction.promiseType}
            </span>
            {transaction.recommitted && (
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                Recommitted
              </span>
            )}
          </div>

          {transaction.description && (
            <p className="text-sm text-gray-600 mb-2">
              {transaction.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{formatDate(transaction.createdAt)}</span>
            <div className="flex items-center gap-1">
              {getStatusIcon()}
              <span>{getStatusText()}</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div
            className={`text-lg font-bold ${
              isNegative ? "text-red-600" : "text-green-600"
            }`}
          >
            {isNegative ? "-" : "+"}
            {formatCurrency(transaction.amount)}
          </div>

          <div className="flex items-center gap-2 mt-2">
            {transaction.receiptUrl && (
              <a
                href={transaction.receiptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ExternalLinkIcon size={12} />
                Receipt
              </a>
            )}

            {canRecommit && onRecommit && (
              <button
                onClick={() => onRecommit(transaction.id)}
                className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs font-medium hover:bg-blue-100 transition-colors"
              >
                <RefreshCwIcon size={12} />
                Recommit
              </button>
            )}
          </div>
        </div>
      </div>

      {transaction.stripeIntentId && (
        <div className="text-xs text-gray-400 font-mono bg-gray-50 px-2 py-1 rounded">
          ID: {transaction.stripeIntentId}
        </div>
      )}
    </div>
  );
}
