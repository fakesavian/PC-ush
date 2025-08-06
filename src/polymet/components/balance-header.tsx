import { ArrowUpIcon, InfoIcon } from "lucide-react";
import {
  Wallet,
  getTierColor,
  getTierBadgeColor,
  formatCurrency,
} from "@/polymet/data/wallet-data";

interface BalanceHeaderProps {
  wallet: Wallet;
  onUpgrade?: () => void;
}

export default function BalanceHeader({
  wallet,
  onUpgrade,
}: BalanceHeaderProps) {
  const isPositiveBalance = wallet.balance >= 0;

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-sm font-medium text-gray-600">
              Current Balance
            </h2>
            <InfoIcon
              size={14}
              className="text-gray-400 cursor-help"
              title="Your balance reflects fees charged and refunds earned from goal commitments"
            />
          </div>
          <div
            className={`text-3xl font-bold ${
              isPositiveBalance ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositiveBalance ? "+" : "-"}
            {formatCurrency(wallet.balance)}
          </div>
        </div>

        <div className="text-right">
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTierBadgeColor(
              wallet.tier
            )}`}
          >
            {wallet.tier} Tier
          </div>
          {wallet.tier !== "Gold" && (
            <button
              onClick={onUpgrade}
              className="mt-2 flex items-center gap-1 text-sm text-sky-600 hover:text-sky-700 font-medium transition-colors"
            >
              <ArrowUpIcon size={14} />
              Upgrade
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        <div>
          <div className="text-sm text-gray-600">Total Earned</div>
          <div className="text-lg font-semibold text-green-600">
            +{formatCurrency(wallet.totalEarned)}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Total Charged</div>
          <div className="text-lg font-semibold text-red-600">
            -{formatCurrency(wallet.totalCharged)}
          </div>
        </div>
      </div>
    </div>
  );
}
