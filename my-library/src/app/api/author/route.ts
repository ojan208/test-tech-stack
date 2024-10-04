/*
    This file is for Author's API
*/
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import AuthorRepository from "@/src/lib/repositories/AuthorRepository";

const prisma = new PrismaClient();
const authorValidation = z.object({
    name: z.string().min(1).refine(async (current) => {
        return (!await prisma.author.count({
            where: {
                name: current
            }
        }))
    }, "Author Sudah Ada")
});

// Create
export const POST = async (request: Request) => {
    try {
        const requestData = await request.json();
        // console.log(body); // For Debugging Purposes
        // await authorValidation.parseAsync(requestData);

        // const author = await prisma.author.create({
        //     data: requestData
        // });

        const author = await new AuthorRepository().add(requestData, authorValidation);

        return new NextResponse(
            JSON.stringify(author), 
            {status: 200}
        )
    } catch (error: any) {
        return new NextResponse(
            "Error in Creating Author, message: " + error.message, 
            { status: 500 }
        );
    }
}

// Read
export const GET = async () => {
    try {
        const authors = await new AuthorRepository().getAll({
            select: {
                id: true,
                name: true,
            }
        });

        return new NextResponse(
            JSON.stringify(authors),
            {status: 200}
        )
    } catch (error: any) {
        return new NextResponse(
            "Error in Fetching Authors, message: " + error.message, 
            { status: 500 }
        );
    }
}