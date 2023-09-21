"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FC, useState } from "react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const { mutate: deleteUser } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.delete("/api/user/delete");
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Profile deleted",
      });
      signOut();
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Your profile is not delete. Pleas try again",
        variant: "destructive",
      });
    },
  });
  const [isChecked, setIsChecked] = useState(false);
  const deleteMe = () => {
    deleteUser();
  };
  return (
    <div>
      <h2 className="text-3xl text-zinc-900 p-2 my-1">Delete Profile</h2>
      <hr className="mb-3" />
      <div className="py-3">
        <p>
          Before confirming that you would like your profile deleted, we $apos d
          like to take a moment to explain the implications of deletion:
        </p>
      </div>
      <div>
        <ul className="list-disc px-10">
          <li className="py-2">
            <p>
              Deletion is irreversible, and you will have no way to regain any
              of your original content, should this deletion be carried out and
              you change your mind later on.
            </p>
          </li>
          <li className="py-2">
            <p>
              Your questions and answers will remain on the site, but will be
              disassociated and anonymized (the author will be listed as &quot
              user8876279 &quot) and will not indicate your authorship even if
              you later return to the site.
            </p>
          </li>
        </ul>
        <div className="py-2 mb-2">
          <p>
            Confirming deletion will only delete your profile on Stack Overflow
            - it will not affect any of your other profiles on the Stack
            Exchange network. If you want to delete multiple profiles, you $apos
            ll need to visit each site separately and request deletion of those
            individual profiles.
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Checkbox
            className="checked:text-red-400"
            onCheckedChange={() => {
              isChecked ? setIsChecked(false) : setIsChecked(true);
              console.log(isChecked);
            }}
          />
          <p className="">
            I have read the information stated above and understand the
            implications of having my profile deleted. I wish to proceed with
            the deletion of my profile.
          </p>
        </div>
        <div className="my-4">
          <Button
            variant="destructive"
            disabled={!isChecked}
            onClick={deleteMe}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
