import { type ActionFunctionArgs } from "@remix-run/node";
import { type ShouldRevalidateFunction } from "@remix-run/react";
import { questionSelect } from "~/components/Question";
import { StatusResponse } from "~/hooks/useFetcher";
import { getUserId } from "~/utils/auth.server";
import { prisma } from "~/utils/db.server";
import { invariantResponse } from "~/utils/misc";

export const shouldRevalidate: ShouldRevalidateFunction = () => false;

export const loader = async ({ params, request }: ActionFunctionArgs) => {
  const currentUserId = await getUserId(request);
  const userId = params.userId;
  invariantResponse(userId, "Missing user id");
  const questions = await prisma.question.findMany({
    where: { userId },
    select: questionSelect(currentUserId || ""),
  });
  return {
    submission: { data: { items: questions } },
    status: StatusResponse.success,
    message: "",
  };
};
