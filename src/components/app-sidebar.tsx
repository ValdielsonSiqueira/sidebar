import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconHelp,
  IconListDetails,
  IconSettings,
} from "@tabler/icons-react";
import logoLight from "../assets/logo-light.svg";
import logoDark from "../assets/logo-dark.svg";

import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import { ProfileDialog } from "./profile-dialog";
import { HelpDialog } from "./help-dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useTheme,
} from "@valoro/ui";
import { getUserProfile, UserProfile } from "@FIAP/util";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { theme } = useTheme();
  const logoSrc = theme === "light" ? logoLight : logoDark;
  const [user, setUser] = React.useState<UserProfile>(() => getUserProfile());
  const [isProfileDialogOpen, setIsProfileDialogOpen] = React.useState(false);
  const [isHelpDialogOpen, setIsHelpDialogOpen] = React.useState(false);

  React.useEffect(() => {
    setUser(getUserProfile());
  }, []);

  const handleProfileUpdate = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    window.dispatchEvent(
      new CustomEvent("userProfileUpdated", { detail: updatedUser })
    );
  };

  const handleConfiguracoesClick = () => {
    setIsProfileDialogOpen(true);
  };

  const handleAjudaClick = () => {
    setIsHelpDialogOpen(true);
  };

  const data = {
    user: {
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
    navMain: [
      {
        title: "Dashboard",
        url: "#",
        icon: IconDashboard,
      },
      {
        title: "Movimentações",
        url: "#",
        icon: IconChartBar,
      },
      {
        title: "Transações",
        url: "#",
        icon: IconListDetails,
      },
      {
        title: "Extrato",
        url: "#",
        icon: IconChartBar,
      },
      {
        title: "Outros Serviços",
        url: "#",
        icon: IconFolder,
      },
    ],
    navSecondary: [
      {
        title: "Configurações",
        url: "#",
        icon: IconSettings,
      },
      {
        title: "Ajuda",
        url: "#",
        icon: IconHelp,
      },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-6"
            >
              <a href="/">
                <img src={logoSrc} alt="Valoro" width={45} height={45} />
                <span className="text-base font-semibold">Valoro</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary
          items={data.navSecondary}
          className="mt-auto"
          onConfiguracoesClick={handleConfiguracoesClick}
          onAjudaClick={handleAjudaClick}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} onProfileUpdate={handleProfileUpdate} />
      </SidebarFooter>
      <ProfileDialog
        open={isProfileDialogOpen}
        onOpenChange={setIsProfileDialogOpen}
        onProfileUpdate={handleProfileUpdate}
      />
      <HelpDialog open={isHelpDialogOpen} onOpenChange={setIsHelpDialogOpen} />
    </Sidebar>
  );
}
