"use client";

// ─── Feature flag ────────────────────────────────────────────────────────────
// Set to `true` once the client has paid for the email functionality.
const CONTACT_ENABLED = false;

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  contactFormSchema,
  ContactFormData,
  MACHINE_TYPES,
  MACHINE_MAKES,
  CONDITIONS,
  PRICE_RANGES,
} from "@/lib/contact.schema";
import { useState } from "react";
import { CheckCircle, AlertCircle, Loader2, Send } from "lucide-react";

// ─── Reusable sub-components ────────────────────────────────────────────────

function Label({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2"
    >
      {children}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
      <AlertCircle size={12} />
      {message}
    </p>
  );
}

const inputBase =
  "w-full bg-[#0d0d0d] border border-white/10 text-white placeholder-white/20 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors duration-200";

const selectBase = `${inputBase} appearance-none cursor-pointer`;

function SelectField({
  id,
  options,
  placeholder,
  error,
  ...rest
}: {
  id: string;
  options: readonly string[];
  placeholder: string;
  error?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select id={id} className={selectBase} {...rest}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {/* Custom chevron */}
      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/30">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <FieldError message={error} />
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    if (!CONTACT_ENABLED) return; // email not yet activated
    setStatus("loading");
    setServerError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error ?? "Something went wrong.");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-[var(--background)] relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-[var(--gold)] opacity-[0.03] -skew-x-12 z-0" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-[var(--gold)] text-sm font-bold uppercase tracking-widest mb-3">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            REQUEST A <span className="text-[var(--gold)]">MACHINE.</span>
          </h2>
          <p className="text-white/50 text-lg font-light max-w-xl">
            Tell us what you need and we&apos;ll get back to you with
            availability and pricing.
          </p>
        </motion.div>

        {/* Success State */}
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center gap-4 py-20 border border-[var(--gold)]/20 bg-[var(--card)]"
          >
            <CheckCircle className="text-[var(--gold)]" size={48} strokeWidth={1.5} />
            <h3 className="text-2xl font-bold text-white">Enquiry Sent!</h3>
            <p className="text-white/50 text-center max-w-sm">
              We&apos;ve received your request. Our team will be in touch
              shortly.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-4 text-[var(--gold)] text-sm font-bold uppercase tracking-widest hover:underline"
            >
              Submit Another Enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Machine Type */}
              <div>
                <Label htmlFor="machineType">Type of Machine</Label>
                <SelectField
                  id="machineType"
                  placeholder="Select machine type"
                  options={MACHINE_TYPES}
                  error={errors.machineType?.message}
                  defaultValue=""
                  {...register("machineType")}
                />
              </div>

              {/* Number of Units */}
              <div>
                <Label htmlFor="numberOfUnits">Number of Units</Label>
                <input
                  id="numberOfUnits"
                  type="number"
                  min={1}
                  placeholder="e.g. 2"
                  className={inputBase}
                  {...register("numberOfUnits", { valueAsNumber: true })}
                />
                <FieldError message={errors.numberOfUnits?.message} />
              </div>

              {/* Make */}
              <div>
                <Label htmlFor="make">Make / Brand</Label>
                <SelectField
                  id="make"
                  placeholder="Select a make"
                  options={MACHINE_MAKES}
                  error={errors.make?.message}
                  defaultValue=""
                  {...register("make")}
                />
              </div>

              {/* Condition */}
              <div>
                <Label htmlFor="condition">Condition</Label>
                <SelectField
                  id="condition"
                  placeholder="Select condition"
                  options={CONDITIONS}
                  error={errors.condition?.message}
                  defaultValue=""
                  {...register("condition")}
                />
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location">Your Location</Label>
                <input
                  id="location"
                  type="text"
                  placeholder="e.g. Lagos, Nigeria"
                  className={inputBase}
                  {...register("location")}
                />
                <FieldError message={errors.location?.message} />
              </div>

              {/* Price Range */}
              <div>
                <Label htmlFor="priceRange">Budget / Price Range</Label>
                <SelectField
                  id="priceRange"
                  placeholder="Select price range"
                  options={PRICE_RANGES}
                  error={errors.priceRange?.message}
                  defaultValue=""
                  {...register("priceRange")}
                />
              </div>

              {/* Description – full width */}
              <div className="md:col-span-2">
                <Label htmlFor="description">Detailed Description</Label>
                <textarea
                  id="description"
                  rows={5}
                  placeholder="Describe specifications, intended use, any specific requirements..."
                  className={`${inputBase} resize-y`}
                  {...register("description")}
                />
                <FieldError message={errors.description?.message} />
              </div>
            </div>

            {/* Server-level error */}
            {status === "error" && serverError && (
              <div className="mt-6 flex items-center gap-2 text-sm text-red-400 border border-red-400/20 bg-red-400/5 px-4 py-3">
                <AlertCircle size={16} />
                {serverError}
              </div>
            )}

            {/* Submit */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={status === "loading" || !CONTACT_ENABLED}
                title={!CONTACT_ENABLED ? "Email functionality coming soon" : undefined}
                className="
                  inline-flex items-center gap-3 bg-[var(--gold)] text-black
                  font-black text-sm uppercase tracking-widest px-10 py-4
                  hover:bg-[var(--gold-hover)] transition-colors duration-200
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Enquiry
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
