import Card from "antd/es/card/Card";
import { CardTitle } from "./CardTitle";
import { Button } from "antd";

interface Props {
  books: Book[];
}

export function Books({ books }: Props) {
  return (
    <div className="cards">
      {books.map((book: Book) => (
        <Card
          key={book.id}
          title={<CardTitle title={book.title} price={book.price} />}
          bordered={false}
        >
          <p>{book.description}</p>
          <div className="card-button">
            <Button>Edit</Button>
            <Button>Delete</Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
