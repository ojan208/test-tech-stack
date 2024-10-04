/*
    This file is for Book Review's API
*/
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import BookReviewRepository from "@/src/lib/repositories/BookReviewRepository";
import { z } from "zod";

const prisma = new PrismaClient();
const bookReviewValidation = z.object({
    review_text: z.string().min(1)
});

// Create
export const POST = async (request: Request) => {
    try {
        const requestBody = await request.json();
        console.log(requestBody); 
        const review = await new BookReviewRepository().add(requestBody, bookReviewValidation);
        // const review = await prisma.bookReview.create({
        //     data: requestBody
        // });

        return new NextResponse(
            JSON.stringify(review), 
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
        const bookId = Number(context.params['id']);
        console.log(bookId); // For Debugging Purposes
        
        const reviews = await new BookReviewRepository().getAll({
            where: {
                bookId
            }
        })

        return new NextResponse(
            JSON.stringify(reviews), 
            {status: 200}
        );
    } catch (error: any) {
        return new NextResponse(
            "Error in Fetching Reviews, message: " + error.message, 
            { status: 500 }
        );
    }
}