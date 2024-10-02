import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Update
export const PUT = async (request: Request, context: any) => {
    try {
        const params = context.params;
        const bookId = Number(params['id']);
        const reviewId = Number(params['reviewId']);
        if (!reviewId || !bookId) {
            return new NextResponse(
                JSON.stringify(
                    { message: "Review ID or Book ID Not Found" },
                ),
                { status: 400 }
            );
        }

        const body = await request.json();
        const updateReview = await prisma.bookReview.update({
            where: {
                id: reviewId, 
                bookId: bookId
            },
            data: body
        });

        return new NextResponse(
            JSON.stringify({"message": "Update Review is Successful"}), 
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
        const params = context.params;
        const reviewId = Number(params['reviewId']);
        console.log(reviewId);
        if (!reviewId) {
            return new NextResponse(
                JSON.stringify(
                    { message: "Review ID Not Found" },
                ),
                { status: 400 }
            );
        }

        const deleteReview = await prisma.bookReview.delete({
            where: {
                id: reviewId
            }
        });

        return new NextResponse(
            JSON.stringify({"messages": "Deleting Review Is Successful"}), 
            {status: 200}
        )
    } catch (error: any) {
        return new NextResponse(
            "Error in Deleting the Movie, message: " + error.message, 
            { status: 500 }
        );
    }
}