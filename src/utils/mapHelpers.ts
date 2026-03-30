/**
 * Client-only Leaflet helpers. Must NOT be imported in server components.
 * All Leaflet usage is isolated here so it only runs in the browser.
 */
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { getCuisineColor } from "./cuisineColors";

export { getCuisineColor } from "./cuisineColors";

// Fix for default marker icons in Next.js/webpack
export function fixLeafletIcons() {
  if (typeof window !== "undefined") {
    delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)
      ._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    });
  }
}

export function createCustomIcon(cuisine: string, isSelected: boolean) {
  const cuisineColor = getCuisineColor(cuisine);
  const size = isSelected ? 32 : 20;
  const shadow = isSelected 
    ? "filter: drop-shadow(0 8px 12px rgba(0,0,0,0.25))" 
    : "filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15))";

  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg" style="${shadow}">
      ${isSelected ? `<circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="${cuisineColor}" fill-opacity="0.15">
        <animate attributeName="r" from="${size/2 - 4}" to="${size/2}" dur="1.5s" begin="0s" repeatCount="indefinite" />
        <animate attributeName="fill-opacity" from="0.4" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
      </circle>` : ""}
      <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 4}" fill="white" stroke="${isSelected ? cuisineColor : 'rgba(0,0,0,0.05)'}" stroke-width="${isSelected ? 3 : 1.5}"/>
      <circle cx="${size/2}" cy="${size/2}" r="${size/4}" fill="${cuisineColor}"/>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
    className: "custom-marker-wrap",
  });
}

// Component to fly to a specific location
export function FlyToLocation({
  lat,
  lng,
  zoom = 14,
}: {
  lat: number;
  lng: number;
  zoom?: number;
}) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], zoom, { duration: 1.2 });
  }, [lat, lng, zoom, map]);
  return null;
}

// Component to fly to user location
export function FlyToUser({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 13, { duration: 1.5 });
  }, [lat, lng, map]);
  return null;
}
