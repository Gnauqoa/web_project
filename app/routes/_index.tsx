import { json, type ActionFunctionArgs } from "@remix-run/node";
import { type ShouldRevalidateFunction, useLoaderData } from "@remix-run/react";
import { useState } from "react";
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
  const [questions, setQuestions] = useState(data.questions);
  return (
    <div className="flex flex-col w-full h-full">
      <QuestionEditor
        onSuccess={(data) => setQuestions((prev) => [data, ...prev])}
        editorType={EditorType.new}
      />
      {questions.map((question) => (
        <Question key={question.id} question={question} />
      ))}
    </div>
  );
};

export default Home;
