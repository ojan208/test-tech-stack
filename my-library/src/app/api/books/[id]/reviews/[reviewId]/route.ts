import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import BookReviewRepository from "@/src/lib/repositories/BookReviewRepository";
import { getBookReviewDetail, updateBookReview } from "@/src/lib/action/review";

const prisma = new PrismaClient();

// read 
export const GET = async (request: Request, context: any) => {
    try {
        const reviewId = Number(context.params['reviewId']);

        const reviewDetail = await getBookReviewDetail(reviewId);

        return new NextResponse(
            JSON.stringify(reviewDetail), 
            {status: 200}
        );
    } catch (error: any) {
        return new NextResponse(
            "Error in Fetching Review, message: " + error.message, 
            { status: 500 }
        );
    }
}

// Update
export const PUT = async (request: Request, context: any) => {
    try {
        const reviewId = Number(context.params['reviewId']);
        const body = await request.json();

        const updatedReview = await updateBookReview(reviewId, body);

        return new NextResponse(
            JSON.stringify(updatedReview), 
            {status: 200}
        );
    } catch (error: any) {
        return new NextResponse(
            "Error in Updating Review, message: " + error.message, 
            { status: 500 }
        );
    }
}

// Delete
export const DELETE = async (request: Request, context: any) => {
    try {
        const reviewId = Number(context.params['reviewId']);
        console.log(reviewId);

        const deletedReview = await new BookReviewRepository().remove(reviewId);

        return new NextResponse(
            JSON.stringify(deletedReview), 
            {status: 200}
        )
    } catch (error: any) {
        return new NextResponse(
            "Error in Deleting the Movie, message: " + error.message, 
            { status: 500 }
        );
    }
}