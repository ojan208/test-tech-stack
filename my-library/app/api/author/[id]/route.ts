/*
    This file is for Author per Id's API
*/
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Read
export const GET = async (request: Request, context: any) => {
    try {
        const params = context.params;
        const authorId = Number(params['id']);
        console.log(authorId);
        if (!authorId) {
            return new NextResponse(
                JSON.stringify(
                    { message: "Author ID Not Found" },
                ),
                { status: 400 }
            );
        }
        const author = await prisma.author.findFirst({
            where: {
                id: authorId
            }
        });

        return new NextResponse(
            JSON.stringify(author), 
            {status: 200}
        );
    } catch (error: any) {
        return new NextResponse(
            "Error in Fetching Author, message: " + error.message, 
            { status: 500 }
        );
    }
}

// Update
export const PUT = async (request: Request, context: any) => {
    try {
        const params = context.params;
        const authorId = Number(params['id']);
        console.log(authorId);
        if (!authorId) {
            return new NextResponse(
                JSON.stringify(
                    { message: "Author ID Not Found" },
                ),
                { status: 400 }
            );
        }

        const body = await request.json();
        const updatedAuthor = await prisma.author.update({
            where: {
                id: authorId
            },
            data: body
        })

        return new NextResponse(
            JSON.stringify({"message": "Update Author is Successful"}), 
            {status: 200}
        );

    } catch (error: any) {
        return new NextResponse(
            "Error in Fetching Author, message: " + error.message, 
            { status: 500 }
        );
    }
}

// Delete
export const DELETE = async (request: Request, context: any) => {
    try {
        const params = context.params;
        const authorId = Number(params['id']);
        console.log(authorId);
        if (!authorId) {
            return new NextResponse(
                JSON.stringify(
                    { message: "Author ID Not Found" },
                ),
                { status: 400 }
            );
        }

        const deleteAuthor = await prisma.author.delete({
            where: {
                id: authorId
            }
        });

        return new NextResponse(
            JSON.stringify({"messages": "Deleting Author Is Successful"}), 
            {status: 200}
        )
    } catch (error: any) {
        return new NextResponse(
            "Error in Deleting the Movie, message: " + error.message, 
            { status: 500 }
        );
    }
}