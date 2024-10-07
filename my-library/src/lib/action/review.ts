'use server'

import BookReviewRepository from "../repositories/BookReviewRepository"
import { z } from "zod"

const bookReviewValidation = z.object({
    review_text: z.string().min(1)
});

export async function createBookReview(formData: any) {
    return await new BookReviewRepository().add(formData, bookReviewValidation);
}

export async function getBookReview(bookId: number) {
    return await new BookReviewRepository().getAll({
        where: {
            bookId
        }
    })
}

export async function getBookReviewDetail(id: number) {
    return await new BookReviewRepository().getById(id);
}

export async function updateBookReview(id: number, formData: any) {
    return await new BookReviewRepository().update(id, formData);
}

export async function destroyBookReview(id: number) {
    return await new BookReviewRepository().remove(id);
}