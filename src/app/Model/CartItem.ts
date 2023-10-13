export interface CartItem {
  id: any;
  name: string;
  price: any;
  tag?: any[];
  favorite: boolean;
  stars: number;
  imageURL: string;
  origins: string[];
  cookTime: string;
  description: string;
  quantity: number;
}
