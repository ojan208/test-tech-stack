/*
    This file is for Author's API
*/
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createAuthor, getAuthor } from "@/src/lib/action/author";

const prisma = new PrismaClient();

// Create
export const POST = async (request: Request) => {
    try {
        const requestData = await request.json();
        const author = await createAuthor(requestData)

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
        const authors = await getAuthor();

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