/*
    This file is for Book per Id's API
*/
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { destroyBook, getBookDetail, updateBook } from "@/src/lib/action/book";
import BookRepository from "@/src/lib/repositories/BookRepository";

const prisma = new PrismaClient();

// Read
export const GET = async (request: Request, context: any) => {
    try {
        const bookId = Number(context.params['id']);
        const book = await getBookDetail(bookId);
    
        return new NextResponse(
            JSON.stringify(book),
            {status: 200}
        )
    } catch (error: any) {
        return new NextResponse(
            "Error in Fetchin Book, message: " + error.message, 
            { status: 500 }
        );
    }
}

// Update
export const PUT = async (request: Request, context: any) => {
    try {
        const requestData = await request.json();
        const bookId = Number(context.params['id']);

        const updatedBook = await updateBook(bookId, requestData);

        return new NextResponse(
            JSON.stringify(updatedBook),
            {status: 200}
        )
    } catch (error: any) {
        return new NextResponse(
            "Error in Updating the Book, message: " + error.message, 
            { status: 500 }
        );
    }
}

// Delete
export const DELETE = async (request: Request, context: any) => {
    try {
        const bookId = Number(context.params['id']);
        const deletedBook = await destroyBook(bookId);

        return new NextResponse(
            JSON.stringify(deletedBook),
            {status: 200}
        );
    } catch (error: any) {
        return new NextResponse(
            "Error in Deleting the Book, message: " + error.message, 
            { status: 500 }
        );
    }
}