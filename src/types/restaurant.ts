export interface Restaurant {
  id: string;
  name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  cuisine: string;
  halal_status: string;
  phone: string;
  website: string;
  hours: string;
  rating?: number;
  image?: string;
}

export type HalalStatus = "Fully Halal" | "Halal Options" | "Halal Certified";
