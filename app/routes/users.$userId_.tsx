import { Outlet } from "@remix-run/react";
import Tabs from "~/section/profile/tabs";

const User = () => {
  return (
    <div className="flex flex-col w-full">
      <Tabs />
      <Outlet />
    </div>
  );
};

export default User;
