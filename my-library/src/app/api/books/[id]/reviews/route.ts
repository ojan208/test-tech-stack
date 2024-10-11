/*
    This file is for Book Review's API
*/
import { NextResponse } from "next/server";
import { createBookReview, getBookReview } from "@/src/lib/action/review";


// Create
export const POST = async (request: Request) => {
    try {
        const requestData = await request.json();
        console.log(requestData); 
        const review = await createBookReview(requestData);
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
        
        const reviews = await getBookReview(bookId);

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