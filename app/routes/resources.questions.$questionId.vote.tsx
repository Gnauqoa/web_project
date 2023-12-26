import { json } from "@remix-run/node";
import { type ShouldRevalidateFunction } from "@remix-run/react";
import { type ActionFunctionArgs } from "react-router";
import { questionSelect } from "~/components/Question";
import { StatusResponse } from "~/hooks/useFetcher";
import { authGuard } from "~/utils/auth.server";
import { prisma } from "~/utils/db.server";
import { invariantResponse } from "~/utils/misc";

export const shouldRevalidate: ShouldRevalidateFunction = () => false;

export const action = async ({ request, params }: ActionFunctionArgs) => {
  invariantResponse(params.questionId, "Missing id");
  const userId = await authGuard(request);
  const questionId = params.questionId;
  const question = await prisma.question.findUnique({
    where: { id: questionId },
    select: { votedBy: { where: { userId } } },
  });
  if (!question?.votedBy.length) {
    await prisma.voteQuestion.create({
      data: { questionId, userId },
    });
    const question = await prisma.question.update({
      where: { id: questionId },
      data: { vote: { increment: 1 }, interactedAt: new Date() },
      select: questionSelect(userId),
    });

    return json(
      {
        submission: { data: question },
        status: StatusResponse.success,
        message: "",
      },
      {
        status: 201,
        statusText: "",
      }
    );
  }

  return json(
    {
      message: "Refuses to authorize",
      status: StatusResponse.error,
    },
    { status: 403 }
  );
};
