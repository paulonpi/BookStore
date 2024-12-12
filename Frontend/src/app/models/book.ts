export interface Book {
  id?: number;
  title: string;
  price: number;
  subject: {
    id: number;
    name?: string;
  };
  authors: {
    id: number;
    name?: string;
  }[];
}
