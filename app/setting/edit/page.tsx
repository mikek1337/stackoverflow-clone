import ProfileForm from "@/components/setting/profileform";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Page = async () => {
  const session = await getAuthSession();
  const result = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });
  return (
    <>
      <ProfileForm data={result} />
    </>
  );
};

export default Page;
