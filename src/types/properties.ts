export interface IProperties {
  state: string;
  category: string | null;
  type: string | null;
  price: number;
  area: string | null;
  available_after: Date | null;
  has_key: boolean;
  description: string;
  propertyImage: string | null;
}
