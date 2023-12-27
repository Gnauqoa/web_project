import { useLoaderData } from "@remix-run/react";
import { loader } from "./resources.users.$userId.answers";
import Answer from "~/components/Answer";

export { loader };

const Answers = () => {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col w-full h-full">
      {data.submission.data.items.map((answer) => (
        <Answer key={answer.id} answer={answer} />
      ))}
    </div>
  );
};

export default Answers;
