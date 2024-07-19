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
      about: true,
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
        <div className="grid md:grid-cols-4 grid-cols-2 mt-2">
          {result.map((user) => (
            <Link href={`/users/${user.id}`} key={user.id}>
            <div  className="flex gap-1">
              <div className="relative">
                <div className="w-28 h-28 object-cover group-[more]:hover:opacity-100">
                  <Image
                    src={user.image || ""}
                    alt=""
                    width={100}
                    height={100}
                    className="rounded-md"
                  />
                </div>
                <div className="flex gap-2 absolute top-0 hover:bg-zinc-800 hover:w-max hover:p-2 transition-all opacity-0 hover:opacity-100 z-[99999] shadow-md hover:text-zinc-200 rounded-md">
                  <div className="w-36 h-fit object-cover ">
                    <Image
                      src={user.image || ""}
                      alt="image"
                      width={100}
                      height={100}
                      className="rounded-md float-left"
                    />
                    <div className="text-sm  w-[300px] line-clamp-5">
                      <p>{user.about}</p>
                    </div>
                  </div>
                  <div className="w-auto h-fit">
                    <div className="text-sm w-full">
                      <Link href={`/users/${user.id}`}>{user.username}</Link>
                      <h4 className="text-zinc-400">{user.location}</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-sm">
                <Link href={`/users/${user.id}`}>{user.username}</Link>
                <h4 className="text-zinc-400">{user.location}</h4>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
