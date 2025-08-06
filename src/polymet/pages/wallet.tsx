import { useState } from "react";
import { ArrowLeft, TrendingUpIcon } from "lucide-react";
import { Link } from "react-router-dom";
import GradientBackground from "@/polymet/components/gradient-background";
import BalanceHeader from "@/polymet/components/balance-header";
import UpcomingCharges from "@/polymet/components/upcoming-charges";
import WeekGroup from "@/polymet/components/week-group";
import RecommitPrompt from "@/polymet/components/recommit-prompt";
import {
  MOCK_WALLET,
  MOCK_TRANSACTIONS,
  MOCK_UPCOMING_CHARGES,
  groupTransactionsByWeek,
  hasNoRecentFees,
  type Transaction,
} from "@/polymet/data/wallet-data";

export default function Wallet() {
  const [selectedTransaction, setSelectedTransaction] = useState<
    Transaction | undefined
  >();
  const [isRecommitModalOpen, setIsRecommitModalOpen] = useState(false);

  const weeklyGroups = groupTransactionsByWeek(MOCK_TRANSACTIONS);
  const noRecentFees = hasNoRecentFees(MOCK_TRANSACTIONS);

  const handleRecommit = (transactionId: string) => {
    const transaction = MOCK_TRANSACTIONS.find((tx) => tx.id === transactionId);
    if (transaction) {
      setSelectedTransaction(transaction);
      setIsRecommitModalOpen(true);
    }
  };

  const handleRecommitSubmit = async (transactionId: string, options: any) => {
    console.log("Recommitting:", transactionId, options);
    // Here you would call your API to update the commitment
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleUpgrade = () => {
    console.log("Upgrade tier clicked");
  };

  return (
    <GradientBackground variant="blue" className="min-h-screen">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <Link
              to="/progress-dashboard"
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Wallet & Fees</h1>
              <p className="text-sm text-gray-600">
                Track your commitment accountability
              </p>
            </div>
          </div>

          {noRecentFees && (
            <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              <TrendingUpIcon size={14} />
              No fees this week!
            </div>
          )}
        </div>

        {/* Balance Header */}
        <div className="px-6 pb-6">
          <BalanceHeader wallet={MOCK_WALLET} onUpgrade={handleUpgrade} />
        </div>

        {/* Upcoming Charges */}
        <div className="px-6 pb-6">
          <UpcomingCharges
            charges={MOCK_UPCOMING_CHARGES}
            onRecommit={handleRecommit}
          />
        </div>

        {/* Transaction History */}
        <div className="flex-1 px-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Transaction History</h3>
            <span className="text-sm text-gray-500">
              {MOCK_TRANSACTIONS.length} transactions
            </span>
          </div>

          <div className="space-y-4">
            {weeklyGroups.length > 0 ? (
              weeklyGroups.map((group, index) => (
                <WeekGroup
                  key={index}
                  group={group}
                  onRecommit={handleRecommit}
                  defaultExpanded={index === 0}
                />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>No transactions yet</p>
                <p className="text-sm mt-1">
                  Your commitment fees and refunds will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommit Modal */}
      <RecommitPrompt
        isOpen={isRecommitModalOpen}
        onClose={() => setIsRecommitModalOpen(false)}
        transaction={selectedTransaction}
        onRecommit={handleRecommitSubmit}
      />
    </GradientBackground>
  );
}
