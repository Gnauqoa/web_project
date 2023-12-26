import { type ActionFunctionArgs } from "@remix-run/node";
import { type ShouldRevalidateFunction } from "@remix-run/react";
import { answerSelect } from "~/components/Answer";
import { StatusResponse } from "~/hooks/useFetcher";
import { getUserId } from "~/utils/auth.server";
import { prisma } from "~/utils/db.server";
import { invariantResponse } from "~/utils/misc";

export const shouldRevalidate: ShouldRevalidateFunction = () => false;

export const loader = async ({ params, request }: ActionFunctionArgs) => {
  const currentUserId = await getUserId(request);
  const userId = params.userId;
  invariantResponse(userId, "Missing user id");
  const answers = await prisma.answer.findMany({
    where: { userId },
    select: answerSelect(currentUserId || ""),
  });
  return {
    submission: { data: { items: answers } },
    status: StatusResponse.success,
    message: "",
  };
};
