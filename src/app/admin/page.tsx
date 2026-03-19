import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Plus, LogOut } from "lucide-react";
import InventoryList from "@/components/admin/InventoryList";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Create a server-side query to check session
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/admin/login");
  }

  // Fetch real inventory data
  const { data: machines } = await supabase
    .from('inventory')
    .select('*')
    .order('id', { ascending: true });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Admin Nav */}
      <nav className="border-b border-white/10 bg-[#111]">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <span className="font-bold tracking-widest">THREE HILLS ADMIN</span>
            <div className="flex items-center gap-4">
                <span className="text-sm text-white/50">{user.email}</span>
                <form action="/auth/signout" method="post">
                    <button className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-400">
                        <LogOut size={14} /> SIGNOUT
                    </button>
                </form>
            </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">

        {/* Inventory List Client Component */}
        <InventoryList initialMachines={machines || []} />
        
      </div>
    </div>
  );
}
