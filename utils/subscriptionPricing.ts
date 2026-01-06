export interface DeliverySchedule {
  dayOfWeek: number;  
  units: number;
}

export function calculateCustomPrice(
  startDate: string,
  endDate: string,
  schedule: DeliverySchedule[],
  unitPrice: number
): number {
  const start = new Date(startDate);
  const end = new Date(endDate);

  let total = 0;

  for (
    let date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    const day = date.getDay();
    const match = schedule.find(s => s.dayOfWeek === day);

    if (match) {
      total += match.units * unitPrice;
    }
  }

  return total;
}
