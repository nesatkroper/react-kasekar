import React from "react";
import axiosAuth from "@/lib/axios-auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { BadgeCheck, ChevronsUpDown, CreditCard, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import AccountInfo from "@/pages/account";
import { clearAuthData, getAuthData } from "@/providers/user-provider";

export const image =
  "https://cdn.i-scmp.com/sites/default/files/styles/1020x680/public/d8/images/canvas/2025/02/14/399a4243-c5ea-41f9-bdb0-47ca4a00132c_a775a7ba.jpg?itok=oTQYtIbb&v=1739524311";

export function NavUser() {
  const navigate = useNavigate();
  const user = getAuthData();
  const { isMobile } = useSidebar();

  const fullName =
    user.employee?.firstName && user.employee?.lastName
      ? `${user.employee.firstName} ${user.employee.lastName}`
      : "Admin";

  const handleLogout = async () => {
    try {
      clearAuthData();
      Cookies.remove("token");
      Cookies.remove("auth-info");
      navigate("/auth");
      window.location.reload();
      await axiosAuth.post("/auth/logout");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage src={image} alt={user?.authId} />
                <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{fullName != undefined ? fullName : "Admin"}</span>
                <span className='truncate text-xs'>{user?.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? "bottom" : "right"}
            align='end'
            sideOffset={4}>
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage src={image} alt={fullName} />
                  <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>{fullName != undefined ? fullName : "Admin"}</span>
                  <span className='truncate text-xs'>{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <AlertDialog>
                  <AlertDialogTrigger className='w-full flex gap-3'>
                    <BadgeCheck size={18} />
                    Account
                  </AlertDialogTrigger>
                  <AccountInfo />
                </AlertDialog>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <AlertDialog>
                  <AlertDialogTrigger className='w-full flex gap-3'>
                    <CreditCard size={18} />
                    Billing
                  </AlertDialogTrigger>
                </AlertDialog>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

