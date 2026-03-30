import { Restaurant, HalalStatus } from "../types/restaurant";

// Custom CSV row parser that handles quoted fields (commas inside quotes)
function parseCSVRow(row: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    if (char === '"') {
      if (inQuotes && row[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// Main parser to convert Google Sheets CSV data into our Restaurant objects
export function sheetParser(csv: string): Restaurant[] {
  const lines = csv
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length < 2) return [];

  const headers = parseCSVRow(lines[0]).map((h) => h.toLowerCase().trim());

  const restaurants: Restaurant[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVRow(lines[i]);
    const obj: Record<string, string> = {};

    headers.forEach((header, idx) => {
      obj[header] = values[idx] ?? "";
    });

    const lat = parseFloat(obj["lat"] || obj["latitude"]);
    const lng = parseFloat(obj["lng"] || obj["longitude"]);

    if (!obj["name"] || isNaN(lat) || isNaN(lng)) continue;

    restaurants.push({
      id: `restaurant-${i}`,
      name: obj["name"] || "",
      address: obj["address"] || "",
      city: obj["city"] || "",
      latitude: lat,
      longitude: lng,
      cuisine: obj["cuisine"] || "International",
      halal_status: obj["halal_status"] || "Halal Options",
      phone: obj["phone"] || "",
      website: obj["website"] || "",
      hours: obj["hours"] || "",
      rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
      image: "",
    });
  }

  return restaurants;
}
