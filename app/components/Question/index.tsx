import { Prisma } from "@prisma/client";
import { type SerializeFrom } from "@remix-run/node";
import Content from "../Content";
import { useContext, useState } from "react";
import { ContentEnum } from "~/types/content";
import { Box, Stack } from "@mui/material";
import {
  QuestionDetailContext,
  QuestionDetailContextType,
} from "~/layout/main/QuestionDetail/Context";

export const questionSelect = (userId?: string) =>
  ({
    id: true,
    content: true,
    user: {
      select: {
        id: true,
        name: true,
        avatarId: true,
      },
    },

    votedBy: userId ? { where: { userId }, select: { id: true } } : false,
    vote: true,
    createdAt: true,
  } as Prisma.QuestionSelect);

const questionWithUser = Prisma.validator<Prisma.QuestionDefaultArgs>()({
  select: questionSelect(),
});

export type QuestionComponentType = SerializeFrom<
  Prisma.QuestionGetPayload<typeof questionWithUser>
>;

const Question = ({ question }: { question: QuestionComponentType }) => {
  const [currentQuestion] = useState(question);
  const { questionId } = useContext(
    QuestionDetailContext
  ) as QuestionDetailContextType;
  if (!currentQuestion) return <></>;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "full",
        borderBottom: "1px solid gray",
        position: "relative",
      }}
    >
      {questionId === currentQuestion.id && (
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "primary.main",
            opacity: "0.2",
            width: "100%",
            height: "100%",
          }}
        ></Box>
      )}
      <Stack sx={{ p: 4, gap: 2 }}>
        <Content type={ContentEnum.question} content={currentQuestion} />
      </Stack>
    </Box>
  );
};

export default Question;
