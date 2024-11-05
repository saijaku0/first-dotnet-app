export interface BookReques {
  title: string;
  decsription: string;
  price: number;
}

export const getAllBooks = async () => {
  const response = await fetch("http://localhost:5157/Books");

  return response.json();
};

export const createBook = async (bookRequest: BookReques) => {
  await fetch("http://localhost:5157/Books", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(bookRequest),
  });
};

export const updateBook = async (id: string, bookRequest: BookReques) => {
  await fetch(`http://localhost:5157/Books/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(bookRequest),
  });
};

export const deleteBook = async (id: string) => {
    await fetch(`http://localhost:5157/Books/${id}`, {
      method: "DELETE",
    });
  };