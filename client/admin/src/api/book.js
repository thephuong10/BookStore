import { initialBooks } from "../constants/initialData/books";

const bookApi = {
  getBooks: async () => initialBooks,
};

export default bookApi;
