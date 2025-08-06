import React from "react";
import { ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  onClick?: () => void;
  className?: string;
  badge?: React.ReactNode;
  showChevron?: boolean;
}

export default function SettingsItem({
  icon,
  title,
  description,
  onClick,
  className,
  badge,
  showChevron = true,
}: SettingsItemProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 rounded-xl bg-white shadow-sm cursor-pointer hover:bg-gray-50 transition-colors",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sky-100 text-sky-600 mr-3">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{title}</h3>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center">
        {badge && <div className="mr-2">{badge}</div>}
        {showChevron && (
          <ChevronRightIcon size={20} className="text-gray-400" />
        )}
      </div>
    </div>
  );
}
