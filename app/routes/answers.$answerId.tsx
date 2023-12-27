import { json, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Answer, { answerSelect } from "~/components/Answer";
import { getUserId } from "~/utils/auth.server";
import { prisma } from "~/utils/db.server";
import { invariantResponse } from "~/utils/misc";

export const loader = async ({ params, request }: ActionFunctionArgs) => {
  invariantResponse(params.answerId, "Missing id");
  const userId = await getUserId(request);
  const answer = await prisma.answer.findUnique({
    where: { id: params.answerId },
    select: answerSelect(userId || ""),
  });
  return json({ submission: { data: answer } });
};

const AnswerPage = () => {
  const data = useLoaderData<typeof loader>();
  if (!data.submission.data) return <></>;
  return (
    <div className="flex flex-col w-full h-full">
      <Answer answer={data.submission.data} />
    </div>
  );
};

export default AnswerPage;
