import { z } from "zod";

export const MACHINE_TYPES = [
  "Excavator",
  "Bulldozer",
  "Motor Grader",
  "Wheel Loader",
  "Dump Truck",
  "Crane",
  "Compactor",
  "Forklift",
  "Skid Steer Loader",
  "Backhoe Loader",
  "Paver",
  "Scraper",
  "Trencher",
  "Drilling Rig",
  "Other",
] as const;

export const MACHINE_MAKES = [
  "Caterpillar (CAT)",
  "Komatsu",
  "Hitachi",
  "Volvo Construction",
  "Liebherr",
  "John Deere",
  "Doosan",
  "Hyundai Construction",
  "JCB",
  "Case Construction",
  "XCMG",
  "SANY",
  "Kobelco",
  "Terex",
  "Other",
] as const;

export const CONDITIONS = [
  "New",
  "Used – Excellent",
  "Used – Good",
  "Used – Fair",
  "Certified Pre-Owned",
] as const;

export const PRICE_RANGES = [
  "Below ₦800,000",
  "₦800,000 – ₦1,500,000",
  "₦1,500,000 – ₦3,000,000",
  "₦3,000,000 – ₦5,000,000",
  "₦5,000,000 – ₦10,000,000",
  "₦10,000,000 – ₦25,000,000",
  "₦25,000,000 – ₦50,000,000",
  "Above ₦50,000,000",
  "Open to Negotiation",
] as const;

export const contactFormSchema = z.object({
  machineType: z.enum(MACHINE_TYPES, {
    error: "Please select a machine type.",
  }),
  numberOfUnits: z
    .number({ error: "Please enter the number of units." })
    .int("Must be a whole number.")
    .min(1, "Minimum 1 unit.")
    .max(500, "Please contact us directly for orders above 500 units."),
  make: z.enum(MACHINE_MAKES, {
    error: "Please select a machine make.",
  }),
  condition: z.enum(CONDITIONS, {
    error: "Please select a condition.",
  }),
  location: z
    .string()
    .min(2, "Please enter your location.")
    .max(100, "Location is too long."),
  description: z
    .string()
    .min(10, "Please provide at least a brief description.")
    .max(2000, "Description must be under 2000 characters."),
  priceRange: z.enum(PRICE_RANGES, {
    error: "Please select a price range.",
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
