/*
    This file is for Book's API
*/
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createBook, getBook } from "@/src/lib/action/book";

const prisma = new PrismaClient();

// Create
export const POST = async (request: Request) => {
    try {
        const requestData = await request.json();
        const book = await createBook(requestData);

        return new NextResponse(
            JSON.stringify(book), 
            {status: 200}
        );
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
        // klo ada business logic, simpan di try ini
        const books = await getBook();
    
        return new NextResponse(
            JSON.stringify(books),
            {status: 200}
        )
    } catch (error: any) {
        return new NextResponse(
            "Error in Fetching Movies, message: " + error.message, 
            { status: 500 }
        );
    }
}
