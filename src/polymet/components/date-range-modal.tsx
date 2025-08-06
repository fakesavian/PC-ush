import React, { useState } from "react";
import { XIcon, CalendarIcon } from "lucide-react";

interface DateRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDateRangeSelect: (startDate: string | null, endDate: string | null) => void;
  startDate?: string | null;
  endDate?: string | null;
}

export default function DateRangeModal({
  isOpen,
  onClose,
  onDateRangeSelect,
  startDate,
  endDate,
}: DateRangeModalProps) {
  const [tempStartDate, setTempStartDate] = useState(startDate || "");
  const [tempEndDate, setTempEndDate] = useState(endDate || "");

  if (!isOpen) return null;

  const handleApply = () => {
    onDateRangeSelect(tempStartDate || null, tempEndDate || null);
    onClose();
  };

  const handleClear = () => {
    setTempStartDate("");
    setTempEndDate("");
    onDateRangeSelect(null, null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-t-2xl w-full max-w-md mx-4 mb-0 shadow-xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Select Date Range
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
          >
            <XIcon size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={tempStartDate}
                  onChange={(e) => setTempStartDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />

                <CalendarIcon
                  size={20}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={tempEndDate}
                  onChange={(e) => setTempEndDate(e.target.value)}
                  min={tempStartDate}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />

                <CalendarIcon
                  size={20}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Quick Select
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  const today = new Date().toISOString().split("T")[0];
                  const lastWeek = new Date(
                    Date.now() - 7 * 24 * 60 * 60 * 1000
                  )
                    .toISOString()
                    .split("T")[0];
                  setTempStartDate(lastWeek);
                  setTempEndDate(today);
                }}
                className="px-3 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Last 7 days
              </button>
              <button
                onClick={() => {
                  const today = new Date().toISOString().split("T")[0];
                  const lastMonth = new Date(
                    Date.now() - 30 * 24 * 60 * 60 * 1000
                  )
                    .toISOString()
                    .split("T")[0];
                  setTempStartDate(lastMonth);
                  setTempEndDate(today);
                }}
                className="px-3 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Last 30 days
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex space-x-3 p-4 border-t border-gray-200">
          <button
            onClick={handleClear}
            className="flex-1 px-4 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Clear
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-4 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-medium"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
