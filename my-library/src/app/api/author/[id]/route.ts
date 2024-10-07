/*
    This file is for Author per Id's API
*/
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { destroyAuthor, getAuthorDetail, updateAuthor } from "@/src/lib/action/author";

const prisma = new PrismaClient();

// Read
export const GET = async (request: Request, context: any) => {
    try {
        const authorId = Number(context.params['id']);
        console.log(authorId); // For Debugging Purposes

        const author = await getAuthorDetail(authorId);

        return new NextResponse(
            JSON.stringify(author),
            {status: 200}
        );
    } catch (error: any) {
        return new NextResponse(
            "Error in Fetchin Author, message: " + error.message, 
            { status: 500 }
        );
    }
}

// Update
export const PUT = async (request: Request, context: any) => {
    try {
        const requestData = await request.json();
        const authorId = Number(context.params['id']);

        const updatedAuthor = await updateAuthor(authorId, requestData);

        return new NextResponse(
            JSON.stringify(updatedAuthor),
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
        const authorId = Number(context.params['id']);
        console.log(authorId); // For Debugging Purposes
        const deletedAuthor = await destroyAuthor(authorId);

        return new NextResponse(
            JSON.stringify(deletedAuthor),
            {status: 200}
        );
    } catch (error: any) {
        return new NextResponse(
            "Error in Deleting the Author, message: " + error.message, 
            { status: 500 }
        );
    }
}