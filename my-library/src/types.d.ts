type Author = {
    id?: number;
    name: string;
    bio?: string;
    birthdate?: Date;
    books?: Book[];
}

type Book = {
    id?: number;
    title: string;
    authorId: number;
    genre?: string;
    published_year?: number;
    price?: number;
    stock?: number;

    author: Author;
}

type BookReview = {
    id?: number;
    bookId: number;
    review_text?: string;
    rating: number;
    reviewer_name?: string;
    review_date: Date;

    book: Book;
}