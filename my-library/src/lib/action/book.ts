'use server'

import BookRepository from "../repositories/BookRepository"
import { z } from "zod"

const bookValidation = z.object({
    title: z.string().min(1).refine(async (current) => {
        return (!await prisma.book.count({
            where: {
                title: current
            }
        }))
    }, "Buku Sudah Ada")
});

// formData harusnya tipe datanya FormData, tp karena di tes di api dulu, jdnya pake any dulu
export async function createBook(formData: any) {
    const body = {
        ...formData
    }
    console.log(body);
    return await new BookRepository().add(body, bookValidation);
}

export async function getBook() {
    return await new BookRepository().getAll({
        select: {
            id: true, 
            title: true, 
            price: true
        }
    });
}

export async function getBookDetail(id: number) {
    return await new BookRepository().getById(id);
}

export async function updateBook(id: number, formData: any) {
    const body = {
        ...formData
    }
    console.log(body);
    return await new BookRepository().update(id, body);
}

export async function destroyBook(id: number) {
    // await new BookRepository().remove(id);
    return await new BookRepository().remove(id);
}