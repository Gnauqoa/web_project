import { json, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Question } from "~/components";
import { questionSelect } from "~/components/Question";
import { getUserId } from "~/utils/auth.server";
import { prisma } from "~/utils/db.server";
import { invariantResponse } from "~/utils/misc";

export const loader = async ({ params, request }: ActionFunctionArgs) => {
  invariantResponse(params.questionId, "Missing id");
  const userId = await getUserId(request);
  const question = await prisma.question.findUnique({
    where: { id: params.questionId },
    select: questionSelect(userId || ""),
  });
  return json({ submission: { data: question } });
};

const QuestionPage = () => {
  const data = useLoaderData<typeof loader>();
  if (!data.submission.data) return <></>;
  return (
    <div className="flex flex-col w-full h-full">
      <Question question={data.submission.data} />
    </div>
  );
};

export default QuestionPage;
