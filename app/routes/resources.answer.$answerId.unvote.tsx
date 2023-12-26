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
    select: { votedBy: { where: { userId }, select: { id: true } } },
  });
  if (answer?.votedBy.length) {
    await prisma.voteAnswer.delete({
      where: { id: answer.votedBy[0].id },
    });

    return json(
      {
        status: StatusResponse.success,
        submission: await prisma.answer.update({
          where: { id: answerId },
          data: { vote: { decrement: 1 } },
          select: answerSelect(userId),
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
