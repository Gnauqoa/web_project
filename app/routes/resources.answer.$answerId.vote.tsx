import { json, type DataFunctionArgs } from "@remix-run/node";
import { answerSelect } from "~/components/Answer";
import { StatusResponse } from "~/hooks/useFetcher";
import { authGuard } from "~/utils/auth.server";
import { prisma } from "~/utils/db.server";
import { invariantResponse } from "~/utils/misc";

export const action = async ({ request, params }: DataFunctionArgs) => {
  const userId = await authGuard(request);
  invariantResponse(params.answerId, "Missing id");
  const answerId = params.answerId;
  const answer = await prisma.answer.findUnique({
    where: { id: answerId },
    select: { votedBy: { where: { userId } } },
  });
  if (!answer?.votedBy.length) {
    await prisma.voteAnswer.create({
      data: { answerId, userId },
    });
    const answer = await prisma.answer.update({
      where: { id: answerId },
      data: { vote: { increment: 1 } },
      select: answerSelect(userId),
    });
    return json(
      { submission: answer, status: StatusResponse.success },
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
