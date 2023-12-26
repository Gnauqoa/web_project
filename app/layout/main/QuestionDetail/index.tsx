import { useContext } from "react";
import Desktop from "./Desktop";
import {
  QuestionDetailContext,
  type QuestionDetailContextType,
} from "./Context";

const QuestionDetail = () => {
  const { open } = useContext(
    QuestionDetailContext
  ) as QuestionDetailContextType;
  if (!open) return <></>;
  return <Desktop />;
};

export default QuestionDetail;
