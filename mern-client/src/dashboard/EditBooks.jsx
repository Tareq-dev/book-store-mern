import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import {
  Button,
  Checkbox,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
const EditBooks = () => {
  const { id } = useParams();
  const {
    bookTitle,
    authorname,
    imageUrl,
    category,
    bookDescription,
    bookPdfUrl,
  } = useLoaderData();
  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "History",
    "Programming",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "Self-Help",
    "Memoir",
    "Business",
    "Children Book",
    "Travel",
    "Religion",
    "Art and Design",
  ];
  const [selectedBookcategory, setSelectedBookcategory] = useState(
    bookCategories[0]
  );

  const handleChangeSelectedValue = (event) => {
    // console.log(event.target.value);
    setSelectedBookcategory(event.target.value);
  };

  //Handle book submission
  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorname = form.authorname.value;
    const imageUrl = form.imageUrl.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPdfUrl = form.bookPdfUrl.value;
    const updateBookObj = {
      bookTitle,
      authorname,
      imageUrl,
      category,
      bookDescription,
      bookPdfUrl,
    };
    // console.log(bookObj);

    //send data to db

    //Update book
    fetch(`http://localhost:5000/book/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateBookObj),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        alert("Book is updated successfully!!!");
      });
  };
  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Update the Book data</h2>
      <form
        onSubmit={handleUpdate}
        className="flex lg:w-[1180px] flex-col flex-wrap gap-4"
      >
        {/* {first row} */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="bookTitle" value="Book Title" />
            </div>
            <TextInput
              id="bookTitle"
              name="bookTitle"
              placeholder="Book Name"
              required
              type="text"
              defaultValue={bookTitle}
            />
          </div>
          {/* {authorname} */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="authorname" value="Author Name" />
            </div>
            <TextInput
              id="authorname"
              name="authorname"
              placeholder="Author Name"
              required
              type="text"
              defaultValue={authorname}
            />
          </div>
        </div>
        {/* {second row} */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="imageUrl" value="Book Image Url" />
            </div>
            <TextInput
              id="imageUrl"
              name="imageUrl"
              placeholder="Book Image Url"
              required
              type="text"
              defaultValue={imageUrl}
            />
          </div>
          {/* {category} */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="inputState" value="Book Category" />
            </div>
            <Select
              id="inputState"
              name="categoryName"
              className="w-full rounded"
              value={selectedBookcategory}
              onChange={handleChangeSelectedValue}
            >
              {bookCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        </div>
        {/* {Book Description} */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookDescription" value="Book Description" />
          </div>
          <Textarea
            id="bookDescription"
            name="bookDescription"
            placeholder="Write your book description......"
            required
            className="w-full"
            rows={6}
            defaultValue={bookDescription}
          />
        </div>
        {/* {Book Pdf Link} */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookPdfUrl" value="Book PDF Url" />
          </div>
          <TextInput
            id="bookPdfUrl"
            name="bookPdfUrl"
            placeholder="book pdf url"
            required
            type="text"
            defaultValue={bookPdfUrl}
          />
        </div>
        <div>
          <Button type="submit" className="mt-5">
            Update Book
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditBooks;
