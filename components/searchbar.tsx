"use client";
import { FC, useEffect, useState } from "react";
import { Command, CommandInput, CommandList } from "./ui/command";
import { CommandEmpty, CommandGroup, CommandItem } from "cmdk";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Question, Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";

interface searchbarProps {}

const SearchBar: FC<searchbarProps> = ({}) => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const {
    isFetched,
    data: queryResults,
    refetch,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];
      const { data } = await axios.get(`/api/question/search?q=${input}`);
      return data as (Question & {
        _count: Prisma.QuestionCountOutputType;
      })[];
    },
    queryKey: ["search-key"],
    enabled: false,
  });
  useEffect(() => {
    const timeout = setTimeout(() => {
      refetch();
    }, 2000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);
  return (
    <div>
      <Command className="relative rounded-lg border  z-50 overflow-visible">
        <CommandInput
          placeholder="Search..."
          className="outline-none boarder-none focus:border-none focus:outline-none ring-0 "
          onValueChange={(text) => {
            setInput(text);
          }}
          value={input}
        />
        {input.length > 0 && (
          <CommandList className="absolute bg-white  inset-x-0 top-10 shadow rounded-b-md w-full ">
            {isFetched && <CommandEmpty>No result found.</CommandEmpty>}
            {(queryResults?.length ?? 0) > 0 ? (
              <CommandGroup heading="Suggestion" className="p-1">
                {queryResults?.map((question) => (
                  <CommandItem
                    onSelect={(e) => {
                      router.push(`/question/${question.id}`);
                      router.refresh();
                    }}
                    value={question.title}
                    key={question.id}
                  >
                    <div className="flex container my-1">
                      <a href={`/questions/${question.id}`}>{question.title}</a>
                      <Badge variant="default" className="w-fit">
                        {question.tags}
                      </Badge>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : null}
          </CommandList>
        )}
      </Command>
    </div>
  );
};

export default SearchBar;
