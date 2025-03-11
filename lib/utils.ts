import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateExperience(startDate: Date): string {
  const currentDate = new Date()
  const diffInMilliseconds = currentDate.getTime() - startDate.getTime()
  const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)

  // Format to 1 decimal place
  return diffInYears.toFixed(1)
}

