import { useContext } from "react";
import Desktop from "./Desktop";
import {
  QuestionDetailContext,
  type QuestionDetailContextType,
} from "./Context";
import useResponsive from "~/hooks/useResponsive";
import Mobile from "./Mobile";

const QuestionDetail = () => {
  const { open } = useContext(
    QuestionDetailContext
  ) as QuestionDetailContextType;
  const lgUp = useResponsive("up", "lg");
  if (!open) return <></>;
  return lgUp ? <Desktop /> : <Mobile />;
};

export default QuestionDetail;
