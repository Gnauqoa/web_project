import { Prisma } from "@prisma/client";
import {
  json,
  type ActionFunctionArgs,
  type SerializeFrom,
} from "@remix-run/node";
import { StatusResponse } from "~/hooks/useFetcher";
import { getUserId } from "~/utils/auth.server";
import { prisma } from "~/utils/db.server";

export const userSelect = (isPrivate?: boolean) => {
  return isPrivate
    ? ({
        id: true,
        name: true,
        avatarId: true,
        bio: true,
      } as Prisma.UserSelect)
    : ({
        id: true,
        name: true,
        avatarId: true,
        email: true,
        bio: true,
      } as Prisma.UserSelect);
};

const UserInfo = Prisma.validator<Prisma.QuestionDefaultArgs>()({
  select: userSelect(),
});

export type UserInfoType = SerializeFrom<
  Prisma.UserGetPayload<typeof UserInfo>
>;
export const loader = async ({ params, request }: ActionFunctionArgs) => {
  const currentUserId = await getUserId(request);
  const { userId } = params;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: userSelect(currentUserId !== userId),
  });
  return json({ submission: { data: user }, status: StatusResponse.success });
};
