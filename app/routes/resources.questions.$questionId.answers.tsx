import { type ActionFunctionArgs } from "@remix-run/node";
import { answerSelect } from "~/components/Answer";
import { prisma } from "~/utils/db.server";
import { invariantResponse } from "~/utils/misc";

export const loader = async ({ params }: ActionFunctionArgs) => {
  const questionId = params.questionId;
  invariantResponse(questionId, "Missing question id");
  const answers = await prisma.answer.findMany({
    where: { questionId },
    select: answerSelect,
  });
  return { data: { items: answers } };
};
