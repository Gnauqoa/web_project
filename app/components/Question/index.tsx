import { Prisma } from "@prisma/client";
import { type SerializeFrom } from "@remix-run/node";
import Content from "../Content";
import { useState } from "react";
import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export const questionSelect: Prisma.QuestionSelect = {
  id: true,
  content: true,
  user: {
    select: {
      id: true,
      name: true,
      avatarId: true,
    },
  },
  answers: {
    select: {
      id: true,
      content: true,
      user: {
        select: {
          id: true,
          name: true,
          avatarId: true,
        },
      },
      createdAt: true,
    },
  },
  createdAt: true,
};

const questionWithUser = Prisma.validator<Prisma.QuestionDefaultArgs>()({
  select: questionSelect,
});

export type QuestionComponentType = SerializeFrom<
  Prisma.QuestionGetPayload<typeof questionWithUser>
>;

const Question = ({ question }: { question: QuestionComponentType }) => {
  const [currentQuestion] = useState(question);
  if (!currentQuestion) return <></>;
  return (
    <div className="flex flex-col w-full p-4 gap-2 border-b-[1px] border-gray-300">
      <Content content={currentQuestion} />
      <div className="flex flex-row items-center">
        <Button sx={{ border: 0, borderRadius: 0, width: "100%" }}>
          <FavoriteBorderIcon />
        </Button>
        <Button sx={{ border: 0, borderRadius: 0, width: "100%" }}>
          <ChatBubbleOutlineIcon />
        </Button>
      </div>
    </div>
  );
};

export default Question;
