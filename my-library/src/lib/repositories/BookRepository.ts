import 'server-only'
import prisma from "@/src/db";
import BaseRepository from "./BaseRepository";

export default class BookRepository extends BaseRepository<Book> {
    constructor() {
        super(prisma.book);
    }
}