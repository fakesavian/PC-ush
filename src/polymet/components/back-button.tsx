import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  to: string;
  label?: string;
  className?: string;
}

export default function BackButton({ to, label, className }: BackButtonProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center text-gray-700 hover:text-gray-900 transition-colors",
        className
      )}
    >
      <ArrowLeftIcon size={20} className="mr-1" />

      {label && <span className="text-sm font-medium">{label}</span>}
    </Link>
  );
}
