import { useLoaderData } from "@remix-run/react";
import { Question } from "~/components";
import { loader } from "~/routes/resources.search";
export { loader };
const SearchPage = () => {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col w-full h-full">
      {data.items.map((question) => (
        <Question key={question.id} question={question} />
      ))}
    </div>
  );
};

export default SearchPage;
