import { DeliverySchedule } from "@/types/Subscription";

/**
 * Parse date string (YYYY-MM-DD) to Date object in local timezone
 * This prevents timezone issues when parsing ISO date strings
 */
function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  // Month is 0-indexed in Date constructor
  return new Date(year, month - 1, day);
}

/**
 * Calculate total price for custom subscription
 * Formula: Sum of (units per delivery day × price per unit) for all delivery days between startDate and endDate
 */
export function calculateCustomPrice(
  startDate: string,
  endDate: string,
  schedule: DeliverySchedule[],
  unitPrice: number
): number {
  // Validate inputs
  if (!startDate || !endDate || !schedule || schedule.length === 0) return 0;
  
  // Validate unitPrice
  const pricePerUnit = Number(unitPrice);
  if (!Number.isFinite(pricePerUnit) || pricePerUnit <= 0) return 0;

  // Parse dates in local timezone to avoid timezone issues
  const start = parseLocalDate(startDate);
  const end = parseLocalDate(endDate);

  // Validate parsed dates
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
  if (end < start) return 0;

  // Build unit map from schedule: dayOfWeek -> units per day
  const unitMap = new Map<number, number>();
  schedule.forEach(s => {
    const dayOfWeek = Number(s.dayOfWeek);
    const units = Number(s.units ?? 0);
    
    // Validate dayOfWeek (0-6) and units
    if (Number.isFinite(dayOfWeek) && dayOfWeek >= 0 && dayOfWeek <= 6) {
      if (Number.isFinite(units) && units > 0) {
        unitMap.set(dayOfWeek, units);
      }
    }
  });

  // If no valid schedule entries, return 0
  if (unitMap.size === 0) return 0;

  let total = 0;
  // Create date objects normalized to midnight to avoid time issues
  const startDateObj = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const endDateObj = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  
  // Calculate total days to ensure we iterate correctly
  const totalDays = Math.floor((endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  if (totalDays <= 0) return 0;

  // Iterate through each day from start to end (inclusive)
  // For each delivery day: add (units per day × price per unit) to total
  for (let i = 0; i < totalDays; i++) {
    const current = new Date(startDateObj);
    current.setDate(startDateObj.getDate() + i);
    
    const dayOfWeek = current.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Check if this day is a scheduled delivery day
    if (unitMap.has(dayOfWeek)) {
      const unitsPerDay = unitMap.get(dayOfWeek)!;
      
      // Calculate price for this delivery: units per day × price per unit
      const dayPrice = unitsPerDay * pricePerUnit;
      
      // Validate and add to total
      if (Number.isFinite(dayPrice) && dayPrice > 0) {
        total += dayPrice;
      }
    }
  }

  // Final validation and rounding to nearest integer (currency)
  if (!Number.isFinite(total) || total <= 0) return 0;
  return Math.round(total);
}
