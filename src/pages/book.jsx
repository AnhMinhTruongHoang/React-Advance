import { useEffect, useState } from "react";
import BookTable from "../components/books/book.table";
import { fetchAllBookApi } from "../services/api.service";

const BookPage = () => {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    loadBooks();
  }, [bookList]);

  const loadBooks = async () => {
    const res = await fetchAllBookApi();
    setBookList(res.data);
  };

  console.log("check book", bookList);

  return (
    <div>
      <BookTable bookList={bookList} loadBooks={loadBooks} />
    </div>
  );
};

export default BookPage;
