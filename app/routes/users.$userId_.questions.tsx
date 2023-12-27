import { useLoaderData } from "@remix-run/react";
import { loader } from "./resources.users.$userId.questions";
import { Question } from "~/components";

export { loader };

const Questions = () => {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col w-full border-x-[1px] border-gray-300">
      {data.submission.data.items.map((question) => (
        <Question key={question.id} question={question} />
      ))}
    </div>
  );
};

export default Questions;
