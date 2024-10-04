/*
    This file is for Book per Id's API
*/
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import BookRepository from "@/src/lib/repositories/BookRepository";

const prisma = new PrismaClient();

// Read
export const GET = async (request: Request, context: any) => {
    try {
        const bookId = Number(context.params['id']);
        const book = await new BookRepository().getById(bookId);
    
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
    // try {
    //     const params = context.params;
    //     const bookId = Number(params['id']);
    //     console.log(bookId);
    //     if (!bookId) {
    //         return new NextResponse(
    //             JSON.stringify(
    //                 { message: "Movie ID Not Found" },
    //             ),
    //             { status: 400 }
    //         );
    //     }
    //     const book = await prisma.book.findFirst({
    //         where: {
    //             id: bookId
    //         }
    //     });

    //     return new NextResponse(
    //         JSON.stringify(book), 
    //         {status: 200}
    //     );
    // } catch (error: any) {
    //     return new NextResponse(
    //         "Error in Fetching Movie, message: " + error.message, 
    //         { status: 500 }
    //     );
    // }
}

// Update
export const PUT = async (request: Request, context: any) => {
    try {
        const requestData = await request.json();
        const bookId = Number(context.params['id']);

        const updatedBook = await new BookRepository().update(bookId, requestData);

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
    // try {
    //     const params = context.params;
    //     const bookId = Number(params['id']);
    //     console.log(bookId);
    //     if (!bookId) {
    //         return new NextResponse(
    //             JSON.stringify(
    //                 { message: "Book ID Not Found" },
    //             ),
    //             { status: 400 }
    //         );
    //     }

    //     const body = await request.json();
    //     const updatedBook = await prisma.book.update({
    //         where: {
    //             id: bookId
    //         }, 
    //         data: body
    //     })

    //     return new NextResponse(
    //         JSON.stringify({"message": "Update Book is Successful"}), 
    //         {status: 200}
    //     );
        
    // } catch (error: any) {
    //     return new NextResponse(
    //         "Error in Fetching Author, message: " + error.message, 
    //         { status: 500 }
    //     );
    // }
}

// Delete
export const DELETE = async (request: Request, context: any) => {
    try {
        const bookId = context.params['id'];
        const deletedBook = await new BookRepository().remove(bookId);

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
    // try {
    //     const params = context.params;
    //     const bookId = Number(params['id']);
    //     console.log(bookId);
    //     if (!bookId) {
    //         return new NextResponse(
    //             JSON.stringify(
    //                 { message: "Movie ID Not Found" },
    //             ),
    //             { status: 400 }
    //         );
    //     }

    //     const deleteBook = await prisma.book.delete({
    //         where: {
    //             id: bookId
    //         }
    //     });

    //     return new NextResponse(
    //         JSON.stringify({"messages": "Deleting Book Is Successful"}), 
    //         {status: 200}
    //     )
    // } catch (error: any) {
    //     return new NextResponse(
    //         "Error in Deleting the Movie, message: " + error.message, 
    //         { status: 500 }
    //     );
    // }
}