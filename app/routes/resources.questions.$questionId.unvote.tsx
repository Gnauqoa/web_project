import { json, type DataFunctionArgs } from "@remix-run/node";
import { questionSelect } from "~/components/Question";
import { StatusResponse } from "~/hooks/useFetcher";
import { authGuard } from "~/utils/auth.server";
import { prisma } from "~/utils/db.server";
import { invariantResponse } from "~/utils/misc";

export const action = async ({ request, params }: DataFunctionArgs) => {
  const userId = await authGuard(request);
  invariantResponse(params.questionId, "Missing id");
  const questionId = params.questionId;
  const question = await prisma.question.findUnique({
    where: { id: questionId },
    select: { votedBy: { where: { userId }, select: { id: true } } },
  });
  if (question?.votedBy.length) {
    await prisma.voteQuestion.delete({
      where: { id: question.votedBy[0].id },
    });

    return json(
      {
        status: StatusResponse.success,
        submission: await prisma.question.update({
          where: { id: questionId },
          data: { vote: { decrement: 1 } },
          select: questionSelect(userId),
        }),
      },
      {
        status: 200,
      }
    );
  }
  return json(
    {
      status: StatusResponse.error,
      message: "Refuses to authorize",
    },
    { status: 403 }
  );
};
