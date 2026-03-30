/**
 * Pure utility — NO Leaflet dependency. Safe for SSR/server components.
 * Defines cuisine color mapping used by both the map and card components.
 */
export const CUISINE_COLORS: Record<string, string> = {
  Turkish: "#E8562A",
  Arab: "#2563EB",
  Pakistani: "#16A34A",
  Indian: "#F59E0B",
  "Middle Eastern": "#7C3AED",
  Lebanese: "#EC4899",
  Somali: "#0891B2",
  Syrian: "#D97706",
  "Central Asian": "#059669",
  International: "#6B7280",
  Other: "#6B7280",
};

export function getCuisineColor(cuisine: string): string {
  return CUISINE_COLORS[cuisine] ?? CUISINE_COLORS["Other"];
}
