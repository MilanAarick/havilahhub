"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useDebounce } from "@/hooks/debounce";

const SearchBar = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const value = useDebounce(searchTerm, 500);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (value) {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set("q", value);

      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${queryParams}`
      );
    } else {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.delete("q");

      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${queryParams}`
      );
    }
  }, [value]);

  return (
    <div className="flex items-center justify-end">
      <Input
        type="search"
        placeholder="Search for subjects"
        className="w-full max-w-sm transition-all duration-300 ease-in-out"
        value={searchTerm}
        onChange={handleSearch}
        onBlur={() => setIsExpanded(false)}
        autoFocus
      />
      {/* 
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-secondary hover:text-white duration-200"
        onClick={() => setIsExpanded(true)}
      >
        <Search className="h-4 w-4 " />
      </Button> */}
    </div>
  );
};

export default SearchBar;
