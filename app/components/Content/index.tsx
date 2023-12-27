import dayjs from "~/config/dayjs";
import { Avatar } from "..";
import { Typography } from "@mui/material";
import { type QuestionComponentType } from "../Question";
import { type AnswerComponentType } from "../Answer";
import { type ContentEnum } from "~/types/content";
import Action from "./Action";
import useToggle from "~/hooks/useToggle";
import QuestionEditor from "../AddQuestion";
import { EditorType } from "../Editor";
import EditContent from "./EditContent";
import { useState } from "react";

export type ContentProps =
  | {
      type: ContentEnum.question;
      content: QuestionComponentType;
    }
  | { type: ContentEnum.answer; content: AnswerComponentType };

const Content = ({ content: defaultContent, type }: ContentProps) => {
  const [content, setContent] = useState(defaultContent);
  const {
    toggle: mode,
    handleOpen: onEdit,
    handleClose: onNormal,
  } = useToggle({});
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
        <div className="ml-auto">
          <EditContent content={content} onClick={onEdit} />
        </div>
      </div>
      {mode ? (
        <QuestionEditor
          onSuccess={(data) => {
            setContent(data);
            onNormal();
          }}
          defaultValue={content.content}
          editorType={EditorType.edit}
          id={content.id}
        />
      ) : (
        <div className="flex flex-row">
          <Typography sx={{ fontSize: 14 }}>{content.content}</Typography>
        </div>
      )}
      <Action content={content} type={type} />
    </div>
  );
};

export default Content;
