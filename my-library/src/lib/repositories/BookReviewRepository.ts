import prisma from "@/src/db";
import BaseRepository from "./BaseRepository";

export default class BookReviewRepository extends BaseRepository<BookReview> {
    constructor() {
        super(prisma.bookReview);
    }
}