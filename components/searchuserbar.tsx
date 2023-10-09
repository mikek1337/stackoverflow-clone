"use client";
import { Prisma, Question, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CommandList } from "cmdk";
import Image from "next/image";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

const SearchBar = () => {
  const [input, setInput] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();
  const {
    isFetched,
    data: queryResults,
    refetch,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];
      const { data } = await axios.get(`/api/user/search?q=${input}`);
      return data as (User & {
        _count: Prisma.UserCountOutputType;
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
    <div className="mb-20">
      <Command className="relative rounded-lg border  z-50 overflow-visible">
        <CommandInput
          placeholder="Users..."
          onValueChange={(text) => setInput(text)}
          className="outline-none boarder-none focus:border-none focus:outline-none ring-0 "
        />
        {input.length > 0 && (
          <CommandList className="absolute bg-white  inset-x-0 top-10 shadow rounded-b-md w-full ">
            {isFetched && <CommandEmpty>No result found.</CommandEmpty>}
            {queryResults?.map((user) => (
              <CommandItem
                onSelect={(e) => {
                  router.push(`/user/${user.id}`);
                  router.refresh();
                }}
                key={user.id}
                value={user.username || ""}
              >
                <div className="flex container my-1 gap-2">
                  <div className="w-fit">
                    <Image
                      src={user.image || ""}
                      className="rounded-lg w-8 h-8"
                      alt="avatar"
                      width={100}
                      height={100}
                    />
                  </div>
                  <a href={`/user/${user.id}`}>{user.username}</a>
                </div>
              </CommandItem>
            ))}
          </CommandList>
        )}
      </Command>
    </div>
  );
};

export default SearchBar;
