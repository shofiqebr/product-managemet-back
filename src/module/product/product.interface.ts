export interface IProduct {
  name: string;
  model: string;
  brand: string;
  year: number;
  price: number;
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  description?: string;
}