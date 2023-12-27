import { json, type DataFunctionArgs } from "@remix-run/node";
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
    select: { userId: true },
  });
  if (answer) {
    if (userId !== answer.userId)
      return json(
        {
          status: StatusResponse.error,
          message: "Refuses to authorize",
        },
        { status: 403 }
      );
    await prisma.answer.delete({ where: { id: answerId } });
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
