import React, { useEffect, useState } from "react";
import { makePayment } from "./../stripe/stripe";
import ShopCard from "./ShopCard";

const Shop = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResetButton, setShowResetButton] = useState(false);
  const [sortOption, setSortOption] = useState("none"); // Default: no sorting

  useEffect(() => {
    // Fetch all books when the component mounts
    fetch("http://localhost:5000/all-books")
      .then((res) => res.json())
      .then((data) => {
        setAllBooks(data);
        setFilteredBooks(data);
      });
  }, []);

  const handleSearch = () => {
    // Search for books based on the title without making an additional API call
    const searchedBooks = allBooks.filter((book) =>
      book.bookTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(searchedBooks);
    setShowResetButton(true);
  };

  const handleReset = () => {
    setSearchQuery("");
    setFilteredBooks(allBooks);
    setShowResetButton(false);
    setSortOption("none"); // Reset sorting option
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    const sortedBooks = [...filteredBooks];

    if (option === "low") {
      sortedBooks.sort((a, b) => a.price - b.price);
    } else if (option === "high") {
      sortedBooks.sort((a, b) => b.price - a.price);
    }

    setFilteredBooks(sortedBooks);
  };

  return (
    <div className="mt-28 px-4 lg:px-24">
      <h2 className="text-2xl font-bold text-blue-700 text-center">
        Search your favourite book
      </h2>
      <div className="flex justify-center pt-5">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search a book"
          className="py-2 w-1/3 px-2 rounded-s-sm outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200"
        >
          Search
        </button>
        {showResetButton && (
          <button
            onClick={handleReset}
            className="ml-4 bg-gray-300 px-4 py-2 text-gray-700 font-medium hover:bg-gray-400 transition-all ease-in duration-200"
          >
            Reset
          </button>
        )}
      </div>
      {filteredBooks.length > 0 && (
        <p className="text-4xl font-bold text-center mt-16">
          All Books are here
        </p>
      )}
      <p className="text-xl font-bold text-center text-red-500 mt-16">
        {filteredBooks.length > 0 ? "" : "No books found with this name"}
      </p>
      {filteredBooks.length !== 1 && filteredBooks.length > 0 && (
        <div className="flex justify-center items-center ml-4">
          <label className="mr-4 text-xl text-gray-700">Sort by Price:</label>
          <div>
            <input
              type="radio"
              id="low"
              name="priceSort"
              value="low"
              checked={sortOption === "low"}
              onChange={() => handleSortChange("low")}
            />
            <label htmlFor="low" className="mr-8 ml-2 text-gray-700">
              Low Price
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="high"
              name="priceSort"
              value="high"
              checked={sortOption === "high"}
              onChange={() => handleSortChange("high")}
            />
            <label htmlFor="high" className="ml-2 text-gray-700">
              High Price
            </label>
          </div>
        </div>
      )}
      <div className="grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
        {filteredBooks.map((book) => (
          <ShopCard book={book} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
