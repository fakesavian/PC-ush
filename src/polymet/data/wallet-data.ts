export interface Transaction {
  id: string;
  promiseType: "daily" | "weekly" | "other";
  goalTitle: string;
  deadline: string; // ISO date string
  amount: number; // fee (negative) or credit (positive)
  recommitted: boolean;
  stripeIntentId?: string;
  receiptUrl?: string;
  status: "pending" | "charged" | "refunded" | "cancelled";
  createdAt: string;
  description?: string;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  tier: "Bronze" | "Silver" | "Gold";
  totalEarned: number;
  totalCharged: number;
  lastUpdated: string;
}

export interface UpcomingCharge {
  id: string;
  goalTitle: string;
  amount: number;
  dueDate: string;
  canRecommit: boolean;
  promiseType: "daily" | "weekly" | "other";
}

export interface WeeklyTransactionGroup {
  weekStart: string;
  weekEnd: string;
  transactions: Transaction[];
  totalAmount: number;
  hasRecommitOpportunities: boolean;
}

// Mock wallet data
export const MOCK_WALLET: Wallet = {
  id: "wallet-1",
  userId: "user-1",
  balance: 47.5,
  tier: "Silver",
  totalEarned: 125.0,
  totalCharged: 77.5,
  lastUpdated: "2023-12-15T10:30:00Z",
};

// Mock transactions
export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1",
    promiseType: "daily",
    goalTitle: "Morning Workout Routine",
    deadline: "2023-12-15T08:00:00Z",
    amount: -25.0,
    recommitted: false,
    stripeIntentId: "pi_1234567890",
    receiptUrl: "https://pay.stripe.com/receipts/1234567890",
    status: "charged",
    createdAt: "2023-12-15T08:30:00Z",
    description: "Missed morning workout commitment",
  },
  {
    id: "tx-2",
    promiseType: "weekly",
    goalTitle: "Read 2 Books This Month",
    deadline: "2023-12-10T23:59:00Z",
    amount: 15.0,
    recommitted: true,
    status: "refunded",
    createdAt: "2023-12-10T20:00:00Z",
    description: "Completed weekly reading goal - refund issued",
  },
  {
    id: "tx-3",
    promiseType: "daily",
    goalTitle: "Meditation Practice",
    deadline: "2023-12-12T19:00:00Z",
    amount: -10.0,
    recommitted: true,
    stripeIntentId: "pi_0987654321",
    receiptUrl: "https://pay.stripe.com/receipts/0987654321",
    status: "charged",
    createdAt: "2023-12-12T19:30:00Z",
    description: "Missed meditation - recommitted for tomorrow",
  },
  {
    id: "tx-4",
    promiseType: "weekly",
    goalTitle: "Limit Screen Time",
    deadline: "2023-12-08T23:59:00Z",
    amount: 20.0,
    recommitted: false,
    status: "refunded",
    createdAt: "2023-12-08T22:00:00Z",
    description: "Successfully limited screen time - bonus earned",
  },
  {
    id: "tx-5",
    promiseType: "daily",
    goalTitle: "Healthy Meal Prep",
    deadline: "2023-12-05T12:00:00Z",
    amount: -15.0,
    recommitted: false,
    stripeIntentId: "pi_1122334455",
    receiptUrl: "https://pay.stripe.com/receipts/1122334455",
    status: "charged",
    createdAt: "2023-12-05T14:00:00Z",
    description: "Skipped meal prep commitment",
  },
];

// Mock upcoming charges
export const MOCK_UPCOMING_CHARGES: UpcomingCharge[] = [
  {
    id: "upcoming-1",
    goalTitle: "Morning Workout Routine",
    amount: 25.0,
    dueDate: "2023-12-16T08:00:00Z",
    canRecommit: true,
    promiseType: "daily",
  },
  {
    id: "upcoming-2",
    goalTitle: "Weekly Team Meeting Prep",
    amount: 30.0,
    dueDate: "2023-12-17T09:00:00Z",
    canRecommit: true,
    promiseType: "weekly",
  },
];

// Utility functions
export const groupTransactionsByWeek = (
  transactions: Transaction[]
): WeeklyTransactionGroup[] => {
  const groups: { [key: string]: Transaction[] } = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.createdAt);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6); // End of week (Saturday)
    weekEnd.setHours(23, 59, 59, 999);

    const weekKey = weekStart.toISOString().split("T")[0];

    if (!groups[weekKey]) {
      groups[weekKey] = [];
    }
    groups[weekKey].push(transaction);
  });

  return Object.entries(groups)
    .map(([weekStart, transactions]) => {
      const start = new Date(weekStart);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);

      const totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);
      const hasRecommitOpportunities = transactions.some(
        (tx) => tx.amount < 0 && !tx.recommitted && tx.status === "charged"
      );

      return {
        weekStart: start.toISOString(),
        weekEnd: end.toISOString(),
        transactions: transactions.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
        totalAmount,
        hasRecommitOpportunities,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.weekStart).getTime() - new Date(a.weekStart).getTime()
    );
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(amount));
};

export const formatDateRange = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startMonth = start.toLocaleDateString("en-US", { month: "short" });
  const endMonth = end.toLocaleDateString("en-US", { month: "short" });

  if (startMonth === endMonth) {
    return `${startMonth} ${start.getDate()}-${end.getDate()}`;
  }

  return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}`;
};

export const getTierColor = (tier: Wallet["tier"]): string => {
  switch (tier) {
    case "Bronze":
      return "text-amber-600";
    case "Silver":
      return "text-gray-600";
    case "Gold":
      return "text-yellow-600";
    default:
      return "text-gray-600";
  }
};

export const getTierBadgeColor = (tier: Wallet["tier"]): string => {
  switch (tier) {
    case "Bronze":
      return "bg-amber-100 text-amber-800";
    case "Silver":
      return "bg-gray-100 text-gray-800";
    case "Gold":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const hasNoRecentFees = (
  transactions: Transaction[],
  days: number = 7
): boolean => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return !transactions.some(
    (tx) =>
      tx.amount < 0 &&
      tx.status === "charged" &&
      new Date(tx.createdAt) >= cutoffDate
  );
};
