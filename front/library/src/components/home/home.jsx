import React from 'react';

const Home = () => {
  const greeting = "Welcome to the Library!";
  const description = "Explore our collection of books and discover new worlds.";

  return (
    <div>
      <h1>{greeting}</h1>
      <p>{description}</p>
    </div>
  );
};

export default Home;
