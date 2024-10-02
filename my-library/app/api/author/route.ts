/*
    This file is for Author's API
*/
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();
const authorValidation = z.object({
    name: z.string().min(1).refine(async (current) => {
        return (!await prisma.author.count({
            where: {
                name: current
            }
        }))
    }, "Author Sudah Ada")
});

// Create
export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        console.log(body);
        await authorValidation.parseAsync(body)
        const author = await prisma.author.create({
            data: body
        });

        return new NextResponse(
            JSON.stringify({"messages": "Creating Author Is Successful"}), 
            {status: 200}
        )
    } catch (error: any) {
        return new NextResponse(
            "Error in Creating Book, message: " + error.message, 
            { status: 500 }
        );
    }
}

// Read
export const GET = async () => {
    try {
        const authors = await prisma.author.findMany({
            select: {
                id: true,
                name: true
            }
        });
        return new NextResponse(
            JSON.stringify(authors),
            {status: 200}
        )
    } catch (error: any) {
        return new NextResponse(
            "Error in Fetching Movies, message: " + error.message, 
            { status: 500 }
        );
    }
}