"use client";

import { Button } from "@/components/ui/button";
import React, { Suspense, useState } from "react";

import { englishPdf, mathsPdf } from "@/assets/files";
import dynamic from "next/dynamic";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FileSearch2 } from "lucide-react";

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
    <main className="min-h-screen flex gap-2 relative max-w-full w-full">
      <aside className="sticky left-2 top-[130px] px-3 rounded-lg h-full hidden lg:inline-flex">
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
      <aside className="relative flex-1 max-w-full">
        <Suspense fallback={<p>...</p>}>
          <ViewPdf selectedFile={selectedSubject} />
        </Suspense>
        <Popover>
          <PopoverTrigger
            asChild
            className="lg:hidden sticky bottom-2 left-2 z-30"
          >
            <Button>
              <FileSearch2 />
              Curriculum
            </Button>
          </PopoverTrigger>
          <PopoverContent>
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
          </PopoverContent>
        </Popover>
      </aside>
    </main>
  );
};
export default CurriculumPage;
