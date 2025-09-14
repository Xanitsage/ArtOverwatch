import { 
  BarChart3, Briefcase, DollarSign, FolderOpen, Home, Palette, Settings, Shield, Users,
  Building, ArrowLeftRight, CreditCard, Target, Timer, TrendingUp, Play, PaintBucket
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useLocation, Link } from "react-router-dom";

const overviewItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

const corporateItems = [
  { title: "Ownership", url: "/ownership", icon: Briefcase },
  { title: "IP Management", url: "/ip", icon: Shield },
  { title: "Projects", url: "/projects", icon: FolderOpen },
  { title: "Community", url: "/community", icon: Users },
  { title: "Creative Studio", url: "/creative-studio", icon: Palette },
];

const entityItems = [
  { title: "Entity Overview", url: "/entities", icon: Building },
];

const treasuryItems = [
  { title: "Accounts", url: "/treasury/accounts", icon: DollarSign },
  { title: "Transfers", url: "/treasury/transfers", icon: ArrowLeftRight },
  { title: "Payments", url: "/treasury/payments", icon: CreditCard },
];

const studioItems = [
  { title: "Dashboard", url: "/studio/dashboard", icon: Target },
  { title: "Sessions", url: "/studio/sessions", icon: Timer },
  { title: "Goals & Streaks", url: "/studio/goals", icon: TrendingUp },
  { title: "Canvas", url: "/studio/canvas", icon: PaintBucket },
];

const businessItems = [
  { title: "Branding", url: "/branding", icon: Palette },
  { title: "Contracts", url: "/contracts", icon: Briefcase },
  { title: "Legal", url: "/legal", icon: Shield },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">G</span>
          </div>
          <div>
            <h1 className="font-semibold text-lg" data-testid="text-app-title">The Grid Atelier</h1>
            <p className="text-xs text-muted-foreground">Precision. Creativity. Collective.</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Overview Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {overviewItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    data-testid={`link-${item.title.toLowerCase().replace(' ', '-')}`}
                  >
                    <Link to={item.url}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 w-full"
                      >
                        <item.icon className="w-4 h-4" style={{display: 'block'}} />
                        <span>{item.title}</span>
                      </motion.div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Corporate Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Corporate</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {corporateItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Link to={item.url}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 w-full"
                      >
                        <item.icon className="w-4 h-4" style={{display: 'block'}} />
                        <span>{item.title}</span>
                      </motion.div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Entities Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Entities</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {entityItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname.startsWith("/entities")}
                    data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Link to={item.url}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 w-full"
                      >
                        <item.icon className="w-4 h-4" style={{display: 'block'}} />
                        <span>{item.title}</span>
                      </motion.div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Treasury Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Treasury</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {treasuryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    data-testid={`link-treasury-${item.title.toLowerCase()}`}
                  >
                    <Link to={item.url}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 w-full"
                      >
                        <item.icon className="w-4 h-4" style={{display: 'block'}} />
                        <span>{item.title}</span>
                      </motion.div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Studio Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Studio</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {studioItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    data-testid={`link-studio-${item.title.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`}
                  >
                    <Link to={item.url}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 w-full"
                      >
                        <item.icon className="w-4 h-4" style={{display: 'block'}} />
                        <span>{item.title}</span>
                      </motion.div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Business Operations Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Business Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {businessItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    data-testid={`link-${item.title.toLowerCase()}`}
                  >
                    <Link to={item.url}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 w-full"
                      >
                        <item.icon className="w-4 h-4" style={{display: 'block'}} />
                        <span>{item.title}</span>
                      </motion.div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}