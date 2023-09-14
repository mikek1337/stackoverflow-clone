"use client";
import { FC } from "react";
import { useRouter } from "next/router";
import SideMenu from "@/components/sidemenu";
import { useQuery } from "@tanstack/react-query";
import { QuestionDetail } from "@/types/db";
import axios from "axios";
const Page: FC = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["question"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/question?q=${router.query.slug}`);
      console.log(data);
      return data as QuestionDetail[];
    },
  });
  return (
    <div className="flex flex-row">
      <SideMenu />
      <div className="container">
        <div className="flex flex-row justify-between py-5">
          <h4 className="text-4xl"></h4>
        </div>
      </div>
    </div>
  );
};

export default Page;
