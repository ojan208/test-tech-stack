import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { getAuthor } from "../../src/lib/action/author";
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
  DialogFooter
} from "@/components/ui/dialog"
import { PenLine } from "lucide-react";

// import { destroyBook, getBook, createBook } from "../lib/action/book";
import { getBookDetail, updateBook } from "@/src/lib/action/book";
import onEditSubmit from "./EditSubmit";

export function EditDialog({ id, isOpen, onClose }) {
    const [authors, setAuthorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [book, setBookData] = useState(null);
    const { control, register, handleSubmit, watch, setValue } = useForm({
      defaultValues: {
        id
      }
    });

    async function loadDataAuthor() {
        const authors = await getAuthor();
        console.log("test");
        setAuthorData(authors);
    }

    async function loadBook() {
      const book = await getBookDetail(id);
      setBookData(book);
    }

    useEffect(() => {
      if (isOpen) {
        loadDataAuthor();
        loadBook();
      }
    }, [isOpen, id]);

    useEffect(() => {
      if (book && authors) {
        setValue("title", book.title);
        setValue("authorId", book.authorId.toString(), { shouldValidate: true });
        console.log(book.authorId)
        setValue("genre", book.genre);
        setValue("published_year", book.published_year);
        setValue("price", book.price);
        setValue("stock", book.stock);
        setLoading(false);
      }
    }, [book, authors])

    // console.log(bookId);
    if (isOpen) {
      console.log(id);
      console.log(watch());
    }
    console.log(authors);
    
    return (
      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit a Book</DialogTitle>
            <DialogDescription>make changes to a book in the database</DialogDescription>
          </DialogHeader>
          { loading ? (
            <p>Loading...</p>
          ) : 
            <form onSubmit={handleSubmit(onEditSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="title">Title</Label>
                  <Input {...register("title")} id="title" placeholder="Book Title" />
                </div>
                <Controller 
                  name="authorId"
                  control={control}
                  defaultValue={book.authorId ? book.authorId.toString() : ""}
                  render={({field}) => (
                    <Select onValueChange={ field.onChange } value={field.value}>
                      <SelectTrigger id="authorId">
                        <SelectValue placeholder="Select Author"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Author</SelectLabel>
                          {
                            authors.map((author) => (
                              <SelectItem value={author.id.toString()}>
                                {author.name}
                              </SelectItem>
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
              <DialogFooter>
                <Button onClick={onClose}
                variant="outline"
                >
                  Cancel
                </Button>
                <Button
                type="submit">
                  Submit
                </Button>
              </DialogFooter>
              </form>
              }
        </DialogContent>
      </Dialog>
    )
}