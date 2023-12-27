import { useLoaderData } from "@remix-run/react";
import { loader } from "./resources.users.$userId.answers";
import Answer from "~/components/Answer";
import { Typography } from "@mui/material";

export { loader };

const Answers = () => {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col w-full h-full">
      {data.submission.data.items.length === 0 && (
        <Typography sx={{ fontSize: 18 }}>
          Có vẻ bạn chưa có câu trả lời nào
        </Typography>
      )}
      {data.submission.data.items.map((answer) => (
        <Answer key={answer.id} answer={answer} />
      ))}
    </div>
  );
};

export default Answers;
