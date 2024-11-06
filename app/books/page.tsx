"use client";

import { useEffect, useState } from "react";
import Button from "antd/es/button/button";
import { Books } from "../components/Books";
import {
  BookRequest,
  createBook,
  deleteBook,
  getAllBooks,
  updateBook,
} from "../services/Books";
import Title from "antd/es/typography/Title";
import { CreateUpdateBook, Mode } from "../components/CreateUpdateBook";

export default function BooksPage() {
  const defaultValues = {
    title: "",
    description: "",
    price: 1,
  } as Book;
  const [value, setValue] = useState<Book>(defaultValues);

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState(Mode.Create);

  useEffect(() => {
    const getBooks = async () => {
      const books = await getAllBooks();
      setLoading(false);
      setBooks(books);
    };

    getBooks();
  }, []);

  const handleCreateBook = async (request: BookRequest) => {
    await createBook(request);
    closeModal();

    const books = await getAllBooks();
    setBooks(books);
  };

  const handleUpdateBook = async (id: string, request: BookRequest) => {
    await updateBook(id, request);
    closeModal();

    const books = await getAllBooks();
    setBooks(books);
  };

  const handleDeleteBook = async (id: string) => {
    await deleteBook(id);

    const books = await getAllBooks();
    setBooks(books);
  };

  const openModal = () => {
    setMode(Mode.Create);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setValue(defaultValues);
    setIsModalOpen(false);
  };

  const openEditModal = (book: Book) => {
    setMode(Mode.Edit);
    setValue(book);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Button
        type="primary"
        style={{ marginTop: "30px" }}
        size="large"
        onClick={openModal}
      >
        Add book
      </Button>

      <CreateUpdateBook
        mode={mode}
        values={value}
        isModalOpen={isModalOpen}
        handleCreate={handleCreateBook}
        handleUpdate={handleUpdateBook}
        handleCancel={closeModal}
      />

      {loading ? (
        <Title>Loading</Title>
      ) : (
        <Books
          books={books}
          handleOpen={openEditModal}
          handleDelete={handleDeleteBook}
        />
      )}
    </div>
  );
}
