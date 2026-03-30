import { useState, useEffect } from "react";
import { Restaurant } from "../types/restaurant";
import { sheetParser } from "../utils/sheetParser";
import { FALLBACK_RESTAURANTS } from "../constants/restaurants";

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ5ewZpT_FcAuxKGMpe_MbX5oKwAvZyunvXDC6qvwAy_h5tlzVAVYAZK1Y7KvZ4S08XXZCLfp9Ssri/pub?gid=0&single=true&output=csv";

interface UseRestaurantsReturn {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
}

export function useRestaurants(): UseRestaurantsReturn {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!SHEET_CSV_URL) {
        // No URL set — use fallback data
        setRestaurants(FALLBACK_RESTAURANTS);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(SHEET_CSV_URL, { mode: "cors" });
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const csv = await response.text();
        const parsed = sheetParser(csv);

        // Combine Sheet data with our must-use constant restaurants
        // Use a Map to avoid duplicates by ID
        const combined = [...FALLBACK_RESTAURANTS];
        parsed.forEach(p => {
          if (!combined.find(c => c.id === p.id)) {
            combined.push(p);
          }
        });

        setRestaurants(combined);
      } catch (err) {
        console.warn("Failed to fetch Google Sheet, using fallback data:", err);
        setRestaurants(FALLBACK_RESTAURANTS);
        setError(null); 
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { restaurants, loading, error };
}
