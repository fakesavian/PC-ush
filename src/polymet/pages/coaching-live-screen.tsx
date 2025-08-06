import React, { useState } from "react";
import { Link } from "react-router-dom";
import GradientBackground from "@/polymet/components/gradient-background";
import BackButton from "@/polymet/components/back-button";
import CoachProfileCard from "@/polymet/components/coach-profile-card";
import SessionCard from "@/polymet/components/session-card";
import {
  SearchIcon,
  CalendarIcon,
  ArrowRightIcon,
  FilterIcon,
} from "lucide-react";

export default function CoachingLiveScreen() {
  const [activeTab, setActiveTab] = useState("sessions");

  const tabs = [
    { id: "sessions", label: "My Sessions" },
    { id: "coaches", label: "Find Coaches" },
  ];

  const coaches = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Wellness Coach",
      avatar: "https://github.com/denizbuyuktas.png",
      rating: 4.9,
      specialties: ["Fitness", "Nutrition", "Mindfulness"],
      isAvailable: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Career Development Coach",
      avatar: "https://github.com/furkanksl.png",
      rating: 4.7,
      specialties: ["Leadership", "Public Speaking", "Career Transitions"],
      isAvailable: false,
    },
    {
      id: 3,
      name: "Aisha Patel",
      title: "Life Balance Coach",
      avatar: "https://github.com/yahyabedirhan.png",
      rating: 4.8,
      specialties: ["Stress Management", "Work-Life Balance"],
      isAvailable: true,
    },
    {
      id: 4,
      name: "David Rodriguez",
      title: "Fitness & Nutrition Expert",
      avatar: "https://github.com/kdrnp.png",
      rating: 4.6,
      specialties: ["Weight Loss", "Strength Training", "Meal Planning"],
      isAvailable: false,
    },
  ];

  const sessions = [
    {
      id: 1,
      coachName: "Sarah Johnson",
      coachAvatar: "https://github.com/denizbuyuktas.png",
      date: "Today",
      time: "3:00 PM",
      duration: "30 min",
      topic: "Weekly Goal Review",
      isUpcoming: true,
    },
    {
      id: 2,
      coachName: "Michael Chen",
      coachAvatar: "https://github.com/furkanksl.png",
      date: "Tomorrow",
      time: "10:30 AM",
      duration: "45 min",
      topic: "Fitness Planning Session",
      isUpcoming: true,
    },
    {
      id: 3,
      coachName: "Aisha Patel",
      coachAvatar: "https://github.com/yahyabedirhan.png",
      date: "May 15, 2023",
      time: "2:00 PM",
      duration: "30 min",
      topic: "Stress Management Techniques",
      isUpcoming: false,
    },
    {
      id: 4,
      coachName: "David Rodriguez",
      coachAvatar: "https://github.com/kdrnp.png",
      date: "May 10, 2023",
      time: "4:15 PM",
      duration: "45 min",
      topic: "Nutrition Consultation",
      isUpcoming: false,
    },
  ];

  const upcomingSessions = sessions.filter((session) => session.isUpcoming);
  const pastSessions = sessions.filter((session) => !session.isUpcoming);

  return (
    <GradientBackground variant="blue" className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <BackButton to="/coaching-ai" label="Back" />

        <h1 className="text-xl font-bold text-gray-900">Live Coaching</h1>
        <Link
          to="/coaching-ai"
          className="text-sm text-sky-600 font-medium flex items-center"
        >
          AI Coaches <ArrowRightIcon size={16} className="ml-1" />
        </Link>
      </div>

      {/* Premium Badge */}
      <div className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-4 py-2 rounded-lg mb-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wide">
            Premium
          </span>
          <h3 className="font-medium">Live Coach Subscription</h3>
        </div>
        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
          Active
        </span>
      </div>

      {/* Tabs */}
      <div className="flex mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 py-2 text-center text-sm font-medium ${
              activeTab === tab.id
                ? "text-teal-600 border-b-2 border-teal-600"
                : "text-gray-600 border-b border-gray-200"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content based on active tab */}
      <div className="flex-1 overflow-auto">
        {activeTab === "sessions" ? (
          <div className="space-y-6 pb-4">
            {/* Schedule Button */}
            <button className="w-full flex items-center justify-center py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors">
              <CalendarIcon size={18} className="mr-2" />
              Schedule New Session
            </button>

            {/* Upcoming Sessions */}
            {upcomingSessions.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Upcoming Sessions
                </h2>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <SessionCard
                      key={session.id}
                      coachName={session.coachName}
                      coachAvatar={session.coachAvatar}
                      date={session.date}
                      time={session.time}
                      duration={session.duration}
                      topic={session.topic}
                      isUpcoming={true}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Past Sessions */}
            {pastSessions.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  Past Sessions
                </h2>
                <div className="space-y-4">
                  {pastSessions.map((session) => (
                    <SessionCard
                      key={session.id}
                      coachName={session.coachName}
                      coachAvatar={session.coachAvatar}
                      date={session.date}
                      time={session.time}
                      duration={session.duration}
                      topic={session.topic}
                      isUpcoming={false}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 pb-4">
            {/* Search and Filter */}
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <SearchIcon
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search for coaches..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                />
              </div>
              <button className="p-2.5 bg-white rounded-lg border border-gray-200">
                <FilterIcon size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Coach List */}
            <div className="space-y-4">
              {coaches.map((coach) => (
                <CoachProfileCard
                  key={coach.id}
                  name={coach.name}
                  title={coach.title}
                  avatar={coach.avatar}
                  rating={coach.rating}
                  specialties={coach.specialties}
                  isAvailable={coach.isAvailable}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </GradientBackground>
  );
}
