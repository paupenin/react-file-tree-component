export function dateToDateTime(date: Date): string {
  return date.toISOString().slice(0, -5).replace('T', ' ');
}
