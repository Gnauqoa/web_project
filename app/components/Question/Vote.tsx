import { useState } from "react";
import { ContentEnum } from "~/types/content";
import { type QuestionComponentType } from ".";
import { type AnswerComponentType } from "../Answer";
import useFetcher from "~/hooks/useFetcher";
import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export type VoteProps = { id: string; votedBy: string[]; totalVote: number } & (
  | {
      type: ContentEnum.answer;
      onNewState: (data: AnswerComponentType) => void;
    }
  | {
      type: ContentEnum.question;
      onNewState: (data: QuestionComponentType) => void;
    }
);

const Vote = ({
  votedBy,
  id,
  type,
  onNewState,
  totalVote: _totalVote,
}: VoteProps) => {
  const [vote, setVote] = useState(!!votedBy?.length);
  const [totalVote, setTotalVote] = useState<number>(_totalVote || 0);
  const { handleSubmit, loading } = useFetcher<{ data: QuestionComponentType }>(
    {
      action: `/resources/questions/${id}/${vote ? "unvote" : "vote"}`,
      method: "post",
      onSuccess: (data) => {
        if (type === ContentEnum.question && data.submission)
          onNewState(data.submission.data);
      },
    }
  );
  const handleClick = () => {
    handleSubmit();
    setVote(!vote);
    setTotalVote(vote ? totalVote - 1 : totalVote + 1);
  };
  const handleButtonClick = () => {
    handleClick();
  };
  return (
    <Button
      disabled={loading}
      onClick={handleButtonClick}
      sx={{ border: 0, borderRadius: 0, width: "100%" }}
    >
      {vote ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      {!!totalVote && <p className="text-md text-primary-v2">{totalVote}</p>}
    </Button>
  );
};

export default Vote;
