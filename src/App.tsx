import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "@/polymet/layouts/app-layout";
import OnboardingSplash from "@/polymet/pages/onboarding-splash";
import GoalCreation from "@/polymet/pages/goal-creation";
import ProgressDashboard from "@/polymet/pages/progress-dashboard";
import MoodTracking from "@/polymet/pages/mood-tracking";
import MoodSearch from "@/polymet/pages/mood-search";
import MoodDetail from "@/polymet/pages/mood-detail";
import SettingsScreen from "@/polymet/pages/settings-screen";
import NotificationsScreen from "@/polymet/pages/notifications-screen";
import CoachingAiScreen from "@/polymet/pages/coaching-ai-screen";
import CoachingLiveScreen from "@/polymet/pages/coaching-live-screen";
import WisdomLibrary from "@/polymet/pages/wisdom-library";
import WisdomArticle from "@/polymet/pages/wisdom-article";
import AiCoachChat from "@/polymet/pages/ai-coach-chat";
import GpsAuditOnboarding from "@/polymet/pages/gps-audit-onboarding";
import ReflectionArchive from "@/polymet/pages/reflection-archive";
import StageTracks from "@/polymet/pages/stage-tracks";
import FutureSelfBoard from "@/polymet/pages/future-self-board";
import FutureBoardPage from "@/polymet/pages/future-board";
import Wallet from "@/polymet/pages/wallet";
import BadgesPage from "@/polymet/pages/badges";

export default function PocketCoachPrototype() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout>
              <OnboardingSplash />
            </AppLayout>
          }
        />

        <Route
          path="/goal-creation"
          element={
            <AppLayout>
              <GoalCreation />
            </AppLayout>
          }
        />

        <Route
          path="/progress-dashboard"
          element={
            <AppLayout>
              <ProgressDashboard />
            </AppLayout>
          }
        />

        <Route
          path="/mood-tracking"
          element={
            <AppLayout>
              <MoodTracking />
            </AppLayout>
          }
        />

        <Route
          path="/mood-search"
          element={
            <AppLayout>
              <MoodSearch />
            </AppLayout>
          }
        />

        <Route
          path="/mood-detail"
          element={
            <AppLayout>
              <MoodDetail />
            </AppLayout>
          }
        />

        <Route
          path="/settings"
          element={
            <AppLayout>
              <SettingsScreen />
            </AppLayout>
          }
        />

        <Route
          path="/notifications"
          element={
            <AppLayout>
              <NotificationsScreen />
            </AppLayout>
          }
        />

        <Route
          path="/coaching-ai"
          element={
            <AppLayout>
              <CoachingAiScreen />
            </AppLayout>
          }
        />

        <Route
          path="/coaching-live"
          element={
            <AppLayout>
              <CoachingLiveScreen />
            </AppLayout>
          }
        />

        {/* New AI Coach Chat route */}
        <Route
          path="/coaching-ai/:coachId"
          element={
            <AppLayout>
              <AiCoachChat />
            </AppLayout>
          }
        />

        {/* GPS Audit route */}
        <Route
          path="/gps-audit"
          element={
            <AppLayout>
              <GpsAuditOnboarding />
            </AppLayout>
          }
        />

        {/* Wisdom routes */}
        <Route
          path="/wisdom"
          element={
            <AppLayout>
              <WisdomLibrary />
            </AppLayout>
          }
        />

        <Route
          path="/wisdom/:articleId"
          element={
            <AppLayout>
              <WisdomArticle />
            </AppLayout>
          }
        />

        {/* Reflection Archive route */}
        <Route
          path="/reflection-archive"
          element={
            <AppLayout>
              <ReflectionArchive />
            </AppLayout>
          }
        />

        {/* Stage Tracks route */}
        <Route
          path="/stage-tracks"
          element={
            <AppLayout>
              <StageTracks />
            </AppLayout>
          }
        />

        {/* Future-Self Board route */}
        <Route
          path="/future-self-board"
          element={
            <AppLayout>
              <FutureSelfBoard />
            </AppLayout>
          }
        />

        {/* Future Board route */}
        <Route
          path="/future-board"
          element={
            <AppLayout>
              <FutureBoardPage />
            </AppLayout>
          }
        />

        {/* Wallet route */}
        <Route
          path="/wallet"
          element={
            <AppLayout>
              <Wallet />
            </AppLayout>
          }
        />

        {/* Badges route */}
        <Route
          path="/badges"
          element={
            <AppLayout>
              <BadgesPage />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
}
