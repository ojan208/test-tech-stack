import 'server-only'

import { type PrismaClient } from "@prisma/client/extension";

const DEFAULT_ODER_BY = {
    id: "desc",
};

const MAX_RECORDS_LIMIT = 100;

export default abstract class BaseRepository<A> {
    constructor(protected modelClient: PrismaClient) {}

    // Create
    async add(body: any, validator:any, options: Record<string, any> = {}): Promise<A> {
        try {
            // console.log(body); // for debugging purposes
            await validator.parseAsync(body);
            const createdBook = await this.modelClient.create({
                data: body
            });
            return createdBook;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error("An Error Has Occured When Trying to Create the Object, detail: " + error.message);
            } else {
                throw new Error("An Unknown Error Has Occured")
            }
        }
    }

    // Read
    getAll(options: Record<string, any> = {}): Promise<Array<A>> {
        try {
            if (!options.orderBy) {
                options.orderBy = DEFAULT_ODER_BY;
            }
    
            if (!options.take || options.take > MAX_RECORDS_LIMIT) {
                options.take = MAX_RECORDS_LIMIT
            }
    
            return this.modelClient.findMany(options);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error("An Error Has Occured When Trying to Fetch the Object, detail: " + error.message);
            } else {
                throw new Error("An Unknown Error Has Occured")
            }
        }
    }

    getById(id: number, options: Record<string, any> = {}): Promise<A> {
        try {
            return this.modelClient.findUnique({
                where: {
                    id,
                },
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error("An Error Has Occured When Trying to Fetch the Object, detail: " + error.message);
            } else {
                throw new Error("An Unknown Error Has Occured")
            }
        }
    }

    // Update
    async update(id:number, body: any, options: Record<string, any> = {}): Promise<A> {
        try {
            if (!id) {
                throw new Error("No ID or request Data Found");
            }

            const updatedBook = await this.modelClient.update({
                where: {
                    id,
                },
                data: body
            })

            return updatedBook;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error("An Error Has Occured When Trying to Delete the Object, detail: " + error.message);
            } else {
                throw new Error("An Unknown Error Has Occured")
            }
        }
    }

    // Delete
    async remove(id: number, options: Record<string, any> = {}): Promise<A> {
        try {
            if (!id) {
                throw new Error("No ID Found");
            }
    
            const deletedBook = await this.modelClient.delete({
                where: {
                    id,
                }
            });
    
            return deletedBook;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error("An Error Has Occured When Trying to Delete the Object, detail: " + error.message);
            } else {
                throw new Error("An Unknown Error Has Occured")
            }
        }
    }
}