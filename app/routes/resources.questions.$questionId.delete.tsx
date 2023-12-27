import { json, type DataFunctionArgs } from "@remix-run/node";
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
    select: { userId: true },
  });
  if (question) {
    if (userId !== question.userId)
      return json(
        {
          status: StatusResponse.error,
          message: "Refuses to authorize",
        },
        { status: 403 }
      );
    await prisma.question.delete({ where: { id: questionId } });
    return json(
      {
        status: StatusResponse.success,
        message: "Delete success",
      },
      { status: 200 }
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
