import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/app/sidebar/nav-main";
import { NavProjects } from "@/components/app/sidebar/nav-projects";
import { NavUser } from "@/components/app/sidebar/nav-user";
import { TeamSwitcher } from "@/components/app/sidebar/team-switcher";
import { data } from "./sidebar-data";
import React from "react";

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible='icon' {...props} className='z-20 bg-background'>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className='gap-0'>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
