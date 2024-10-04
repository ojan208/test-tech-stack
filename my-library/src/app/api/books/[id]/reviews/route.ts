/*
    This file is for Book Review's API
*/
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create
export const POST = async (request: Request) => {
    try {
        // const params = context.params;
        // const bookId = Number(params['id']);
        // console.log(bookId);

        const body = await request.json();
        console.log(body);
        const review = await prisma.bookReview.create({
            data: body
        });

        return new NextResponse(
            JSON.stringify({"messages": "Creating Review Is Successful"}), 
            {status: 200}
        )
    } catch (error: any) {
        return new NextResponse(
            "Error in Creating Review, message: " + error.message, 
            { status: 500 }
        );
    }
}

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
        const bookReviews = await prisma.bookReview.findMany({
            where: {
                bookId: bookId
            }
        });

        return new NextResponse(
            JSON.stringify(bookReviews), 
            {status: 200}
        );
    } catch (error: any) {
        return new NextResponse(
            "Error in Fetching Movie, message: " + error.message, 
            { status: 500 }
        );
    }
}