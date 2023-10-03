import NavBar from "@/components/navbar";
import ProfileHeader from "@/components/setting/profileheader";
import SettingMenu from "@/components/setting/settingmenu";
import SideMenu from "@/components/sidemenu";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const SettingLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }
  const user = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });
  return (
    <div className="flex w-full">
      <SideMenu />
      <div>
        <ProfileHeader user={user} />
        <div className="flex gap-10  flex-row ">
          <SettingMenu />
          {children}
        </div>
      </div>
    </div>
  );
};
export default SettingLayout;
