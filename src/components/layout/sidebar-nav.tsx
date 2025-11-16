'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Map,
  Star,
  Waypoints,
  Smartphone,
  LocateFixed,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/recommendations', label: 'Plan Route', icon: Waypoints },
  { href: '/locate', label: 'Find a Ride', icon: LocateFixed },
  { href: '/rate', label: 'Rate a Stop', icon: Star },
  { href: '/ussd', label: 'USSD Access', icon: Smartphone },
];

export function SidebarNav() {
  const { isMobile, setOpenMobile } = useSidebar();
  const pathname = usePathname();

  const closeSidebar = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
            <Map className="size-8 text-accent" />
            <h1 className="text-xl font-bold font-headline text-primary-foreground">AbiliMove</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === link.href}
                onClick={closeSidebar}
                tooltip={{
                  children: link.label,
                }}
              >
                <Link href={link.href}>
                  <link.icon />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
