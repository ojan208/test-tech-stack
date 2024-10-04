import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import BookReviewRepository from "@/src/lib/repositories/BookReviewRepository";

const prisma = new PrismaClient();

// Update
export const PUT = async (request: Request, context: any) => {
    try {
        // const params = context.params;
        // const bookId = Number(params['id']);
        const reviewId = Number(context.params['reviewId']);
        // if (!reviewId || !bookId) {
        //     return new NextResponse(
        //         JSON.stringify(
        //             { message: "Review ID or Book ID Not Found" },
        //         ),
        //         { status: 400 }
        //     );
        // }

        const body = await request.json();
        const updatedReview = await new BookReviewRepository().update(reviewId, body);
        // const updateReview = await prisma.bookReview.update({
        //     where: {
        //         id: reviewId
        //     },
        //     data: body
        // });

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
        // const params = context.params;
        // const reviewId = Number(params['reviewId']);
        console.log(reviewId);
        // if (!reviewId) {
        //     return new NextResponse(
        //         JSON.stringify(
        //             { message: "Review ID Not Found" },
        //         ),
        //         { status: 400 }
        //     );
        // }

        const deletedReview = await new BookReviewRepository().remove(reviewId);
        // const deleteReview = await prisma.bookReview.delete({
        //     where: {
        //         id: reviewId
        //     }
        // });

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