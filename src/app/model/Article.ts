export interface Article {
  _id?: string;
  name?: string;
  description?: string;
  image?: string | ArrayBuffer | null;
  types?: string[];
}
