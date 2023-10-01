import ProfileForm from "@/components/setting/profileform";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import Image from "next/image";

const page = async () => {
  const session = await getAuthSession();
  const user = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });
  return (
    <div>
      <div className="mb-3">
        <h2 className="text-2xl text-zinc-800 py-3 font-bold md:font-normal">
          Edit your profile
        </h2>
        <hr />
      </div>
      <div>
        <h3>Public information</h3>
        <div>
          <ProfileForm user={user} />
        </div>
      </div>
    </div>
  );
};

export default page;
