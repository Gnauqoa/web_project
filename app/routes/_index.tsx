import { json, type ActionFunctionArgs } from "@remix-run/node";
import { type ShouldRevalidateFunction, useLoaderData } from "@remix-run/react";
import { Question } from "~/components";
import QuestionEditor from "~/components/AddQuestion";
import { EditorType } from "~/components/Editor";
import { questionSelect } from "~/components/Question";
import { getUserId } from "~/utils/auth.server";
import { prisma } from "~/utils/db.server";

export const shouldRevalidate: ShouldRevalidateFunction = () => false;

export const loader = async ({ request }: ActionFunctionArgs) => {
  const userId = await getUserId(request);
  const questions = await prisma.question.findMany({
    orderBy: { createdAt: "desc" },
    select: questionSelect(userId || ""),
  });
  return json({ questions });
};

const Home = () => {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col w-full border-x-[1px] border-gray-300 h-full">
      <QuestionEditor editorType={EditorType.new} />
      {data.questions.map((question) => (
        <Question key={question.id} question={question} />
      ))}
    </div>
  );
};

export default Home;
