"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

import { englishPdf, mathsPdf } from "@/assets/files";
import dynamic from "next/dynamic";

type Props = {};

const ViewPdf = dynamic(() => import("./_components/pdfViewer"), {
  loading: () => <p>Loading...</p>,
});

const CurriculumPage = (props: Props) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(
    mathsPdf
  );

  const onSelectFile = (subject: string) => {
    if (subject === "mathematics") {
      setSelectedSubject(mathsPdf);
    } else if (subject === "english") {
      setSelectedSubject(englishPdf);
    } else {
      setSelectedSubject(null);
    }
  };
  return (
    <main className="min-h-screen">
      <aside className="sticky left-2 top-[150px] max-w-56 rounded-lg h-full bg-white">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h1 className="text-xl font-bold text-center">Curriculum</h1>
          <div className="flex flex-col gap-2 mt-4">
            <Button
              variant={"link"}
              onClick={() => onSelectFile("mathematics")}
            >
              Mathematics
            </Button>
            <Button variant={"link"} onClick={() => onSelectFile("english")}>
              English
            </Button>
          </div>
        </div>
      </aside>
      <aside className="-mt-32">
        <ViewPdf selectedFile={selectedSubject} />
      </aside>
    </main>
  );
};
export default CurriculumPage;
