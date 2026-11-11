"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { searchHref } from "../data/help";
import { SearchField } from "./search-field";

export function HomeSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <SearchField
      label="Search help articles"
      placeholder="Search for help articles..."
      value={query}
      onChange={setQuery}
      onSubmit={(value) => {
        if (value.trim()) router.push(searchHref(value));
      }}
      className="w-full lg:w-[600px]"
    />
  );
}
