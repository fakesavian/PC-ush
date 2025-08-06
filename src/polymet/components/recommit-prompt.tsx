import { useState } from "react";
import {
  XIcon,
  RefreshCwIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
} from "lucide-react";
import { Transaction, formatCurrency } from "@/polymet/data/wallet-data";

interface RecommitPromptProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction;
  onRecommit: (
    transactionId: string,
    options: RecommitOptions
  ) => Promise<void>;
}

interface RecommitOptions {
  newDeadline: string;
  adjustedAmount?: number;
  notes?: string;
}

export default function RecommitPrompt({
  isOpen,
  onClose,
  transaction,
  onRecommit,
}: RecommitPromptProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newDeadline, setNewDeadline] = useState("");
  const [notes, setNotes] = useState("");
  const [adjustedAmount, setAdjustedAmount] = useState<number | undefined>();

  if (!isOpen || !transaction) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeadline) return;

    setIsSubmitting(true);
    try {
      await onRecommit(transaction.id, {
        newDeadline,
        adjustedAmount,
        notes,
      });
      onClose();
      // Reset form
      setNewDeadline("");
      setNotes("");
      setAdjustedAmount(undefined);
    } catch (error) {
      console.error("Failed to recommit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1); // Minimum 1 hour from now
    return now.toISOString().slice(0, 16);
  };

  const getMaxDateTime = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30); // Maximum 30 days from now
    return maxDate.toISOString().slice(0, 16);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <RefreshCwIcon size={20} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Recommit to Goal
              </h2>
              <p className="text-sm text-gray-600">
                Set a new deadline and try again
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XIcon size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Goal Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-1">
              {transaction.goalTitle}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>
                Original fee: {formatCurrency(Math.abs(transaction.amount))}
              </span>
              <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">
                {transaction.promiseType}
              </span>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <AlertTriangleIcon
              size={20}
              className="text-orange-600 flex-shrink-0 mt-0.5"
            />

            <div className="text-sm">
              <p className="font-medium text-orange-800 mb-1">
                Recommitment Terms
              </p>
              <p className="text-orange-700">
                By recommitting, you agree to a new deadline. If you miss this
                commitment, the same fee will be charged again.
              </p>
            </div>
          </div>

          {/* New Deadline */}
          <div>
            <label
              htmlFor="newDeadline"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Deadline *
            </label>
            <input
              type="datetime-local"
              id="newDeadline"
              value={newDeadline}
              onChange={(e) => setNewDeadline(e.target.value)}
              min={getMinDateTime()}
              max={getMaxDateTime()}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <p className="text-xs text-gray-500 mt-1">
              Must be at least 1 hour from now, maximum 30 days
            </p>
          </div>

          {/* Adjusted Amount (Optional) */}
          <div>
            <label
              htmlFor="adjustedAmount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Adjusted Fee Amount (Optional)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                id="adjustedAmount"
                value={adjustedAmount || ""}
                onChange={(e) =>
                  setAdjustedAmount(
                    e.target.value ? parseFloat(e.target.value) : undefined
                  )
                }
                min="1"
                max="500"
                step="0.01"
                placeholder={Math.abs(transaction.amount).toFixed(2)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Leave empty to keep original amount:{" "}
              {formatCurrency(Math.abs(transaction.amount))}
            </p>
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              maxLength={200}
              placeholder="Why did you miss the original deadline? What will you do differently?"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />

            <p className="text-xs text-gray-500 mt-1">
              {notes.length}/200 characters
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!newDeadline || isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Recommitting...
                </>
              ) : (
                <>
                  <CheckCircleIcon size={16} />
                  Recommit
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
