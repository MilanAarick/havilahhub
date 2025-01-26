"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, BarChart } from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { onGetTests } from "@/actions/learnings";
import { SchoolLevel, ServiceType, SubjectArea } from "@prisma/client";
import { TestLoader } from "./test-loader";

// Define the types based on the provided data structure
type Test = {
  title: string;
  description: string;
  schoolLevel: string;
  subjectArea: string;
  topic: string;
  grade: string;
  timeLimit: number;
  passingScore: number;
  difficultyLevel: string;
  contentLibraryId: string;
  questions: any[]; // We don't need the full question structure for this page
};

// Sample test data
const testData: Test[] = [
  {
    title: "Project Management Professional (PMP) Practice Test",
    description: "PMP certification preparation test",
    schoolLevel: "PROFESSIONAL",
    subjectArea: "BUSINESS",
    topic: "Project Management",
    grade: "Professional",
    timeLimit: 240,
    passingScore: 75,
    difficultyLevel: "Advanced",
    contentLibraryId: "professional-library-id",
    questions: [],
  },
  {
    title: "Introduction to Biology",
    description: "Basic concepts in biology for high school students",
    schoolLevel: "HIGH_SCHOOL",
    subjectArea: "SCIENCE",
    topic: "Biology",
    grade: "9th Grade",
    timeLimit: 60,
    passingScore: 70,
    difficultyLevel: "Beginner",
    contentLibraryId: "high-school-science-id",
    questions: [],
  },
  {
    title: "Advanced Calculus",
    description: "University level calculus test",
    schoolLevel: "UNIVERSITY",
    subjectArea: "MATHEMATICS",
    topic: "Calculus",
    grade: "Undergraduate",
    timeLimit: 120,
    passingScore: 80,
    difficultyLevel: "Advanced",
    contentLibraryId: "university-math-id",
    questions: [],
  },
  {
    title: "English Literature: Shakespeare",
    description: "Test on Shakespeare's works for high school students",
    schoolLevel: "HIGH_SCHOOL",
    subjectArea: "LITERATURE",
    topic: "Shakespeare",
    grade: "11th Grade",
    timeLimit: 90,
    passingScore: 65,
    difficultyLevel: "Intermediate",
    contentLibraryId: "high-school-literature-id",
    questions: [],
  },
  {
    title: "Introduction to Computer Science",
    description: "Basic programming concepts for beginners",
    schoolLevel: "UNIVERSITY",
    subjectArea: "COMPUTER_SCIENCE",
    topic: "Programming Basics",
    grade: "Freshman",
    timeLimit: 75,
    passingScore: 70,
    difficultyLevel: "Beginner",
    contentLibraryId: "university-cs-id",
    questions: [],
  },
];

export default function TestCatalogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = new URLSearchParams(searchParams.toString());
  const [page, setPage] = useState(1);
  const schoollevel = (searchParams.get("schoollevel") as SchoolLevel) ?? "";
  const subjectArea = (searchParams.get("subjectArea") as SubjectArea) ?? "";
  const searchTerm = searchParams.get("searchTerm") ?? "";

  const { data, isPending, isError, error, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["tests", page, schoollevel, subjectArea, searchTerm],
      queryFn: () =>
        onGetTests({
          page,
          pageSize: 10,
          searchTerm,
          schoolLevel: schoollevel,
          subjectArea,
        }),
      placeholderData: keepPreviousData,
    });

  //   const updateQuery = (text: string | null) => {
  //     if (text) {
  //       query.set("searchTerm", text);
  //       window.history.pushState({}, "", `${window.location.pathname}?${query}`);
  //     }
  //   };

  return (
    <main>
      {/* {(isPending || isFetching) && <TestLoader />} */}
      <div className="container mx-auto p-4 w-full">
        {!isPending && data?.data?.length !== 0 && (
          <div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
              {data?.data?.map((test, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="capitalize">
                      {test.schoolLevel.replace("_", " ").toLowerCase()}
                    </CardTitle>
                    <CardDescription className="capitalize">
                      {test.subjectArea.replace("_", " ").toLowerCase()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    {/* <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">
                        {test.schoolLevel.replace("_", " ")}
                      </Badge>
                      <Badge variant="outline">
                        {test.subjectArea.replace("_", " ")}
                      </Badge>
                      
                    </div> */}
                    <div className="space-y-2"></div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() =>
                        router.push(`/content-library/tests/${test.id}`)
                      }
                    >
                      Start Test
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4 w-full">
              <Button
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1}
              >
                Previous Page
              </Button>
              <span>
                Page {page} of {data?.meta?.totalPages ?? 1}
              </span>
              <Button
                onClick={() => {
                  if (
                    !isPlaceholderData &&
                    (data?.meta?.currentPage ?? 0) <
                      (data?.meta?.totalPages ?? 1)
                  ) {
                    setPage((old) => old + 1);
                  }
                }}
                disabled={isPlaceholderData || page === data?.meta?.totalPages}
              >
                Next Page
              </Button>
            </div>
          </div>
        )}
        {(isPending || isFetching) && data?.data?.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No tests found matching your criteria.
          </p>
        )}
      </div>
    </main>
  );
}
