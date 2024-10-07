import 'server-only'
import prisma from "@/src/db";
import BaseRepository from "./BaseRepository";

export default class AuthorRepository extends BaseRepository<Author> {
    constructor() {
        super(prisma.author);
    }
}