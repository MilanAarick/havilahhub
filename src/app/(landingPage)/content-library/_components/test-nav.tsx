"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { SchoolLevel, SubjectArea } from "@prisma/client";
import { useDebounce } from "@/hooks/debounce";
import { Button } from "@/components/ui/button";
type Props = {};

const TestNav = (props: Props) => {
  const searchParams = useSearchParams();
  const query = new URLSearchParams(searchParams.toString());
  const schoollevel = (searchParams.get("schoollevel") as SchoolLevel) ?? "";
  const subjectArea = (searchParams.get("subjectArea") as SubjectArea) ?? "";
  const [selectedLevel, setSelectedLevel] = useState(
    schoollevel ? schoollevel : ""
  );
  const [selectedSubject, setSelectedSubject] = useState(
    subjectArea ? subjectArea : ""
  );
  const [searchTerm, setSearchTerm] = useState("");
  const debounced = useDebounce(searchTerm, 500);

  const levels = [
    "GRADE_1",
    "GRADE_2",
    "GRADE_3",
    "GRADE_4",
    "GRADE_5",
    "PRE_K",
    "KINDERGARTEN_1",
    "KINDERGARTEN_2",
    "GRADE_6",
    "GRADE_7",
    "GRADE_8",
    "GRADE_9",
    "GRADE_10",
    "GRADE_11",
    "GRADE_12",
  ];
  const subjects = [
    "Mathematics and Numeracy",
    "English and Literacy",
    "Computer Science and Coding",
    "Basic Science",
    "Basic Technology",
    "Further Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Geography",
    "Arts and Music",
    "Government",
    "Economics",
    "Commerce",
    "Literature",
    "Local and International Languages",
  ];

  useEffect(() => {
    if (debounced) {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set("searchTerm", debounced);

      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${queryParams}`
      );
    } else {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.delete("searchTerm");

      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${queryParams}`
      );
    }
  }, [debounced]);

  useEffect(() => {
    if (selectedLevel) {
      query.set("schoollevel", selectedLevel);
    } else {
      query.delete("schoollevel");
    }

    if (selectedSubject) {
      query.set("subjectArea", selectedSubject);
    } else {
      query.delete("subjectArea");
    }

    window.history.pushState({}, "", `${window.location.pathname}?${query}`);
  }, [selectedLevel, selectedSubject]);

  const clearFilters = () => {
    query.delete("schoollevel");
    query.delete("subjectArea");
    query.delete("searchTerm");
    setSelectedLevel("");
    setSelectedSubject("");
    setSearchTerm("");

    window.history.pushState({}, "", `${window.location.pathname}?${query}`);
  };

  return (
    <main>
      <div className="bg-gray-100 p-4 rounded-lg mb-6 flex flex-wrap gap-4 items-center">
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Level" />
          </SelectTrigger>
          <SelectContent>
            {levels.map((level) => (
              <SelectItem
                key={level}
                value={level}
                className="!hover:bg-primary"
              >
                {level.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem
                key={subject}
                value={subject}
                className="!hover:bg-primary"
              >
                {subject.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex-grow">
          <Input
            type="text"
            placeholder="Search tests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-5 mt-4">
        {schoollevel && (
          <Button
            variant={"outline"}
            className="hover:bg-transparent bg-transparent rounded-full text-sm"
          >
            {schoollevel}
          </Button>
        )}
        {subjectArea && (
          <Button
            variant={"outline"}
            className="hover:bg-transparent bg-transparent rounded-full text-sm"
          >
            {subjectArea}
          </Button>
        )}
        {schoollevel || subjectArea || searchTerm ? (
          <Button onClick={clearFilters}>Clear filter</Button>
        ) : null}
      </div>
    </main>
  );
};

export default TestNav;
