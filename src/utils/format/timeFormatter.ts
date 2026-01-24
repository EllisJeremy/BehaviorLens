export function timeFormatter(seconds: number): string {
  const totalMinutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  if (totalMinutes >= 60) {
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return `${hours}:${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }

  return `${totalMinutes}:${secs.toString().padStart(2, "0")}`;
}
