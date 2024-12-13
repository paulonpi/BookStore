import { Book } from "./book";

export interface Author {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  books?: Book[]; // Array of books
} 