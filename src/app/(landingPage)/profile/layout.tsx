import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import ProfileSidebar from "./_components/profile-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex gap-5">
      <ProfileSidebar />
      <div className="w-full">{children}</div>
    </main>
  );
}
