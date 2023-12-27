import { loader } from "~/routes/resources.users.$userId";
import { Outlet, useLoaderData } from "@remix-run/react";
import Info from "~/section/profile/info";
import Tabs from "~/section/profile/tabs";
export { loader };

const User = () => {
  const data = useLoaderData<typeof loader>();
  if (!data.submission.data) return <></>;
  return (
    <div className="flex flex-col w-full">
      <Info user={data.submission.data} />
      <Tabs />
      <Outlet />
    </div>
  );
};

export default User;
