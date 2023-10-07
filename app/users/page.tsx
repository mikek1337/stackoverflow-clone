import SearchBar from "@/components/searchuserbar";
import SideMenu from "@/components/sidemenu";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
  const result = await db.user.findMany({
    select: {
      id: true,
      username: true,
      location: true,
      image: true,
    },
  });
  return (
    <div className="flex gap-5">
      <div>
        <div className="my-10">
          <h2 className="text-2xl font-semibold">Users</h2>
        </div>
        <SearchBar />
        <div className="grid grid-cols-4 mt-2">
          {result.map((user) => (
            <div key={user.id} className="flex gap-2">
              <div className="w-16 h-16 object-cover ">
                <Image
                  src={user.image || ""}
                  alt=""
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              </div>
              <div className="text-sm">
                <Link href={`/users/${user.id}`}>{user.username}</Link>
                <h4 className="text-zinc-400">{user.location}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
