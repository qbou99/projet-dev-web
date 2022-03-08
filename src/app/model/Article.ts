export interface Article {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
  image?: string | ArrayBuffer | null;
  types?: string[];
}
