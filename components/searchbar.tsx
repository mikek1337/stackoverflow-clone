"use client";
import { FC, useState } from "react";
import { Command, CommandInput, CommandList } from "./ui/command";
import { CommandEmpty, CommandGroup, CommandItem } from "cmdk";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Question, Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";

interface searchbarProps {}

const searchbar: FC<searchbarProps> = ({}) => {
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
  return (
    <div>
      <Command>
        <CommandInput
          placeholder="Search..."
          className="outline-none boarder-none focus:border-none focus:outline-none ring-0"
          onValueChange={(text) => {
            setInput(text);
          }}
          value={input}
        />
        {input.length > 0 && (
          <CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md">
            {isFetched && <CommandEmpty>No result found.</CommandEmpty>}
            {(queryResults?.length ?? 0) > 0 ? (
              <CommandGroup heading="Suggestion">
                {queryResults?.map((question) => (
                  <CommandItem
                    onSelect={(e) => {
                      router.push(`/question/${question.id}`);
                      router.refresh();
                    }}
                    value={question.title}
                    key={question.id}
                  >
                    <a href={`/question/${question.id}`}>{question.title}</a>
                    <Badge variant="outline">{question.tags}</Badge>
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

export default searchbar;
