'use client'
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { destroyBook, getBook, createBook } from "../lib/action/book";
import { getAuthor } from "../lib/action/author";
import Edit from "@/components/Edit"

import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardDescription, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { revalidatePath } from "next/cache";
import { Trash2, PenLine } from "lucide-react";
import { EditDialog } from "@/components/dialogs/EditDialog";

export default function Home() {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [bookData, setBookData] = useState<Book[]>();
  const [authors, setAuthorData] = useState<Author[]>();
  const [openEdit, setOpenEdit] = useState(false);
  // const authors: any = []

  async function loadDataBook() {
    const books = await getBook();    
    setBookData(books);
  }

  async function loadDataAuthor() {
    const authors = await getAuthor();
    setAuthorData(authors);
  }

  const handleOpenEdit = (id: number) => {
    setEditDialogOpen(true);
    setEditId(id);
  }

  const handleCloseEdit = () => {
    setEditDialogOpen(false);
    setEditId(null);
  }

  useEffect(() => {    
    loadDataBook();  
    loadDataAuthor();
  }, [])
  
  const { control, register, handleSubmit, watch } = useForm<Book>();
  const onSubmit: SubmitHandler<Book> = async (data) => {
    // console.log(data);
    const tempBook: Book = {
      title: data.title,
      authorId: Number(data.authorId),
      genre: data.genre,
      published_year: Number(data.published_year),
      price: Number(data.price),
      stock: Number(data.stock)
    }
    const createdBook = await createBook(tempBook);
    if (!!createdBook) {
      loadDataBook()
    }
  };
  const onDelete = async (id: number | null) => {
    if (!!id) {
      console.log(id);
      const deletedBook = await destroyBook(id!);
      if (!!deletedBook) {
        loadDataBook();
      }
    }
  }
  // console.log(watch())
  
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">Add Book</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Book</DialogTitle>
            <DialogDescription>make a new book to be inserted to the database</DialogDescription>
          </DialogHeader>
          <Card className="w-[350px] mx-auto">
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="title">Title</Label>
                    <Input {...register("title")} id="title" placeholder="Book Title" />
                  </div>
                  <Controller
                    name="authorId"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={ field.onChange }>
                        <SelectTrigger id="authorId">
                          <SelectValue placeholder="Select Author"/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Author</SelectLabel>
                            {
                              authors?.map((author) => (
                                <SelectItem value={author.id!.toString()}>{author.name} {author.id!.toString()}</SelectItem>
                              ))
                            }
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="genre">Genre</Label>
                    <Input {...register("genre")} id="genre" placeholder="Genre of the Book" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="published_year">Year Published</Label>
                    <Input {...register("published_year")} id="published_year" placeholder="The Year the Book Got Published" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="price">Price</Label>
                    <Input {...register("price")} id="price" placeholder="Price of the Book" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="stock">Stock</Label>
                    <Input {...register("stock")} id="stock" placeholder="How Many Book is There" />
                  </div>
                </div>
                <br />
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Submit</Button>
              </form>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
      
      <table cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', margin: 'auto'}}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {bookData?.map((row) => (
          <tr>
            <td>{row.id}</td>
            <td>{row.title}</td>
            <td>{row.price}</td>
            <td>
              <Button onClick={() => {
                onDelete(row.id || null)
              }}
              variant="ghost"
              size="icon"
              className="text-red">
                <Trash2 />
              </Button>
              <Button onClick={() => {
                handleOpenEdit(row.id!);
                console.log(row.id)
              }}
              variant="ghost"
              size="icon"
              className="text-red">
                <PenLine />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    { isEditDialogOpen && <EditDialog id={editId} isOpen={isEditDialogOpen} onClose={handleCloseEdit} />}
    </div>
  );
}
