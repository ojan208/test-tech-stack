/*
    This file is for Book's API
*/
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();
const bookValidation = z.object({
    title: z.string().min(1).refine(async (current) => {
        return (!await prisma.book.count({
            where: {
                title: current
            }
        }))
    }, "Buku Sudah Ada")
});

// Create
export const POST = async (request: Request) => {
    // console.log(request);
    try {
        const body = await request.json();
        console.log(body);
        await bookValidation.parseAsync(body)
        const book = await prisma.book.create({
            data: body
        })

        return new NextResponse(
            JSON.stringify({"Message": "Creating Book is Successful"}), 
            {status: 200}
        )
    } catch (error: any) {
        return new NextResponse(
            "Error in Creating Book, message: " + error.message, 
            { status: 500 }
        );
    }
}

// Read
export const GET = async () => {
    try {
        const books = await prisma.book.findMany({
            select: {
                id: true, 
                title: true,
                price: true,
            }
        });
        console.log(books)
        return new NextResponse(
            JSON.stringify(books), 
            {status: 200}
        );
    } catch (error: any) {
        return new NextResponse(
            "Error in Fetching Movies, message: " + error.message, 
            { status: 500 }
        );
    }
}
