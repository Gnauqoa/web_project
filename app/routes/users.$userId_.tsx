import { Prisma } from "@prisma/client";
import {
  json,
  type ActionFunctionArgs,
  type SerializeFrom,
} from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { StatusResponse } from "~/hooks/useFetcher";
import Info from "~/section/profile/info";
import Tabs from "~/section/profile/tabs";
import { prisma } from "~/utils/db.server";

export const userSelect: Prisma.UserSelect = {
  id: true,
  name: true,
  avatarId: true,
};

const UserInfo = Prisma.validator<Prisma.QuestionDefaultArgs>()({
  select: userSelect,
});

export type UserInfoType = SerializeFrom<
  Prisma.UserGetPayload<typeof UserInfo>
>;
export const loader = async ({ params }: ActionFunctionArgs) => {
  const { userId } = params;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: userSelect,
  });
  return json({ submission: { data: user }, status: StatusResponse.success });
};

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
