export function formatDate(
  date: string | Date,
  format: "YYYY-MM-DD" | "DD/MM" | "MMM D" | "MMM DD yyyy" = "YYYY-MM-DD"
): string {
  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) return "";

  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = d.getFullYear();

  switch (format) {
    case "YYYY-MM-DD":
      return d.toISOString().split("T")[0];

    case "DD/MM":
      return `${day}/${String(d.getMonth() + 1).padStart(2, "0")}`;

    case "MMM D":
      return `${month} ${d.getDate()}`;

    case "MMM DD yyyy":
      return `${month} ${day}, ${year}`;

    default:
      return d.toISOString().split("T")[0];
  }
}
