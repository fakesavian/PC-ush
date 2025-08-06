import React from "react";
import { Link } from "react-router-dom";
import GradientBackground from "@/polymet/components/gradient-background";
import BackButton from "@/polymet/components/back-button";
import SettingsItem from "@/polymet/components/settings-item";
import {
  BellIcon,
  UserIcon,
  CreditCardIcon,
  LockIcon,
  HelpCircleIcon,
  LogOutIcon,
  ShieldIcon,
  GlobeIcon,
  MoonIcon,
} from "lucide-react";

export default function SettingsScreen() {
  return (
    <GradientBackground variant="blue" className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <BackButton to="/progress-dashboard" label="Back" />
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        <div className="w-10"></div> {/* Empty div for alignment */}
      </div>

      {/* User Profile Summary */}
      <div className="flex items-center p-4 bg-white rounded-xl shadow-sm mb-6">
        <img
          src="https://github.com/yusufhilmi.png"
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
        />

        <div className="ml-4">
          <h2 className="font-semibold text-gray-900">Alex Johnson</h2>
          <p className="text-sm text-gray-600">alex.johnson@example.com</p>
          <Link
            to="/settings/profile"
            className="text-sm text-sky-600 font-medium"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6 flex-1 overflow-auto pb-4">
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-2 px-1">
            PREFERENCES
          </h2>
          <div className="space-y-3">
            <Link to="/notifications">
              <SettingsItem
                icon={<BellIcon size={20} />}
                title="Notifications"
                description="Manage your alerts and reminders"
                badge={
                  <span className="text-xs font-medium px-2 py-1 bg-red-100 text-red-700 rounded-full">
                    3
                  </span>
                }
              />
            </Link>
            <SettingsItem
              icon={<MoonIcon size={20} />}
              title="Appearance"
              description="Dark mode and theme settings"
            />

            <SettingsItem
              icon={<GlobeIcon size={20} />}
              title="Language"
              description="Change your language"
            />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-2 px-1">
            ACCOUNT
          </h2>
          <div className="space-y-3">
            <SettingsItem
              icon={<UserIcon size={20} />}
              title="Account Information"
              description="Manage your account details"
            />

            <Link to="/coaching-ai">
              <SettingsItem
                icon={<CreditCardIcon size={20} />}
                title="Subscription"
                description="Manage your subscription plan"
                badge={
                  <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    AI Coach
                  </span>
                }
              />
            </Link>
            <SettingsItem
              icon={<LockIcon size={20} />}
              title="Password & Security"
              description="Update your password"
            />

            <SettingsItem
              icon={<ShieldIcon size={20} />}
              title="Privacy"
              description="Manage your data and privacy"
            />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-2 px-1">
            SUPPORT
          </h2>
          <div className="space-y-3">
            <SettingsItem
              icon={<HelpCircleIcon size={20} />}
              title="Help & Support"
              description="Get help with using the app"
            />

            <SettingsItem
              icon={<LogOutIcon size={20} />}
              title="Log Out"
              showChevron={false}
              className="text-red-600"
            />
          </div>
        </div>

        <div className="pt-4 text-center">
          <p className="text-xs text-gray-500">Pocket Coach v1.0.0</p>
          <p className="text-xs text-gray-400 mt-1">
            © 2023 Pocket Coach Inc.
          </p>
        </div>
      </div>
    </GradientBackground>
  );
}
