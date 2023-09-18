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
    return <div></div>;
  }
  const user = await db.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });
  return (
    <div className="flex ">
      <SideMenu />
      <div>
        <ProfileHeader user={user} />
        <div className="flex gap-10">
          <SettingMenu />
          {children}
        </div>
      </div>
    </div>
  );
};
export default SettingLayout;
