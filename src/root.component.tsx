import { ThemeProvider, SidebarProvider, useSidebar } from "@valoro/ui";
import { AppSidebar } from "./components/app-sidebar";
import "./index.css";

export default function Root(props) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <SidebarListener>
          <AppSidebar variant="sidebar" />
        </SidebarListener>
      </SidebarProvider>
    </ThemeProvider>
  );
}

import React from "react";

function SidebarListener({ children }: { children: React.ReactNode }) {
  const { toggleSidebar } = useSidebar();

  React.useEffect(() => {
    const handleToggle = () => {
      toggleSidebar();
    };

    window.addEventListener("valoro:toggle-sidebar", handleToggle);
    return () => {
      window.removeEventListener("valoro:toggle-sidebar", handleToggle);
    };
  }, [toggleSidebar]);

  return <>{children}</>;
}
