import Link from "next/link";
import { FC } from "react";

const SettingMenu: FC = () => {
  return (
    <div className="flex flex-col gap-3 max-w-max mx-10">
      <h6 className="text-sm font-semibold text-zinc-800 my-3">
        Personal information
      </h6>
      <ul>
        <li className="p-2">
          <Link href="/setting" className="active:bg-orange-400 active">
            Edit Profile
          </Link>
        </li>
        <li className="p-2">
          <Link href="/settings/delete">Delete Profile</Link>
        </li>
      </ul>
    </div>
  );
};

export default SettingMenu;
