"use client";

import { useEffect, useState } from "react";
import Button from "antd/es/button/button";
import { Books } from "../components/Books";
import { getAllBooks } from "../services/Books";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBooks = async () => {
      const books = await getAllBooks();
      setLoading(false);
      setBooks(books);
    };
    
    getBooks();
  }, []);
  return (
    <div>
      <Button>Add book</Button>

      <Books books={books} />
    </div>
  );
}
