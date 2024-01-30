import React from "react";
import { Card } from "flowbite-react";
import { makePayment } from './../stripe/stripe';

function ShopCard({ book }) {
  const { _id, bookTitle, imageUrl, price } = book;
  const findingDetails = {
    _id,
    bookTitle,
    imageUrl,
    price,
  };

  return (
    <Card key={book._id}>
      <img src={book.imageUrl} alt="" className="h-60 object-fill" />
      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {book.bookTitle.slice(0, 20)}
      </h5>
      <p className="text-md -my-2 font-bold tracking-tight text-gray-900 dark:text-white">
        Price - ${book.price}
      </p>

      <button
        onClick={() => makePayment(findingDetails)}
        className="bg-blue-700 font-semibold text-white py-2 rounded"
      >
        Buy Now
      </button>
    </Card>
  );
}

export default ShopCard;
