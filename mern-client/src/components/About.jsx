// AboutUs.js
import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">About Us</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-12">
          <div className="md:w-1/2">
            <img
              src="https://placekitten.com/800/600" // Replace with your image URL
              alt="Bookstore Interior"
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2">
            <p className="text-lg leading-relaxed">
              Welcome to our book store, where you can explore a vast collection
              of books from various genres. We are passionate about literature
              and believe in providing a delightful reading experience to our
              customers.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Our dedicated team curates books that cater to diverse tastes,
              ensuring there's something for everyone. Whether you're a fiction
              enthusiast, a history buff, or someone seeking self-help, we have
              the perfect book for you.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Dive into the world of captivating stories and knowledge with our
              carefully selected collection. We strive to create a welcoming
              space for book lovers and foster a love for reading in our
              community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
