/*
    This file is for Book per Id's API
*/
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Read
export const GET = async (request: Request, context: any) => {
    try {
        const params = context.params;
        const bookId = Number(params['id']);
        console.log(bookId);
        if (!bookId) {
            return new NextResponse(
                JSON.stringify(
                    { message: "Movie ID Not Found" },
                ),
                { status: 400 }
            );
        }
        const book = await prisma.book.findFirst({
            where: {
                id: bookId
            }
        });

        return new NextResponse(
            JSON.stringify(book), 
            {status: 200}
        );
    } catch (error: any) {
        return new NextResponse(
            "Error in Fetching Movie, message: " + error.message, 
            { status: 500 }
        );
    }
}

// Update

// Delete
export const DELETE = async (request: Request, context: any) => {
    try {
        const params = context.params;
        const bookId = Number(params['id']);
        console.log(bookId);
        if (!bookId) {
            return new NextResponse(
                JSON.stringify(
                    { message: "Movie ID Not Found" },
                ),
                { status: 400 }
            );
        }

        const deleteBook = await prisma.book.delete({
            where: {
                id: bookId
            }
        });

        return new NextResponse(
            JSON.stringify({"messages": "Deleting Book Is Successful"}), 
            {status: 200}
        )
    } catch (error: any) {
        return new NextResponse(
            "Error in Deleting the Movie, message: " + error.message, 
            { status: 500 }
        );
    }
}