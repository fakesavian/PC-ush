import React from "react";
import PhoneFrame from "@/polymet/components/phone-frame";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <PhoneFrame>{children}</PhoneFrame>
    </div>
  );
}
