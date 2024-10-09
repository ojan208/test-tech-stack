import { updateBook } from "@/src/lib/action/book";
import { SubmitHandler } from "react-hook-form";

const onEditSubmit: SubmitHandler<Book> = async (data) => {
    console.log(data);

    const tempBook: Book = {
        title: data.title ,
        authorId: Number(data.authorId) ,
        genre: data.genre ,
        published_year: Number(data.published_year) ,
        price: Number(data.price) ,
        stock: Number(data.stock) 
    }

    const updatedBook = await updateBook(data.id!, tempBook);
    console.log(updateBook);
}

export default onEditSubmit