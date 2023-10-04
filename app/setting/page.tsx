import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const page = async () => {
  return (
    <div>
      <h2 className="text-3xl text-zinc-400 font-bold">Setting</h2>
      <div className="my-10">
        <h3 className="text-xl text-zinc-600 mb-3 font-semibold">
          Welcome to your profile setting page!
        </h3>
        <p>
          Here, you can update your profile information, including your name,
          bio, photo, and contact information. You can also change your password
          and privacy settings.
        </p>
        <p className="my-1">Here are some tips for updating your profile:</p>
        <ul className="list-disc px-9">
          <li>Use a clear and concise bio to tell others about yourself.</li>
          <li>Make sure your contact information is up-to-date.</li>
          <li>
            Review your privacy settings regularly to make sure they&apos;re
            what you want.
          </li>
        </ul>
      </div>
      <Link
        href={`/setting/edit`}
        className={cn(buttonVariants({ variant: "default" }))}
      >
        Get started
      </Link>
    </div>
  );
};

export default page;
