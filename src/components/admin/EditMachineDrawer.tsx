"use client";

import { useState, useEffect } from "react";
import { Machine } from "@/types";
import { X, Plus, Trash, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const MAX_GALLERY_IMAGES = 5;

// ─── Spec field definitions ───────────────────────────────────────────────────
// null = free text only; string[] = dropdown with those options + "Enter manually" fallback
const SPEC_OPTIONS: Record<string, string[] | null> = {
  "Type": [
    "Excavator", "Bulldozer", "Wheel Loader", "Motor Grader", "Compactor",
    "Crane", "Swamp Buggy", "Dump Truck", "Backhoe Loader", "Skid Steer",
    "Forklift", "Articulated Truck", "Ripper",
  ],
  "Make": [
    "Caterpillar", "Komatsu", "Volvo", "Hitachi", "Liebherr", "Doosan",
    "Hyundai", "JCB", "Case", "John Deere", "SANY", "XCMG", "Kobelco",
    "Sumitomo", "Terex", "Bell Equipment",
  ],
  "Model": null,                // always free text
  "Condition": ["Brand New", "Foreign Used", "Nigerian Used", "Refurbished"],
  "Year of Manufacture": Array.from({ length: 2025 - 1979 }, (_, i) => String(2025 - i)),
  "Fuel Type": ["Diesel", "Petrol / Gasoline", "Electric", "Hybrid", "LPG"],
  "Bulldozer Type": ["Standard", "Swamp Buggy", "Angle Blade", "U-Blade", "S-Blade", "Landfill"],
  "Transmission": ["Manual", "Automatic", "Hydrostatic", "Powershift"],
  "Exchange Possible": ["Yes", "No"],
};

const DEFAULT_SPECS = Object.keys(SPEC_OPTIONS).map((label) => ({ label, value: "" }));

// ─── Smart spec-value input ───────────────────────────────────────────────────
const MANUAL_SENTINEL = "__manual__";

function SpecValueInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const options = SPEC_OPTIONS[label] ?? null;
  const isKnownValue = options?.includes(value) ?? false;

  // If the stored value is custom text (not in dropdown), start in manual mode
  const [manualMode, setManualMode] = useState(
    options !== null && value !== "" && !isKnownValue
  );

  const inputClass =
    "flex-1 bg-white/5 border border-white/10 p-2 text-sm text-white focus:border-[var(--gold)] outline-none min-w-0";

  // No dropdown options → plain text
  if (!options) {
    return (
      <input
        className={inputClass}
        placeholder="Value"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  if (manualMode) {
    return (
      <div className="flex-1 flex gap-2 min-w-0">
        <input
          className={inputClass}
          placeholder="Enter value manually"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
        />
        <button
          type="button"
          title="Back to dropdown"
          onClick={() => { setManualMode(false); onChange(""); }}
          className="text-xs text-white/40 hover:text-[var(--gold)] transition-colors whitespace-nowrap flex-shrink-0 px-1"
        >
          ↩ dropdown
        </button>
      </div>
    );
  }

  return (
    <select
      className={`${inputClass} appearance-none cursor-pointer`}
      value={value}
      onChange={(e) => {
        if (e.target.value === MANUAL_SENTINEL) {
          setManualMode(true);
          onChange("");
        } else {
          onChange(e.target.value);
        }
      }}
    >
      <option value="" disabled>Select…</option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-[#111] text-white">
          {opt}
        </option>
      ))}
      <option value={MANUAL_SENTINEL} className="bg-[#111] text-white/50 italic">
        — Enter manually —
      </option>
    </select>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface EditMachineDrawerProps {
  isOpen: boolean;
  machine?: Machine | null;
  onClose: () => void;
}

export default function EditMachineDrawer({ isOpen, machine, onClose }: EditMachineDrawerProps) {
  const [formData, setFormData] = useState<Partial<Machine>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Currency formatter
  const formatCurrency = (value: string) => {
    const number = value.replace(/[^0-9]/g, "");
    if (!number) return "";
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(parseInt(number));
  };

  useEffect(() => {
    if (isOpen) {
      if (machine) {
        setFormData({
          ...machine,
          specs: machine.specs || [],
          description: machine.description || "",
          gallery: machine.gallery || [],
        });
        setGalleryPreviews(machine.gallery || []);
      } else {
        // New item — pre-populate with default spec fields
        setFormData({
          name: "",
          category: "Excavator",
          price: "",
          status: "Available",
          description: "",
          specs: DEFAULT_SPECS,
          image: "",
          gallery: [],
        });
        setGalleryPreviews([]);
      }
      setImageFile(null);
      setGalleryFiles([]);
    }
  }, [isOpen, machine]);

  if (!isOpen) return null;

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setFormData({ ...formData, price: formatted });
  };

  const handleSpecChange = (index: number, field: "label" | "value", text: string) => {
    const newSpecs = [...(formData.specs || [])];
    newSpecs[index] = { ...newSpecs[index], [field]: text };
    setFormData({ ...formData, specs: newSpecs });
  };

  const addSpec = () => {
    setFormData({
      ...formData,
      specs: [...(formData.specs || []), { label: "", value: "" }],
    });
  };

  const removeSpec = (index: number) => {
    const newSpecs = [...(formData.specs || [])];
    newSpecs.splice(index, 1);
    setFormData({ ...formData, specs: newSpecs });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const currentTotal = galleryPreviews.length;
      const remaining = MAX_GALLERY_IMAGES - currentTotal;

      if (remaining <= 0) {
        alert(`Maximum ${MAX_GALLERY_IMAGES} gallery images allowed.`);
        return;
      }

      const files = Array.from(e.target.files).slice(0, remaining);
      setGalleryFiles((prev) => [...prev, ...files]);

      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setGalleryPreviews((prev) => [...prev, ...newPreviews]);

      if (Array.from(e.target.files).length > remaining) {
        alert(`Only ${remaining} more image(s) allowed. Some files were not added.`);
      }
    }
  };

  const removeGalleryImage = async (index: number) => {
    if (galleryPreviews[index].startsWith("blob:")) {
      const existingCount = formData.gallery?.length || 0;
      if (index < existingCount) {
        const urlToRemove = formData.gallery![index];
        const newGallery = [...(formData.gallery || [])];
        newGallery.splice(index, 1);
        setFormData({ ...formData, gallery: newGallery });
        const newPreviews = [...galleryPreviews];
        newPreviews.splice(index, 1);
        setGalleryPreviews(newPreviews);
        await cleanupOldImage(urlToRemove);
      } else {
        const newFileIndex = index - existingCount;
        const newFiles = [...galleryFiles];
        newFiles.splice(newFileIndex, 1);
        setGalleryFiles(newFiles);
        const newPreviews = [...galleryPreviews];
        newPreviews.splice(index, 1);
        setGalleryPreviews(newPreviews);
      }
    } else {
      const urlToRemove = galleryPreviews[index];
      const newGallery = (formData.gallery || []).filter((url) => url !== urlToRemove);
      setFormData({ ...formData, gallery: newGallery });
      const newPreviews = galleryPreviews.filter((_, i) => i !== index);
      setGalleryPreviews(newPreviews);
      await cleanupOldImage(urlToRemove);
    }
  };

  const cleanupOldImage = async (oldUrl: string) => {
    if (!oldUrl) return;
    try {
      const path = oldUrl.split("/inventory-images/")[1];
      if (path) await supabase.storage.from("inventory-images").remove([path]);
    } catch (err) {
      console.error("Error cleaning up image:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image;
      let galleryUrls = [...(formData.gallery || [])];

      // 1. Upload Main Image
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `main-${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("inventory-images")
          .upload(fileName, imageFile);
        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("inventory-images")
          .getPublicUrl(fileName);
        imageUrl = publicUrl;

        if (machine && machine.image && machine.image !== imageUrl) {
          await cleanupOldImage(machine.image);
        }
      }

      // 2. Upload Gallery Images
      if (galleryFiles.length > 0) {
        for (const file of galleryFiles) {
          const fileExt = file.name.split(".").pop();
          const fileName = `gallery-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          const { error: uploadError } = await supabase.storage
            .from("inventory-images")
            .upload(fileName, file);
          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from("inventory-images")
            .getPublicUrl(fileName);
          galleryUrls.push(publicUrl);
        }
      }

      const machineData = {
        name: formData.name,
        price: formData.price,
        category: formData.category,
        status: formData.status,
        description: formData.description,
        specs: formData.specs,
        image: imageUrl,
        gallery: galleryUrls,
      };

      let result;
      if (machine) {
        result = await supabase.from("inventory").update(machineData).eq("id", machine.id);
      } else {
        result = await supabase.from("inventory").insert([machineData]);
      }

      if (result.error) throw result.error;

      router.refresh();
      onClose();
    } catch (error: any) {
      alert("Error saving: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full md:max-w-2xl bg-[#111] border-l border-white/10 h-full overflow-y-auto p-5 md:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-8 text-white">
          {machine ? "Edit Machine" : "Add New Machine"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-white/40 mb-2">Name</label>
              <input
                required
                className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-[var(--gold)] outline-none"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-white/40 mb-2">Category</label>
              <select
                className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-[var(--gold)] outline-none"
                value={formData.category || ""}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Excavator" className="bg-[#111] text-white">Excavator</option>
                <option value="Bulldozer" className="bg-[#111] text-white">Bulldozer</option>
                <option value="Loader" className="bg-[#111] text-white">Loader</option>
                <option value="Grader" className="bg-[#111] text-white">Grader</option>
                <option value="Compactor" className="bg-[#111] text-white">Compactor</option>
                <option value="Crane" className="bg-[#111] text-white">Crane</option>
                <option value="Swamp Buggy" className="bg-[#111] text-white">Swamp Buggy</option>
                <option value="Dump Truck" className="bg-[#111] text-white">Dump Truck</option>
                <option value="Other" className="bg-[#111] text-white">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-white/40 mb-2">Price</label>
              <input
                required
                className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-[var(--gold)] outline-none"
                value={formData.price || ""}
                onChange={handlePriceChange}
                placeholder="e.g. ₦15,000,000"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-white/40 mb-2">Status</label>
              <select
                className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-[var(--gold)] outline-none"
                value={formData.status || ""}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Available" className="bg-[#111] text-white">Available</option>
                <option value="Sold" className="bg-[#111] text-white">Sold</option>
                <option value="Pending" className="bg-[#111] text-white">Pending</option>
              </select>
            </div>
          </div>

          {/* Main Image Upload */}
          <div>
            <label className="block text-xs font-bold uppercase text-white/40 mb-2">
              Main Image (Thumbnail)
            </label>
            <div className="flex items-center gap-4 flex-wrap">
              {formData.image && (
                <div className="w-20 h-20 bg-white/5 border border-white/10 relative flex-shrink-0">
                  <img src={formData.image} className="w-full h-full object-cover" alt="thumbnail" />
                </div>
              )}
              <label className="flex items-center gap-2 cursor-pointer bg-white/10 px-4 py-2 hover:bg-white/20 transition-colors">
                <Upload size={16} />
                <span className="text-sm font-bold">CHOOSE IMAGE</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
              {imageFile && (
                <span className="text-xs text-white/60 truncate max-w-[160px]">{imageFile.name}</span>
              )}
            </div>
          </div>

          {/* Gallery Upload */}
          <div>
            <label className="block text-xs font-bold uppercase text-white/40 mb-2">
              Gallery Images
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {galleryPreviews.map((src, idx) => (
                <div key={idx} className="relative aspect-square bg-white/5 border border-white/10 group">
                  <img src={src} className="w-full h-full object-cover" alt="" />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              {galleryPreviews.length < MAX_GALLERY_IMAGES && (
                <label className="flex flex-col items-center justify-center cursor-pointer bg-white/5 border border-dashed border-white/20 hover:bg-white/10 transition-colors aspect-square text-white/40 hover:text-[var(--gold)]">
                  <ImageIcon size={24} className="mb-2" />
                  <span className="text-xs font-bold text-center">ADD PHOTOS</span>
                  <input type="file" className="hidden" accept="image/*" multiple onChange={handleGalleryChange} />
                </label>
              )}
            </div>
            <p className="text-xs text-white/30 italic">
              Upload up to {MAX_GALLERY_IMAGES} images. ({galleryPreviews.length}/{MAX_GALLERY_IMAGES})
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase text-white/40 mb-2">Description</label>
            <textarea
              className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-[var(--gold)] outline-none min-h-[100px]"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter detailed description..."
            />
          </div>

          {/* Technical Specifications */}
          <div>
            <div className="flex items-center justify-between mb-4 mt-8 pt-8 border-t border-white/10">
              <div>
                <h3 className="font-bold text-white">Technical Specifications</h3>
                <p className="text-xs text-white/30 mt-0.5">
                  Default fields pre-filled — select from dropdown or enter manually.
                </p>
              </div>
              <button
                type="button"
                onClick={addSpec}
                className="flex items-center gap-1 text-[var(--gold)] text-xs font-bold hover:underline flex-shrink-0 ml-4"
              >
                <Plus size={14} /> ADD ROW
              </button>
            </div>

            <div className="space-y-2">
              {formData.specs?.map((spec, i) => (
                <div key={i} className="flex flex-wrap sm:flex-nowrap gap-2 md:gap-3 items-start">
                  {/* Label */}
                  <input
                    className="w-full sm:w-40 flex-shrink-0 bg-white/5 border border-white/10 p-2 text-sm text-white focus:border-[var(--gold)] outline-none"
                    placeholder="Label (e.g. Engine)"
                    value={spec.label}
                    onChange={(e) => handleSpecChange(i, "label", e.target.value)}
                  />

                  {/* Smart value input */}
                  <SpecValueInput
                    label={spec.label}
                    value={spec.value}
                    onChange={(v) => handleSpecChange(i, "value", v)}
                  />

                  {/* Remove row */}
                  <button
                    type="button"
                    onClick={() => removeSpec(i)}
                    className="text-red-500 hover:text-red-400 p-2 flex-shrink-0"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))}
              {formData.specs?.length === 0 && (
                <p className="text-white/20 text-sm italic">
                  No specifications added. Click &quot;ADD ROW&quot; to start.
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-8 border-t border-white/10 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-white/60 font-bold text-sm hover:text-white transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-[var(--gold)] text-black font-bold text-sm hover:bg-[var(--gold-hover)] transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "SAVING..." : "SAVE CHANGES"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
