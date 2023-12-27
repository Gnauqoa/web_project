import { useLoaderData } from "@remix-run/react";
import { loader } from "./resources.users.$userId.questions";
import { Question } from "~/components";
import { Typography } from "@mui/material";

export { loader };

const Questions = () => {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col w-full h-full">
      {data.submission.data.items.length === 0 && (
        <Typography sx={{ fontSize: 18, textAlign: "center" }}>
          Có vẻ bạn chưa có câu hỏi nào
        </Typography>
      )}
      {data.submission.data.items.map((question) => (
        <Question key={question.id} question={question} />
      ))}
    </div>
  );
};

export default Questions;
