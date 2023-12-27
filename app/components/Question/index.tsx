import { Prisma } from "@prisma/client";
import { type SerializeFrom } from "@remix-run/node";
import Content from "../Content";
import { useContext, useState } from "react";
import { ContentEnum } from "~/types/content";
import { Box, Stack } from "@mui/material";
import {
  QuestionDetailContext,
  type QuestionDetailContextType,
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
    answers: { select: { id: true } },
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
  const { questionId } = useContext(
    QuestionDetailContext
  ) as QuestionDetailContextType;
  const [isDelete, setIsDelete] = useState(false);
  if (isDelete) return <></>;
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
      {questionId === question.id && (
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
        <Content
          onDelete={() => setIsDelete(true)}
          type={ContentEnum.question}
          content={question}
        />
      </Stack>
    </Box>
  );
};

export default Question;
