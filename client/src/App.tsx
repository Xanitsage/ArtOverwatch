import { Routes, Route, useLocation } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { EntityProvider } from "@/contexts/EntityContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { EntitySwitcher } from "@/components/EntitySwitcher";
import DashboardOverview from "@/components/DashboardOverview";
import CorporateOwnership from "@/components/CorporateOwnership";
import IPManagement from "@/components/IPManagement";
import TreasuryDashboard from "@/components/TreasuryDashboard";
import ProjectManager from "@/components/ProjectManager";
import BrandingStudio from "@/components/BrandingStudio";
import UserProfile from "@/components/UserProfile";
import AnalyticsPage from "@/pages/AnalyticsPage";
import CommunityPage from "@/pages/CommunityPage";
import ContractsPage from "@/pages/ContractsPage";
import TreasuryAccounts from "@/pages/TreasuryAccounts";
import TreasuryTransfers from "@/pages/TreasuryTransfers";
import TreasuryPayments from "@/pages/TreasuryPayments";
import StudioDashboard from "@/pages/StudioDashboard";
import StudioSessions from "@/pages/StudioSessions";
import StudioGoals from "@/pages/StudioGoals";
import EntityOverview from "@/pages/EntityOverview";
import LegalPage from "@/pages/LegalPage";
import NotFound from "@/pages/not-found";
import LaunchScreen from "@/pages/LaunchScreen";
import WelcomePage from "@/pages/WelcomePage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Router() {
  return (
    <Routes>
      {/* Authentication and Onboarding */}
      <Route path="/" element={<LaunchScreen />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
      {/* Main App Routes */}
      <Route path="/dashboard" element={<DashboardOverview />} />
      <Route path="/ownership" element={<CorporateOwnership />} />
      <Route path="/ip" element={<IPManagement />} />
      <Route path="/projects" element={<ProjectManager />} />
      <Route path="/branding" element={<BrandingStudio />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/contracts" element={<ContractsPage />} />
      <Route path="/legal" element={<LegalPage />} />
      <Route path="/entities" element={<EntityOverview />} />
      
      {/* Treasury Suite */}
      <Route path="/treasury" element={<TreasuryAccounts />} />
      <Route path="/treasury/accounts" element={<TreasuryAccounts />} />
      <Route path="/treasury/transfers" element={<TreasuryTransfers />} />
      <Route path="/treasury/payments" element={<TreasuryPayments />} />
      
      {/* Studio Suite */}
      <Route path="/studio" element={<StudioDashboard />} />
      <Route path="/studio/dashboard" element={<StudioDashboard />} />
      <Route path="/studio/sessions" element={<StudioSessions />} />
      <Route path="/studio/goals" element={<StudioGoals />} />
      
      <Route path="/settings" element={<UserProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };
  
  const location = useLocation();
  
  // Check if the current route is one of the authentication routes
  const isAuthRoute = ["/", "/welcome", "/login", "/signup", "/forgot-password"].includes(location.pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <EntityProvider>
          {isAuthRoute ? (
            // Render just the router for authentication routes
            <Router />
          ) : (
            // Render the full app layout for authenticated routes
            <SidebarProvider style={style as React.CSSProperties}>
              <div className="flex h-screen w-full">
                <AppSidebar />
                <div className="flex flex-col flex-1">
                  <motion.header 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                  >
                    <div className="flex items-center gap-4">
                      <SidebarTrigger data-testid="button-sidebar-toggle" />
                      <EntitySwitcher />
                    </div>
                    <div className="flex items-center gap-4">
                      <ThemeToggle />
                    </div>
                  </motion.header>
                  <motion.main 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex-1 overflow-auto p-8"
                  >
                    <Router />
                  </motion.main>
                </div>
              </div>
            </SidebarProvider>
          )}
        </EntityProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
