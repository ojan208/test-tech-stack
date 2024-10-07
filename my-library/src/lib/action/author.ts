'use server'

import AuthorRepository from "../repositories/AuthorRepository"
import { z } from "zod"

const authorValidation = z.object({
    name: z.string().min(1).refine(async (current) => {
        return (!await prisma.author.count({
            where: {
                name: current
            }
        }))
    }, "Author Sudah Ada")
});

// formData harusnya tipe datanya FormData, tp karena di tes di api dulu, jdnya pake any dulu
export async function createAuthor(formData: any) {
    return await new AuthorRepository().add(formData, authorValidation);
}

export async function getAuthor() {
    return await new AuthorRepository().getAll({
        select: {
            id: true,
            name: true,
        }
    });
}

export async function getAuthorDetail(id: number) {
    return await new AuthorRepository().getById(id);
}

export async function updateAuthor(id: number, formData: any) {
    return await new AuthorRepository().update(id, formData);
}

export async function destroyAuthor(id: number) {
    return await new AuthorRepository().remove(id);
}