"use client";

import { useState, useEffect } from "react";
import { Machine } from "@/types";
import EditMachineDrawer from "./EditMachineDrawer";
import { Plus, Trash, Edit } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

interface InventoryListProps {
  initialMachines: Machine[];
}

export default function InventoryList({ initialMachines }: InventoryListProps) {
  const [machines, setMachines] = useState<Machine[]>(initialMachines);
  const [editingMachine, setEditingMachine] = useState<Machine | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    setMachines(initialMachines);
  }, [initialMachines]);

  const handleCreate = () => {
    setEditingMachine(null);
    setIsDrawerOpen(true);
  };

  const handleEdit = (machine: Machine) => {
    setEditingMachine(machine);
    setIsDrawerOpen(true);
  };

  const handleDelete = async (machine: Machine) => {
    if (!confirm(`Are you sure you want to delete ${machine.name}?`)) return;

    // Optimistic Update
    const previousMachines = machines;
    setMachines(machines.filter(m => m.id !== machine.id));

    try {
        // 1. Delete Record FIRST (critical operation)
        const { error, count } = await supabase
            .from('inventory')
            .delete()
            .eq('id', machine.id);

        if (error) throw error;

        // 2. Cleanup Images (best-effort, after successful delete)
        try {
            const pathsToDelete: string[] = [];
            
            if (machine.image) {
                const path = machine.image.split('/inventory-images/')[1];
                if (path) pathsToDelete.push(path);
            }

            if (machine.gallery && machine.gallery.length > 0) {
                machine.gallery.forEach(url => {
                    const path = url.split('/inventory-images/')[1];
                    if (path) pathsToDelete.push(path);
                });
            }

            if (pathsToDelete.length > 0) {
                await supabase.storage.from('inventory-images').remove(pathsToDelete);
            }
        } catch (cleanupErr) {
            console.warn("Image cleanup failed (non-critical):", cleanupErr);
        }

        router.refresh();
    } catch (err: any) {
        // Revert on error
        setMachines(previousMachines);
        alert("Error deleting item: " + err.message);
    }
  };
  
  return (
    <>
        {/* Header */}
        <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">Inventory Management</h1>
            <button
                onClick={handleCreate}
                className="flex items-center gap-2 bg-[var(--gold)] text-black px-4 py-2 font-bold text-sm hover:bg-[var(--gold-hover)] transition-colors whitespace-nowrap"
            >
                <Plus size={16} /> ADD ITEM
            </button>
        </div>

        {/* ── Desktop Table (md+) ── */}
        <div className="hidden md:block bg-[#111] border border-white/5">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 text-xs font-bold text-white/40 uppercase tracking-widest">
                <div className="col-span-1">ID</div>
                <div className="col-span-1">Image</div>
                <div className="col-span-4">Name</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-2 text-right">Actions</div>
            </div>

            {machines.length === 0 ? (
                <div className="p-8 text-center text-white/30 italic">
                    No items found. Click &quot;Add Item&quot; to start.
                </div>
            ) : (
                machines.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 items-center hover:bg-white/5 transition-colors">
                        <div className="col-span-1 text-white/40 text-sm">#{item.id}</div>
                        <div className="col-span-1">
                            <div className="w-10 h-10 bg-white/10 rounded-sm overflow-hidden border border-white/10">
                                {item.image ? (
                                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-white/5" />
                                )}
                            </div>
                        </div>
                        <div className="col-span-4 font-medium text-white truncate">{item.name}</div>
                        <div className="col-span-2 text-sm text-white/60">{item.category}</div>
                        <div className="col-span-2 text-sm text-[var(--gold)] truncate">{item.price}</div>
                        <div className="col-span-2 flex justify-end gap-2">
                            <button
                                onClick={() => handleEdit(item)}
                                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                title="Edit"
                            >
                                <Edit size={16} />
                            </button>
                            <button
                                onClick={() => handleDelete(item)}
                                className="p-2 text-white/60 hover:text-red-500 hover:bg-white/10 rounded-full transition-colors"
                                title="Delete"
                            >
                                <Trash size={16} />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>

        {/* ── Mobile Cards (< md) ── */}
        <div className="md:hidden space-y-3">
            {machines.length === 0 ? (
                <div className="p-8 text-center text-white/30 italic bg-[#111] border border-white/5">
                    No items found. Click &quot;Add Item&quot; to start.
                </div>
            ) : (
                machines.map((item) => (
                    <div key={item.id} className="bg-[#111] border border-white/5 p-4 flex gap-4 items-start">
                        {/* Thumbnail */}
                        <div className="w-14 h-14 flex-shrink-0 bg-white/10 rounded-sm overflow-hidden border border-white/10">
                            {item.image ? (
                                <img src={item.image} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-white/5" />
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-white text-sm truncate">{item.name}</p>
                            <p className="text-xs text-white/50 mt-0.5">{item.category} · <span className="text-white/30">#{item.id}</span></p>
                            <p className="text-xs text-[var(--gold)] mt-1 font-medium">{item.price}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-1 flex-shrink-0">
                            <button
                                onClick={() => handleEdit(item)}
                                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                                title="Edit"
                            >
                                <Edit size={16} />
                            </button>
                            <button
                                onClick={() => handleDelete(item)}
                                className="p-2 text-white/60 hover:text-red-500 hover:bg-white/10 rounded-full transition-colors"
                                title="Delete"
                            >
                                <Trash size={16} />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>

        {/* Drawer for Editing/Creating */}
        <EditMachineDrawer
            isOpen={isDrawerOpen}
            machine={editingMachine}
            onClose={() => setIsDrawerOpen(false)}
        />
    </>
  );
}
