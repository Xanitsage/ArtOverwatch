import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import DashboardOverview from "@/components/DashboardOverview";
import IPManagement from "@/components/IPManagement";
import TreasuryDashboard from "@/components/TreasuryDashboard";
import ProjectManager from "@/components/ProjectManager";
import BrandingStudio from "@/components/BrandingStudio";
import UserProfile from "@/components/UserProfile";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={DashboardOverview} />
      <Route path="/ip" component={IPManagement} />
      <Route path="/treasury" component={TreasuryDashboard} />
      <Route path="/projects" component={ProjectManager} />
      <Route path="/branding" component={BrandingStudio} />
      <Route path="/analytics" component={DashboardOverview} />
      <Route path="/community" component={DashboardOverview} />
      <Route path="/contracts" component={DashboardOverview} />
      <Route path="/legal" component={DashboardOverview} />
      <Route path="/settings" component={UserProfile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1">
              <header className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <div className="flex items-center gap-4">
                  <ThemeToggle />
                </div>
              </header>
              <main className="flex-1 overflow-auto p-8">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
