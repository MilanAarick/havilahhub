import SearchBar from "@/app/(landingPage)/content-library/_components/search-bar";
import React from "react";
import TutoringServices from "../../_components/tutoring-services";

const TutorsPage = () => {
  return (
    <div className="container py-5 lg:py-8 min-h-[80svh]">
      <h1 className="text-xl lg:text-5xl text-secondary font-bold text-center">
        Havilah Tutors
      </h1>
      <section className="mt-5 flex justify-between gap-5">
        <article>
          <p className="lg:text-xl font-medium capitalize">
            Browse through our tutoring services
          </p>
        </article>
        <SearchBar />
      </section>
      <TutoringServices />
    </div>
  );
};

export default TutorsPage;
