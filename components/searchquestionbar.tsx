"use client";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Command, CommandInput, CommandList } from "./ui/command";
import { CommandEmpty, CommandGroup, CommandItem } from "cmdk";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import debounce from "lodash.debounce";

import { Question, Prisma } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { Badge } from "./ui/badge";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
interface searchbarProps {}

const SearchBar: FC<searchbarProps> = ({}) => {
  const [input, setInput] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useOnClickOutside(commandRef, () => {
    setInput("");
  });

  const request = debounce(async () => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setInput("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return (
    <div className="w-full">
      <Command
        className={cn(
          "rounded-lg border overflow-visible  md:block ",
          { "relative block z-50 ": !isMobile },
          {
            "absolute z-99999 top-12 bg-opacity-95 left-0 right-10 h-fit w-full  ":
              isMobile,
          }
        )}
      >
        <CommandInput
          placeholder="Search..."
          className="outline-none boarder-none focus:border-none focus:outline-none ring-0  "
          onValueChange={(text) => {
            setInput(text);
            debounceRequest();
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
                      router.push(`/questions/${question.id}`);
                      router.refresh();
                    }}
                    value={question.title}
                    key={question.id}
                  >
                    <div className="flex container my-1 flex-col border-b py-1">
                      <Link
                        href={`/questions/${question.id}`}
                        className="text-blue-500 text-sm md:text-lg "
                      >
                        {question.title}
                      </Link>
                      <div className="flex gap-3 flex-auto ">
                        {question.tags.split(",").map((tag) => (
                          <Badge variant="default" className="w-fit ">
                            {tag}
                          </Badge>
                        ))}
                      </div>
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
