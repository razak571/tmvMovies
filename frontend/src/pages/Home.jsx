import React from "react";
import Header from "./Movies/Header";
import MoviesContainerPage from "./Movies/MoviesContainerPage";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div className=" py-10">
        <h1 className="text-4xl lg:text-6xl font-bold text-center mb-4">
          The Movies Vault
        </h1>
        <p className="lg:text-xs font-bold text-gray-500 text-center">
          A Cinematic Voyage: Discovering Movie Magic
        </p>
      </div>
      <Header />
      <section className="mt-10">
        <MoviesContainerPage />
      </section>
      <Footer />
    </>
  );
};

export default Home;
