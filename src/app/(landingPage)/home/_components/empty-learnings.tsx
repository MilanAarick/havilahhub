import React from "react";

type Props = {};

const EmptyLearnings = (props: Props) => {
  return (
    <main className="border rounded-xl border-primary h-[300px] flex justify-center items-center text-xl lg:text-2xl 2xl:text-3xl ">
      <div className="text-center">
        <h1>You don&apos;t have any courses bought yet.</h1>
        <p>click here to search for courses</p>
      </div>
    </main>
  );
};

export default EmptyLearnings;
