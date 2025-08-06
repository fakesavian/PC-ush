import React, { useState } from "react";
import GradientBackground from "@/polymet/components/gradient-background";
import BackButton from "@/polymet/components/back-button";
import NotificationCard from "@/polymet/components/notification-card";
import {
  BellIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  CalendarIcon,
  TrendingUpIcon,
  AwardIcon,
  MessageCircleIcon,
} from "lucide-react";

export default function NotificationsScreen() {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
    { id: "goals", label: "Goals" },
    { id: "coaching", label: "Coaching" },
  ];

  const notifications = [
    {
      id: 1,
      title: "Goal Reminder",
      message: "Don't forget to complete your morning workout routine today!",
      time: "5m ago",
      icon: <BellIcon size={18} />,

      isRead: false,
      type: "goals",
    },
    {
      id: 2,
      title: "New Message from Coach",
      message:
        "Sarah sent you feedback on your latest progress report. Check it out!",
      time: "30m ago",
      icon: <MessageCircleIcon size={18} />,

      isRead: false,
      type: "coaching",
    },
    {
      id: 3,
      title: "Goal Completed",
      message:
        "Congratulations! You've completed your 'Read 2 Books' goal ahead of schedule.",
      time: "2h ago",
      icon: <CheckCircleIcon size={18} />,

      isRead: true,
      type: "goals",
    },
    {
      id: 4,
      title: "Progress Update",
      message:
        "You're making great progress! You've completed 75% of your weekly goals.",
      time: "5h ago",
      icon: <TrendingUpIcon size={18} />,

      isRead: true,
      type: "goals",
    },
    {
      id: 5,
      title: "Coaching Session",
      message:
        "Your weekly coaching session with Sarah is scheduled for tomorrow at 3:00 PM.",
      time: "1d ago",
      icon: <CalendarIcon size={18} />,

      isRead: true,
      type: "coaching",
    },
    {
      id: 6,
      title: "Missed Check-in",
      message:
        "You missed your evening meditation check-in yesterday. Would you like to reschedule?",
      time: "1d ago",
      icon: <AlertCircleIcon size={18} />,

      isRead: false,
      type: "goals",
    },
    {
      id: 7,
      title: "New Badge Earned",
      message:
        "You've earned the 'Early Bird' badge for completing 5 morning goals before 8am!",
      time: "2d ago",
      icon: <AwardIcon size={18} />,

      isRead: true,
      type: "goals",
    },
  ];

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.isRead;
    return notification.type === activeTab;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <GradientBackground variant="blue" className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <BackButton to="/settings" label="Back" />
        <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
        <div className="w-10"></div> {/* Empty div for alignment */}
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-4 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-sky-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.id === "unread" ? `${tab.label} (${unreadCount})` : tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-auto">
        {filteredNotifications.length > 0 ? (
          <div className="space-y-3 pb-4">
            {filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                title={notification.title}
                message={notification.message}
                time={notification.time}
                icon={notification.icon}
                isRead={notification.isRead}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <BellIcon size={28} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">
              No notifications
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {activeTab === "unread"
                ? "You've read all your notifications"
                : "You don't have any notifications yet"}
            </p>
          </div>
        )}
      </div>

      {/* Mark All as Read Button */}
      {unreadCount > 0 && activeTab !== "read" && (
        <div className="mt-4 px-4">
          <button className="w-full py-2.5 bg-white text-sky-600 font-medium rounded-full border border-sky-200 hover:bg-sky-50 transition-colors">
            Mark all as read
          </button>
        </div>
      )}
    </GradientBackground>
  );
}
