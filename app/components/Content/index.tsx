import dayjs from "~/config/dayjs";
import { Avatar } from "..";
import { Typography } from "@mui/material";
import { type QuestionComponentType } from "../Question";
import { type AnswerComponentType } from "../Answer";
import { ContentEnum } from "~/types/content";
import Vote from "./Vote";
import Comment from "./Comment";
import Copy from "./Copy";
import Zoom from "./Zoom";
import { useLocation } from "@remix-run/react";

export type ContentProps =
  | {
      type: ContentEnum.question;
      content: QuestionComponentType;
    }
  | { type: ContentEnum.answer; content: AnswerComponentType };

const Content = ({ content, type }: ContentProps) => {
  const location = useLocation();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1 ">
        <Avatar user={content.user} />
        <div className="flex flex-col">
          <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
            {content.user.name}
          </Typography>
          <Typography sx={{ fontSize: 10 }}>
            {dayjs(new Date(content.createdAt || "")).fromNow()}
          </Typography>
        </div>
      </div>
      <Typography sx={{ fontSize: 14 }}>{content.content}</Typography>
      <div className="flex flex-row items-center gap-2">
        <Vote
          type={type}
          id={content.id}
          onNewState={() => {}}
          totalVote={content.vote}
          votedBy={content.votedBy.map((v) => v.userId)}
        />
        {type === ContentEnum.question && <Comment questionId={content.id} />}
        {(type === ContentEnum.answer || type === ContentEnum.question) && (
          <Copy content={content} type={type} />
        )}
        <Zoom content={content} type={type} />
      </div>
    </div>
  );
};

export default Content;
