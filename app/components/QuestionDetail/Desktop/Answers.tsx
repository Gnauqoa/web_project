import QuestionAnswers from "~/components/Question/Answers";
import { useContext } from "react";
import {
  QuestionDetailContext,
  type QuestionDetailContextType,
} from "../Context";

const Answers = () => {
  const { answers } = useContext(
    QuestionDetailContext
  ) as QuestionDetailContextType;
  return <QuestionAnswers answers={answers} />;
};

export default Answers;
