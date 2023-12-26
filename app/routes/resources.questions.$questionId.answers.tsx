import { type ActionFunctionArgs } from "@remix-run/node";
import { type ShouldRevalidateFunction } from "@remix-run/react";
import { answerSelect } from "~/components/Answer";
import { StatusResponse } from "~/hooks/useFetcher";
import { prisma } from "~/utils/db.server";
import { invariantResponse } from "~/utils/misc";

export const shouldRevalidate: ShouldRevalidateFunction = () => false;

export const loader = async ({ params }: ActionFunctionArgs) => {
  const questionId = params.questionId;
  invariantResponse(questionId, "Missing question id");
  const answers = await prisma.answer.findMany({
    where: { questionId },
    select: answerSelect,
  });
  return {
    submission: { data: { items: answers } },
    status: StatusResponse.success,
    message: "",
  };
};
